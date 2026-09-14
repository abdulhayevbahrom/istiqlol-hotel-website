import { useEffect, useMemo, useState } from 'react';
import './Booking.css';

const fallbackCategories = ['Standard', 'Deluxe', 'Family'];
const today = new Date().toISOString().slice(0, 10);
const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
const initialForm = {
  firstname: '',
  lastname: '',
  phone: '',
  email: '',
  roomType: '',
  checkIn: today,
  checkOut: tomorrow,
  guests: '1',
  note: '',
};

const normalizeRoomsPayload = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.innerData)) return payload.innerData;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

export default function Booking() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');
  const [roomCategories, setRoomCategories] = useState([]);
  const [categoriesStatus, setCategoriesStatus] = useState('loading');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const categories = roomCategories.length ? roomCategories : fallbackCategories;
  const nights = useMemo(() => {
    if (!form.checkIn || !form.checkOut) return 1;
    const diff = Math.ceil((new Date(form.checkOut) - new Date(form.checkIn)) / 86400000);
    return Number.isFinite(diff) && diff > 0 ? diff : 1;
  }, [form.checkIn, form.checkOut]);

  useEffect(() => {
    let alive = true;

    fetch('/api/rooms')
      .then((response) => {
        if (!response.ok) throw new Error('rooms_failed');
        return response.json();
      })
      .then((payload) => {
        if (!alive) return;
        const nextCategories = [...new Set(
          normalizeRoomsPayload(payload)
            .map((room) => String(room?.category || '').trim())
            .filter(Boolean),
        )];
        setRoomCategories(nextCategories);
        setForm((current) => ({
          ...current,
          roomType: current.roomType || nextCategories[0] || fallbackCategories[0],
        }));
        setCategoriesStatus('ready');
      })
      .catch(() => {
        if (!alive) return;
        setRoomCategories([]);
        setForm((current) => ({ ...current, roomType: current.roomType || fallbackCategories[0] }));
        setCategoriesStatus('fallback');
      });

    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const handleRoomCategorySelect = (event) => {
      const category = String(event.detail?.category || '').trim();
      if (!category) return;
      setForm((current) => ({ ...current, roomType: category }));
      setStatus('idle');
      setIsModalOpen(true);
    };

    window.addEventListener('select-room-category', handleRoomCategorySelect);
    return () => window.removeEventListener('select-room-category', handleRoomCategorySelect);
  }, []);

  useEffect(() => {
    if (!isModalOpen && !confirmation) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
        setConfirmation(null);
      }
    };
    document.body.classList.add('booking-modal-open');
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.classList.remove('booking-modal-open');
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isModalOpen, confirmation]);

  useEffect(() => {
    if (!confirmation) return undefined;
    const timer = window.setTimeout(() => setConfirmation(null), 4000);
    return () => window.clearTimeout(timer);
  }, [confirmation]);

  const updateField = ({ target: { name, value } }) => setForm((current) => ({ ...current, [name]: value }));
  const submitBooking = async (event) => {
    event.preventDefault();
    setStatus('sending');
    try {
      const response = await fetch('/api/public/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, stayDays: nights, source: 'website' }),
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok) throw new Error(payload?.message || 'booking_failed');
      const booking = payload?.innerData || null;
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
      });
      setIsModalOpen(false);
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
    }
  };

  const bookingSearch = (
    <form className="booking-search" onSubmit={submitBooking}>
      <strong>Bron qilish</strong>
      <label>
        <span>Kelish</span>
        <input type="date" name="checkIn" value={form.checkIn} onChange={updateField} required />
      </label>
      <label>
        <span>Ketish</span>
        <input type="date" name="checkOut" value={form.checkOut} onChange={updateField} required />
      </label>
      <label>
        <span>Mehmonlar</span>
        <input type="number" min="1" max="6" name="guests" value={form.guests} onChange={updateField} />
      </label>
      <button type="button" onClick={() => setIsModalOpen(true)}>
        Topish
      </button>
    </form>
  );

  return (
    <>
      <div className="booking-search-wrap" id="booking">{bookingSearch}</div>
      {isModalOpen && (
        <div className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-modal-title">
          <button className="booking-modal-backdrop" type="button" aria-label="Modalni yopish" onClick={() => setIsModalOpen(false)} />
          <div className="booking-modal-panel">
            <div className="booking-modal-head">
              <div>
                <p className="eyebrow">Online bron</p>
                <h2 id="booking-modal-title">Xona band qilish</h2>
              </div>
              <button className="booking-modal-close" type="button" aria-label="Modalni yopish" onClick={() => setIsModalOpen(false)}>×</button>
            </div>
            <form className="booking-form" onSubmit={submitBooking}>
              <div className="form-row"><label>Ism<input name="firstname" value={form.firstname} onChange={updateField} required/></label><label>Familiya<input name="lastname" value={form.lastname} onChange={updateField} required/></label></div>
              <div className="form-row"><label>Telefon<input name="phone" value={form.phone} onChange={updateField} placeholder="+998" required/></label><label>Email<input type="email" name="email" value={form.email} onChange={updateField} placeholder="hotel@example.com"/></label></div>
              <div className="form-row"><label>Kelish sanasi<input type="date" name="checkIn" value={form.checkIn} onChange={updateField} required/></label><label>Ketish sanasi<input type="date" name="checkOut" value={form.checkOut} onChange={updateField} required/></label></div>
              <div className="form-row" id="booking-details"><label>Xona kategoriyasi<select name="roomType" value={form.roomType} onChange={updateField} disabled={categoriesStatus==='loading'}>{categories.map((category)=><option key={category} value={category}>{category}</option>)}</select></label><label>Mehmonlar<input type="number" min="1" max="6" name="guests" value={form.guests} onChange={updateField}/></label></div>
              {categoriesStatus==='fallback'&&<p className="form-message">Kategoriyalar bazadan olinmadi, vaqtincha standart ro‘yxat ko‘rsatildi.</p>}
              <label>Izoh<textarea name="note" value={form.note} onChange={updateField} rows="4"/></label>
              <div className="form-footer"><span>{nights} kunlik bron</span><button type="submit" disabled={status==='sending'}>{status==='sending'?'Yuborilmoqda...':'Bron yuborish'}</button></div>
              {status==='offline'&&<p className="form-message">Hozir bronni yuborib bo‘lmadi. Iltimos, qayta urinib ko‘ring.</p>}
            </form>
          </div>
        </div>
      )}
      {confirmation && (
        <div className="booking-modal booking-success-modal" role="dialog" aria-modal="true" aria-labelledby="booking-success-title">
          <button className="booking-modal-backdrop" type="button" aria-label="Xabarni yopish" onClick={() => setConfirmation(null)} />
          <div className="booking-success-panel">
            <div className="booking-success-icon" aria-hidden="true">✓</div>
            <p className="eyebrow">Bron qabul qilindi</p>
            <h2 id="booking-success-title">Xonangiz muvaffaqiyatli band qilindi</h2>
            <div className="booking-success-grid">
              <p><span>Mehmon</span><strong>{confirmation.guestName || '-'}</strong></p>
              <p><span>Xona kategoriyasi</span><strong>{confirmation.roomCategory || '-'}</strong></p>
              {confirmation.roomNumber && <p><span>Xona</span><strong>{confirmation.roomNumber}</strong></p>}
              <p><span>Kelish</span><strong>{confirmation.checkIn}</strong></p>
              <p><span>Ketish</span><strong>{confirmation.checkOut}</strong></p>
              <p><span>Mehmonlar</span><strong>{confirmation.guests}</strong></p>
            </div>
            <small>Bu xabar 4 sekunddan so‘ng avtomatik yopiladi.</small>
          </div>
        </div>
      )}
    </>
  );
}
