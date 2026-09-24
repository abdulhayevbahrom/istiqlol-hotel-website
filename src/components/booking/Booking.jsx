import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useLanguage } from '../../i18n/LanguageProvider';
import { useCreatePublicBookingMutation, useGetPublicRoomAvailabilityQuery, useGetPublicRoomCategoriesQuery, useGetPublicRoomsQuery } from '../../store/websiteApi';
import { API_BASE_URL } from '../../config/apiConfig';
import './Booking.css';
import './BookingPicker.css';
import './BookingRooms.css';
import '../rooms/Rooms.css';

const formatLocalDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
const addDays = (value, days) => {
  const date = new Date(`${value}T12:00:00`);
  date.setDate(date.getDate() + days);
  return formatLocalDate(date);
};
const today = formatLocalDate(new Date());
const tomorrow = addDays(today, 1);
const initialForm = {
  firstname: '',
  lastname: '',
  phone: '',
  email: '',
  roomType: '',
  checkIn: today,
  checkOut: tomorrow,
  guests: '2',
  guestType: 'uzb',
  note: '',
};

const resolveRoomImage = (image) => {
  const src = String(image || '').trim();
  if (!src) return '/assets/room-preview.png';
  if (/^(https?:)?\/\//i.test(src) || src.startsWith('data:')) return src;
  if (src.startsWith('/uploads') && API_BASE_URL) return `${API_BASE_URL}${src}`;
  return src;
};

const formatPrice = (value) => `${Number(value || 0).toLocaleString('uz-UZ')} UZS`;
const formatDisplayDate = (value) => {
  const [year, month, day] = String(value || '').split('-');
  return year && month && day ? `${day}.${month}.${year}` : '-';
};
const roomAmenities = [
  ['wifi', 'Wi‑Fi'],
  ['bell', '24/7 reception'],
  ['parking', 'Avtoturargoh'],
  ['laundry', 'Kir yuvish'],
  ['breakfast', 'Shved stoli'],
];

function AmenityIcon({ name }) {
  const paths = {
    wifi: <><path d="M5 12.5a11 11 0 0 1 14 0"/><path d="M8.5 16a6 6 0 0 1 7 0"/><circle cx="12" cy="19" r="1"/></>,
    bell: <><path d="M5 16h14M7 16v-4a5 5 0 0 1 10 0v4M4 20h16M12 7V4"/></>,
    parking: <><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/></>,
    laundry: <><rect x="4" y="3" width="16" height="18" rx="2"/><circle cx="12" cy="14" r="4"/><path d="M8 7h.01M12 7h4"/></>,
    breakfast: <><path d="M4 10h16M6 10a6 6 0 0 1 12 0M3 14h18M7 18h10"/></>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}
const guestLimits = {
  adults: { min: 1, max: 12 },
  children: { min: 0, max: 8 },
  rooms: { min: 1, max: 50 },
};
const bookingCopy = {
  uz: { room: 'xona', adult: 'katta yoshli', child: 'bola', adults: 'Kattalar', adultHint: '13 yosh va undan katta', children: 'Bolalar', childHint: '0–12 yosh', rooms: 'Xonalar', roomHint: 'Kerakli xona soni', done: 'Tayyor', occupied: (used, max) => `${used} / ${max} ta joy band`, addRoom: ' · Ko‘proq mehmon uchun xona qo‘shing', capacity: (count) => `${count} kishilik`, selectedRoom: (category, capacity, quantity) => `${category} (${capacity} kishilik) × ${quantity}`, roomCount: (count) => `${count} xona`, adultCount: (count) => `${count} katta yoshli`, guestSummary: (adults, children) => `${adults} katta yoshli · ${children} bola`, roomDetail: (capacity, quantity) => `${capacity} kishilik · ${quantity} ta xona`, nights: (count) => `${count} kecha`, duration: (count) => `${count} kunlik bron` },
  ru: { room: 'номер.', adult: 'взрослых', child: 'детей', adults: 'Взрослые', adultHint: '13 лет и старше', children: 'Дети', childHint: '0–12 лет', rooms: 'Номера', roomHint: 'Количество номеров', done: 'Готово', occupied: (used, max) => `Занято ${used} из ${max} мест`, addRoom: ' · Добавьте номер для большего числа гостей', capacity: (count) => `На ${count} чел.`, selectedRoom: (category, capacity, quantity) => `${category} (на ${capacity} чел.) × ${quantity}`, roomCount: (count) => `${count} ном.`, adultCount: (count) => `${count} взрослых`, guestSummary: (adults, children) => `${adults} взрослых · ${children} детей`, roomDetail: (capacity, quantity) => `На ${capacity} чел. · ${quantity} ном.`, nights: (count) => `${count} ноч.`, duration: (count) => `Бронирование на ${count} дн.` },
  en: { room: 'room(s)', adult: 'adult(s)', child: 'child(ren)', adults: 'Adults', adultHint: 'Ages 13 and over', children: 'Children', childHint: 'Ages 0–12', rooms: 'Rooms', roomHint: 'Number of rooms', done: 'Done', occupied: (used, max) => `${used} of ${max} places occupied`, addRoom: ' · Add a room for more guests', capacity: (count) => `Sleeps ${count}`, selectedRoom: (category, capacity, quantity) => `${category} (sleeps ${capacity}) × ${quantity}`, roomCount: (count) => `${count} room(s)`, adultCount: (count) => `${count} adult(s)`, guestSummary: (adults, children) => `${adults} adult(s) · ${children} child(ren)`, roomDetail: (capacity, quantity) => `Sleeps ${capacity} · ${quantity} room(s)`, nights: (count) => `${count} night(s)`, duration: (count) => `${count}-night booking` },
};

export default function Booking({ standalone = false }) {
  const { language } = useLanguage();
  const copy = bookingCopy[language] || bookingCopy.uz;
  const navigate = useNavigate();
  const location = useLocation();
  const bookingState = standalone ? location.state : null;
  const [form, setForm] = useState(() => ({
    ...initialForm,
    ...(bookingState?.form || {}),
    ...(standalone ? { roomType: '', roomOptionKey: '', roomCapacity: 0 } : {}),
  }));
  const [guestSelection, setGuestSelection] = useState(() => bookingState?.guestSelection || { adults: 2, children: 0, rooms: 1 });
  const [roomSelections, setRoomSelections] = useState({});
  const [roomPreview, setRoomPreview] = useState(null);
  const [showGuestDetails, setShowGuestDetails] = useState(false);
  const [isGuestPickerOpen, setIsGuestPickerOpen] = useState(false);
  const guestPickerRef = useRef(null);
  const submitLockRef = useRef(false);
  const [status, setStatus] = useState('idle');
  const [confirmation, setConfirmation] = useState(null);
  const { data: roomCategoryData = [], isLoading: categoriesLoading, isError: categoriesError } = useGetPublicRoomCategoriesQuery();
  const { data: publicRooms = [], isLoading: roomsLoading, isError: roomsError } = useGetPublicRoomsQuery();
  const { data: availability = {}, isLoading: availabilityLoading, isError: availabilityError } = useGetPublicRoomAvailabilityQuery(
    { checkIn: form.checkIn, checkOut: form.checkOut },
    { skip: !form.checkIn || !form.checkOut || form.checkOut <= form.checkIn },
  );
  const [createPublicBooking, { isLoading: isBookingSending }] = useCreatePublicBookingMutation();
  const roomOptions = useMemo(() => {
    const categoryDetails = new Map(roomCategoryData.map((item) => [item.category, item]));
    const categoryOrder = new Map(roomCategoryData.map((item, index) => [item.category, index]));
    const groups = new Map();
    const availableRoomIds = new Set((availability.availableRoomIds || []).map(String));
    publicRooms.filter((room) => room?.status !== 'remont' && availableRoomIds.has(String(room?._id))).forEach((room) => {
      const category = String(room?.category || '').trim();
      if (!category) return;
      const details = categoryDetails.get(category) || {};
      const capacity = Math.max(Number(room?.capacity || 0), 1);
      const localPrice = Number(room?.prices?.oddiy || 0);
      const foreignPrice = Number(room?.prices?.chetEllik || 0);
      const displayPrice = form.guestType === 'chetellik' ? foreignPrice : localPrice;
      const optionKey = `${category}::${capacity}::${displayPrice}`;
      const current = groups.get(optionKey) || {
        optionKey,
        category,
        capacity,
        count: 0,
        minLocalPrice: localPrice,
        minForeignPrice: foreignPrice,
        images: details.images || room.images || [],
      };
      const combinedImages = [...new Set([
        ...(current.images || []),
        ...(details.images || []),
        ...(room.images || []),
      ].filter(Boolean))];
      groups.set(optionKey, {
        ...current,
        count: current.count + 1,
        minLocalPrice: !current.minLocalPrice || (localPrice && localPrice < current.minLocalPrice) ? localPrice : current.minLocalPrice,
        minForeignPrice: !current.minForeignPrice || (foreignPrice && foreignPrice < current.minForeignPrice) ? foreignPrice : current.minForeignPrice,
        images: combinedImages,
      });
    });
    return [...groups.values()].sort((a, b) => {
      const aIndex = categoryOrder.get(a.category) ?? Number.MAX_SAFE_INTEGER;
      const bIndex = categoryOrder.get(b.category) ?? Number.MAX_SAFE_INTEGER;
      return aIndex - bIndex || a.category.localeCompare(b.category) || a.capacity - b.capacity || a.minLocalPrice - b.minLocalPrice;
    });
  }, [publicRooms, roomCategoryData, form.guestType, availability.availableRoomIds]);
  const roomCategories = roomOptions.map((room) => room.category);
  const categories = roomCategories;
  const selectedEntries = roomOptions
    .map((room) => ({ room, quantity: Number(roomSelections[room.optionKey] || 0) }))
    .filter((entry) => entry.quantity > 0);
  const selectedRoom = selectedEntries[0]?.room;
  const largestRoomCapacity = Math.max(...roomOptions.map((room) => Number(room.capacity || 0)), 1);
  const capacityPerRoom = Math.max(Number(selectedRoom?.capacity || largestRoomCapacity), 1);
  const availableRoomCount = Number(selectedRoom?.count || 0);
  const roomLimit = availableRoomCount > 0 ? Math.min(guestLimits.rooms.max, availableRoomCount) : guestLimits.rooms.max;
  const selectedCapacity = selectedEntries.reduce((sum, entry) => sum + entry.room.capacity * entry.quantity, 0);
  const maxGuestsForSelection = selectedCapacity || capacityPerRoom * guestSelection.rooms;
  const totalSelectedGuests = guestSelection.adults + guestSelection.children;
  const getRoomPrice = (room) => Number(
    form.guestType === 'chetellik' ? room?.minForeignPrice : room?.minLocalPrice,
  ) || 0;
  const selectedNightlyPrice = getRoomPrice(selectedRoom);
  const selectedRoomCount = selectedEntries.reduce((sum, entry) => sum + entry.quantity, 0);
  const nights = useMemo(() => {
    if (!form.checkIn || !form.checkOut) return 1;
    const diff = Math.ceil((new Date(form.checkOut) - new Date(form.checkIn)) / 86400000);
    return Number.isFinite(diff) && diff > 0 ? diff : 1;
  }, [form.checkIn, form.checkOut]);
  const bookingTotal = selectedEntries.reduce((sum, entry) => sum + getRoomPrice(entry.room) * entry.quantity * nights, 0);

  const openRoomPreview = (room, index = 0) => {
    const images = [...new Set((room.images || []).map(resolveRoomImage).filter(Boolean))];
    if (!images.length) return;
    setRoomPreview({ title: room.category, images, index });
  };

  const closeRoomPreview = () => setRoomPreview(null);

  const moveRoomPreview = (step) => {
    setRoomPreview((current) => {
      if (!current) return current;
      return { ...current, index: (current.index + step + current.images.length) % current.images.length };
    });
  };

  useEffect(() => {
    if (!roomPreview) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeRoomPreview();
      if (event.key === 'ArrowLeft') moveRoomPreview(-1);
      if (event.key === 'ArrowRight') moveRoomPreview(1);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [roomPreview]);

  useEffect(() => {
    if (categoriesLoading || roomsLoading) return;
    if (!categories.length) return;
    setForm((current) => {
      if (!current.roomOptionKey) return current;
      const selected = roomOptions.find((room) => room.optionKey === current.roomOptionKey);
      return selected ? current : { ...current, roomType: '', roomOptionKey: '', roomCapacity: 0 };
    });
  }, [categoriesLoading, roomsLoading, roomCategories.join('|'), roomOptions]);

  useEffect(() => {
    const handleRoomCategorySelect = (event) => {
      const category = String(event.detail?.category || '').trim();
      if (!category) return;
      navigate('/booking', {
        state: {
          form: { ...form, roomType: category },
          guestSelection,
        },
      });
    };

    window.addEventListener('select-room-category', handleRoomCategorySelect);
    return () => window.removeEventListener('select-room-category', handleRoomCategorySelect);
  }, [form, guestSelection, navigate]);

  useEffect(() => {
    if (!isGuestPickerOpen) return undefined;
    const closePicker = (event) => {
      if (event.key === 'Escape' || (event.type === 'pointerdown' && !guestPickerRef.current?.contains(event.target))) {
        setIsGuestPickerOpen(false);
      }
    };
    document.addEventListener('pointerdown', closePicker);
    document.addEventListener('keydown', closePicker);
    return () => {
      document.removeEventListener('pointerdown', closePicker);
      document.removeEventListener('keydown', closePicker);
    };
  }, [isGuestPickerOpen]);

  const updateField = ({ target: { name, value } }) => setForm((current) => {
    if (name === 'checkIn') {
      const safeCheckIn = value < today ? today : value;
      return {
        ...current,
        checkIn: safeCheckIn,
        checkOut: current.checkOut <= safeCheckIn ? addDays(safeCheckIn, 1) : current.checkOut,
      };
    }
    return { ...current, [name]: value };
  });
  const updateBookingDate = (name, date) => {
    if (!date) return;
    const value = date.format('YYYY-MM-DD');
    setRoomSelections({});
    setShowGuestDetails(false);
    setForm((current) => {
      if (name === 'checkIn') {
        return { ...current, checkIn: value, checkOut: current.checkOut <= value ? addDays(value, 1) : current.checkOut, roomType: '' };
      }
      return { ...current, checkOut: value, roomType: '' };
    });
  };
  const updateBookingRange = (dates) => {
    if (!dates?.[0] || !dates?.[1]) return;
    const checkIn = dates[0].format('YYYY-MM-DD');
    const checkOut = dates[1].format('YYYY-MM-DD');
    setRoomSelections({});
    setShowGuestDetails(false);
    setForm((current) => ({ ...current, checkIn, checkOut, roomType: '' }));
  };
  const updateGuestCount = (field, step) => {
    setGuestSelection((current) => {
      const { min, max } = guestLimits[field];
      const currentTotalGuests = current.adults + current.children;
      const effectiveMax = field === 'rooms' ? roomLimit : max;
      const candidate = Math.min(effectiveMax, Math.max(min, current[field] + step));
      if (field === 'rooms' && candidate < current.rooms && currentTotalGuests > capacityPerRoom * candidate) return current;
      if ((field === 'adults' || field === 'children') && step > 0 && currentTotalGuests >= capacityPerRoom * current.rooms) return current;
      const updated = {
        ...current,
        [field]: candidate,
      };
      setForm((currentForm) => ({
        ...currentForm,
        guests: String(updated.adults + updated.children),
      }));
      return updated;
    });
  };
  const changeRoomQuantity = (room, step) => {
    const currentQuantity = Number(roomSelections[room.optionKey] || 0);
    const maxQuantity = Math.min(Number(room.count || 0), guestLimits.rooms.max);
    const nextQuantity = Math.min(maxQuantity, Math.max(0, currentQuantity + step));
    const nextSelections = { ...roomSelections, [room.optionKey]: nextQuantity };
    if (!nextQuantity) delete nextSelections[room.optionKey];
    setRoomSelections(nextSelections);
    setShowGuestDetails(false);
    const entries = roomOptions.filter((option) => Number(nextSelections[option.optionKey] || 0) > 0);
    const totalRooms = Object.values(nextSelections).reduce((sum, value) => sum + Number(value || 0), 0);
    setForm((current) => ({
      ...current,
      roomType: entries.map((entry) => entry.category).join(', '),
      roomOptionKey: '',
      roomCapacity: 0,
    }));
    setGuestSelection((current) => ({ ...current, rooms: Math.max(totalRooms, 1) }));
  };
  const submitBooking = async (event) => {
    event.preventDefault();
    if (submitLockRef.current) return;
    if (form.checkIn < today) {
      setStatus('past-date');
      return;
    }
    if (form.checkOut <= form.checkIn) {
      setStatus('invalid-dates');
      return;
    }
    submitLockRef.current = true;
    setStatus('sending');
    try {
      const bookingRequestId = globalThis.crypto?.randomUUID?.()
        || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const booking = await createPublicBooking({
        ...form,
        language,
        bookingRequestId,
        stayDays: nights,
        roomCount: guestSelection.rooms,
        roomRate: selectedNightlyPrice,
        roomSelections: selectedEntries.map(({ room, quantity }) => ({
          category: room.category,
          capacity: room.capacity,
          rate: getRoomPrice(room),
          count: quantity,
        })),
      }).unwrap();
      setConfirmation({
        guestName: `${form.firstname} ${form.lastname}`.trim(),
        phone: form.phone,
        roomCategory: booking?.room?.category || form.roomType,
        roomNumber: booking?.room
          ? `${booking.room.korpus ? `${booking.room.korpus}-` : ''}${booking.room.roomNumber || ''}`.trim()
          : '',
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        guests: form.guests,
        nights,
        bookingReference: booking?.bookingReference,
        confirmationUrl: booking?.confirmationUrl,
        confirmationToken: booking?.confirmationToken,
        emailSent: booking?.emailSent,
      });
      setForm((current) => ({
        ...initialForm,
        roomType: current.roomType || categories[0],
        checkIn: current.checkIn,
        checkOut: current.checkOut,
        guests: current.guests,
      }));
      setStatus('success');
    } catch {
      setStatus('offline');
    } finally {
      submitLockRef.current = false;
    }
  };

  const bookingSearch = (
    <form className="booking-search" onSubmit={submitBooking}>
      <strong>Bron qilish</strong>
      <label>
        <span>Kelish</span>
        <DatePicker className="booking-date-picker" value={dayjs(form.checkIn)} format="DD.MM.YYYY" placeholder="Kelish sanasi" allowClear={false} disabledDate={(date) => date && date.startOf('day').isBefore(dayjs(today))} onChange={(date) => updateBookingDate('checkIn', date)} />
      </label>
      <label>
        <span>Ketish</span>
        <DatePicker className="booking-date-picker" value={dayjs(form.checkOut)} format="DD.MM.YYYY" placeholder="Ketish sanasi" allowClear={false} disabledDate={(date) => date && !date.startOf('day').isAfter(dayjs(form.checkIn))} onChange={(date) => updateBookingDate('checkOut', date)} />
      </label>
      <div className="booking-search-field" ref={guestPickerRef}>
        <span>Mehmonlar</span>
        <button
          className={`booking-guests-trigger${isGuestPickerOpen ? ' active' : ''}`}
          type="button"
          aria-expanded={isGuestPickerOpen}
          aria-controls="booking-guests-picker"
          onClick={() => setIsGuestPickerOpen((open) => !open)}
        >
          <span><b>{guestSelection.rooms}</b> {copy.room}</span>
          <i aria-hidden="true">·</i>
          <span><b>{guestSelection.adults}</b> {copy.adult}</span>
          {guestSelection.children > 0 && <span>· <b>{guestSelection.children}</b> {copy.child}</span>}
        </button>
        {isGuestPickerOpen && (
          <div className="booking-guests-picker" id="booking-guests-picker" data-no-translate>
            {[
              ['adults', copy.adults, copy.adultHint],
              ['children', copy.children, copy.childHint],
              ['rooms', copy.rooms, copy.roomHint],
            ].map(([field, label, hint]) => (
              <div className="booking-guests-row" key={field}>
                <span className="booking-guests-label"><strong>{label}</strong><small>{hint}</small></span>
                <div>
                  <button
                    type="button"
                    onClick={() => updateGuestCount(field, -1)}
                    disabled={guestSelection[field] <= guestLimits[field].min
                      || (field === 'rooms' && totalSelectedGuests > capacityPerRoom * (guestSelection.rooms - 1))}
                    aria-label={`${label} sonini kamaytirish`}
                  ><span aria-hidden="true">−</span></button>
                  <output aria-live="polite">{guestSelection[field]}</output>
                  <button
                    type="button"
                    onClick={() => updateGuestCount(field, 1)}
                    disabled={field === 'rooms'
                      ? guestSelection.rooms >= roomLimit
                      : guestSelection[field] >= guestLimits[field].max || totalSelectedGuests >= maxGuestsForSelection}
                    aria-label={`${label} sonini oshirish`}
                  ><span aria-hidden="true">+</span></button>
                </div>
              </div>
            ))}
            <p className={`booking-capacity-note${totalSelectedGuests >= maxGuestsForSelection ? ' full' : ''}`}>
              {copy.occupied(totalSelectedGuests, maxGuestsForSelection)}
              {totalSelectedGuests >= maxGuestsForSelection && guestSelection.rooms < roomLimit ? copy.addRoom : ''}
            </p>
            <button className="booking-guests-done" type="button" onClick={() => setIsGuestPickerOpen(false)}>{copy.done}</button>
          </div>
        )}
      </div>
      <button type="button" onClick={() => {
        setIsGuestPickerOpen(false);
        navigate('/booking', { state: { form, guestSelection } });
      }}>
        Topish
      </button>
    </form>
  );

  return (
    <>
      {!standalone && <div className="booking-search-wrap" id="booking">{bookingSearch}</div>}
      {standalone && !confirmation && (
        <section className="booking-page" aria-labelledby="booking-modal-title">
          <div className="booking-modal-panel booking-page-panel">
            <div className="booking-modal-head">
              <div>
                <p className="eyebrow">Online bron</p>
                <h2 id="booking-modal-title">Xona band qilish</h2>
              </div>
              <Link className="booking-page-back" to="/">← Bosh sahifa</Link>
            </div>
            <form className="booking-form" onSubmit={submitBooking}>
              <fieldset className="booking-residency">
                <legend>Mehmon rezidentligi</legend>
                <button className={form.guestType === 'uzb' ? 'active' : ''} type="button" onClick={() => { setRoomSelections({}); setShowGuestDetails(false); setForm((current) => ({ ...current, guestType: 'uzb', roomType: '' })); }}>
                  <span>🇺🇿</span><strong>O‘zbekiston rezidenti</strong><small>Mahalliy tarif</small>
                </button>
                <button className={form.guestType === 'chetellik' ? 'active' : ''} type="button" onClick={() => { setRoomSelections({}); setShowGuestDetails(false); setForm((current) => ({ ...current, guestType: 'chetellik', roomType: '' })); }}>
                  <span>🌐</span><strong>Norezident</strong><small>Chet elliklar tarifi</small>
                </button>
              </fieldset>
              <div className="booking-room-layout">
                <div className="booking-room-options">
                  <div className="booking-room-title">
                    <p className="eyebrow">Mavjud xonalar</p>
                    <h3>Xonangizni tanlang</h3>
                  </div>
                  {(categoriesLoading || roomsLoading || availabilityLoading) && <p className="form-message">Xonalar yuklanmoqda...</p>}
                  {(categoriesError || roomsError || availabilityError) && <p className="form-message">PMS bazasidan bo‘sh xona va narxlarni olib bo‘lmadi. Iltimos, qayta urinib ko‘ring.</p>}
                  {!categoriesLoading && !roomsLoading && !availabilityLoading && !availabilityError && roomOptions.length === 0 && <p className="form-message">Tanlangan sanalarda bo‘sh xona qolmagan.</p>}
                  {!categoriesLoading && !roomsLoading && !availabilityLoading && !availabilityError && roomOptions.map((room) => {
                    const selectedQuantity = Number(roomSelections[room.optionKey] || 0);
                    const isSelected = selectedQuantity > 0;
                    return (
                      <article
                        className={`booking-room-option${isSelected ? ' selected' : ''}`}
                        key={room.optionKey}
                      >
                        <span className="booking-room-media">
                          <button className="room-image-button" type="button" onClick={() => openRoomPreview(room)} aria-label={`${room.category} rasmlarini ko‘rish`}>
                            <img src={resolveRoomImage(room.images?.[0])} alt={`${room.category} xona ko‘rinishi`} />
                            <span>Rasmlarni ko‘rish</span>
                          </button>
                        </span>
                        <span className="booking-room-copy">
                          <strong>{room.category}</strong>
                          <small className="booking-room-occupancy" data-no-translate>{copy.capacity(room.capacity)}</small>
                        </span>
                        <span className="booking-room-price">
                          <strong data-no-translate>{formatPrice(getRoomPrice(room))}</strong>
                          <small>1 kecha uchun</small>
                          <span className="booking-room-quantity" aria-label={`${room.category} xona soni`}>
                            <button type="button" onClick={() => changeRoomQuantity(room, -1)} disabled={!isSelected}>−</button>
                            <output data-no-translate>{selectedQuantity}</output>
                            <button type="button" onClick={() => changeRoomQuantity(room, 1)} disabled={selectedQuantity >= Math.min(room.count, guestLimits.rooms.max)}>+</button>
                          </span>
                        </span>
                        <span className="booking-room-amenities">
                          {roomAmenities.map(([icon, label]) => (
                            <small key={label}><AmenityIcon name={icon}/>{label}</small>
                          ))}
                        </span>
                      </article>
                    );
                  })}
                </div>
                <aside className="booking-summary">
                  <strong className="booking-summary-total" data-no-translate>{formatPrice(bookingTotal)}</strong>
                  <span data-no-translate>{copy.nights(nights)}</span>
                  <hr />
                  <h4>Sanalar</h4>
                  <DatePicker.RangePicker
                    className="booking-summary-dates"
                    value={[dayjs(form.checkIn), dayjs(form.checkOut)]}
                    format="DD.MM.YYYY"
                    allowClear={false}
                    separator="→"
                    disabledDate={(date, info) => date && (date.startOf('day').isBefore(dayjs(today)) || (info?.from && !date.startOf('day').isAfter(info.from.startOf('day'))))}
                    onChange={updateBookingRange}
                  />
                  <h4>Mehmonlar</h4>
                  <p data-no-translate><b>{copy.roomCount(selectedRoomCount)}</b><i>·</i><b>{copy.adultCount(guestSelection.adults)}</b></p>
                  {selectedEntries.length === 0 && <div className="booking-summary-room"><span>Xona tanlanmagan</span><strong>0 UZS</strong></div>}
                  {selectedEntries.map(({ room, quantity }) => (
                    <div className="booking-summary-room" key={room.optionKey}>
                      <span data-no-translate>{copy.selectedRoom(room.category, room.capacity, quantity)}</span>
                      <strong data-no-translate>{formatPrice(getRoomPrice(room) * quantity * nights)}</strong>
                    </div>
                  ))}
                  <div className="booking-summary-final"><span>Jami</span><strong data-no-translate>{formatPrice(bookingTotal)}</strong></div>
                  <button
                    className="booking-summary-action"
                    type="button"
                    disabled={!selectedRoomCount || totalSelectedGuests > maxGuestsForSelection}
                    onClick={() => {
                      setShowGuestDetails(true);
                      window.setTimeout(() => document.getElementById('booking-guest-details')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
                    }}
                  >
                    Bron qilish
                  </button>
                  {!selectedRoomCount && <small className="booking-summary-hint">Avval xona tanlang</small>}
                  {!!selectedRoomCount && totalSelectedGuests > maxGuestsForSelection && <small className="booking-summary-hint error">Tanlangan xonalarda mehmonlar uchun joy yetarli emas</small>}
                </aside>
              </div>
              {showGuestDetails && (
                <section className="booking-guest-details" id="booking-guest-details">
                  <div className="booking-room-title"><p className="eyebrow">Mijoz ma’lumotlari</p><h3>Bronni rasmiylashtirish</h3></div>
                  <div className="form-row"><label>Ism<input name="firstname" value={form.firstname} onChange={updateField} required/></label><label>Familiya<input name="lastname" value={form.lastname} onChange={updateField} required/></label></div>
                  <div className="form-row"><label>Telefon<input name="phone" value={form.phone} onChange={updateField} placeholder="+998" required/></label><label>Email<input type="email" name="email" value={form.email} onChange={updateField} placeholder="hotel@example.com" required/></label></div>
                  <div className="form-row"><label>Kelish sanasi<input type="date" name="checkIn" min={today} value={form.checkIn} onChange={updateField} required/></label><label>Ketish sanasi<input type="date" name="checkOut" min={addDays(form.checkIn, 1)} value={form.checkOut} onChange={updateField} required/></label></div>
                  <div className="booking-selected-details" id="booking-details">
                    <h4>Tanlangan xonalar</h4>
                    {selectedEntries.map(({ room, quantity }) => (
                      <div className="booking-selected-detail-row" key={room.optionKey}>
                        <span><strong>{room.category}</strong><small data-no-translate>{copy.roomDetail(room.capacity, quantity)}</small></span>
                        <b data-no-translate>{formatPrice(getRoomPrice(room) * quantity * nights)}</b>
                      </div>
                    ))}
                    <div className="booking-selected-guests">
                      <span>Mehmonlar</span>
                      <strong data-no-translate>{copy.guestSummary(guestSelection.adults, guestSelection.children)}</strong>
                    </div>
                  </div>
                  <label>Izoh<textarea name="note" value={form.note} onChange={updateField} rows="4"/></label>
                  <div className="form-footer"><span data-no-translate>{copy.duration(nights)}</span><button type="submit" className="booking-submit-button" aria-busy={status === 'sending' || isBookingSending} disabled={status === 'sending' || isBookingSending || !form.roomType || totalSelectedGuests > maxGuestsForSelection}>{status === 'sending' || isBookingSending ? <><i className="booking-submit-spinner" aria-hidden="true"/>Yuborilmoqda...</> : 'Bron qilish'}</button></div>
                  {status==='offline'&&<p className="form-message">Hozir bronni yuborib bo‘lmadi. Iltimos, qayta urinib ko‘ring.</p>}
                  {status==='past-date'&&<p className="form-message">Kelish sanasi bugungi sanadan oldin bo‘lishi mumkin emas.</p>}
                  {status==='invalid-dates'&&<p className="form-message">Ketish sanasi kelish sanasidan keyin bo‘lishi kerak.</p>}
                </section>
              )}
            </form>
          </div>
        </section>
      )}
      {confirmation && (
        <section className="booking-page booking-page-success" aria-labelledby="booking-success-title">
          <div className="booking-success-panel">
            <div className="booking-success-icon" aria-hidden="true">✓</div>
            <p className="eyebrow">Bron qabul qilindi</p>
            <h2 id="booking-success-title">Xonangiz muvaffaqiyatli band qilindi</h2>
            <div className="booking-success-grid">
              <p><span>Bron raqami</span><strong>{confirmation.bookingReference || '-'}</strong></p>
              <p><span>Mehmon</span><strong>{confirmation.guestName || '-'}</strong></p>
              <p><span>Xona kategoriyasi</span><strong>{confirmation.roomCategory || '-'}</strong></p>
              {confirmation.roomNumber && <p><span>Xona</span><strong>{confirmation.roomNumber}</strong></p>}
              <p><span>Kelish</span><strong data-no-translate>{formatDisplayDate(confirmation.checkIn)}</strong></p>
              <p><span>Ketish</span><strong data-no-translate>{formatDisplayDate(confirmation.checkOut)}</strong></p>
              <p><span>Mehmonlar</span><strong>{confirmation.guests}</strong></p>
            </div>
            <p className="booking-confirmation-email">{confirmation.emailSent ? 'Bron qog‘ozi emailingizga yuborildi.' : 'Email yuborilmadi. Bron havolasini saqlab qo‘ying.'}</p>
            <div className="booking-success-actions">
              {confirmation.confirmationToken && <Link className="booking-success-home" to={`/booking-confirmation/${confirmation.confirmationToken}`}>Bron qog‘ozini ochish</Link>}
              <Link className="booking-success-home" to="/">Bosh sahifaga qaytish</Link>
            </div>
          </div>
        </section>
      )}
      {roomPreview && (
        <div className="room-preview" role="dialog" aria-modal="true" aria-label={`${roomPreview.title} rasmlari`} onMouseDown={closeRoomPreview}>
          <div className="room-preview-panel" onMouseDown={(event) => event.stopPropagation()}>
            <div className="room-preview-top">
              <div><h3>{roomPreview.title}</h3><p>{roomPreview.index + 1} / {roomPreview.images.length}</p></div>
              <button type="button" className="room-preview-close" onClick={closeRoomPreview} aria-label="Yopish" />
            </div>
            <div className="room-preview-main">
              {roomPreview.images.length > 1 && <button type="button" className="room-preview-nav room-preview-prev" onClick={() => moveRoomPreview(-1)} aria-label="Oldingi rasm" />}
              <img src={roomPreview.images[roomPreview.index]} alt={`${roomPreview.title} rasmi`} />
              {roomPreview.images.length > 1 && <button type="button" className="room-preview-nav room-preview-next" onClick={() => moveRoomPreview(1)} aria-label="Keyingi rasm" />}
            </div>
            {roomPreview.images.length > 1 && (
              <div className="room-preview-thumbs">
                {roomPreview.images.map((image, index) => (
                  <button type="button" className={index === roomPreview.index ? 'active' : ''} key={`${image}-${index}`} onClick={() => setRoomPreview((current) => ({ ...current, index }))} aria-label={`${index + 1}-rasmni ko‘rish`}>
                    <img src={image} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
