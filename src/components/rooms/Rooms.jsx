import { useEffect, useState } from 'react';
import { useLanguage } from '../../i18n/LanguageProvider';
import { useGetPublicRoomCategoriesQuery } from '../../store/websiteApi';
import { API_BASE_URL } from '../../config/apiConfig';
import './Rooms.css';
import './RoomsHorizontal.css';

const formatMoney = (value, language) => {
  const amount = Number(value || 0);
  if (!amount) return {
    uz: 'Narx admin panelda kiritilmagan',
    ru: 'Цена не указана в панели управления',
    en: 'Price has not been entered in the admin panel',
  }[language];

  const locale = language === 'ru' ? 'ru-RU' : language === 'en' ? 'en-US' : 'uz-UZ';
  const currency = language === 'ru' ? 'сум' : language === 'en' ? 'UZS' : 'so‘m';
  return `${amount.toLocaleString(locale)} ${currency}`;
};

const roomLabels = {
  uz: { perNight: '1 kecha uchun', viewPhotos: 'rasmlarini ko‘rish', roomView: 'ko‘rinishi', photos: 'rasmlari', photo: 'rasmi', close: 'Yopish', previous: 'Oldingi rasm', next: 'Keyingi rasm', image: 'rasmni ko‘rish' },
  ru: { perNight: 'за 1 ночь', viewPhotos: 'посмотреть фотографии', roomView: 'вид номера', photos: 'фотографии', photo: 'фотография', close: 'Закрыть', previous: 'Предыдущее фото', next: 'Следующее фото', image: 'открыть фото' },
  en: { perNight: 'per night', viewPhotos: 'view photos', roomView: 'room view', photos: 'photos', photo: 'photo', close: 'Close', previous: 'Previous photo', next: 'Next photo', image: 'view image' },
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

const resolveRoomImage = (image) => {
  const src = String(image || '').trim();
  if (!src) return '/assets/room-preview.png';
  if (/^(https?:)?\/\//i.test(src) || src.startsWith('data:')) return src;
  if (src.startsWith('/uploads') && API_BASE_URL) return `${API_BASE_URL}${src}`;
  return src;
};

export default function Rooms() {
  const { language } = useLanguage();
  const labels = roomLabels[language];
  const { data: categories = [], isLoading, isError } = useGetPublicRoomCategoriesQuery();
  const [preview, setPreview] = useState(null);

  const selectRoomCategory = (category) => {
    window.dispatchEvent(new CustomEvent('select-room-category', { detail: { category } }));
  };

  const openPreview = (room, index = 0) => {
    const images = (room.images || []).map(resolveRoomImage).filter(Boolean);
    if (!images.length) return;
    setPreview({ title: room.category, images, index });
  };

  const closePreview = () => setPreview(null);

  const movePreview = (step) => {
    setPreview((current) => {
      if (!current) return current;
      const nextIndex = (current.index + step + current.images.length) % current.images.length;
      return { ...current, index: nextIndex };
    });
  };

  useEffect(() => {
    if (!preview) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closePreview();
      if (event.key === 'ArrowLeft') movePreview(-1);
      if (event.key === 'ArrowRight') movePreview(1);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [preview]);

  return (
    <section className="section rooms-section" id="rooms">
      <div className="section-heading">
        <p className="eyebrow">Xonalar</p>
        <h2>Safaringizga mos xona kategoriyasini tanlang</h2>
        <p>Ko‘rsatilgan narxlar chet ellik mehmonlar uchun bazadagi xona narxlari asosida chiqadi.</p>
      </div>
      {isLoading && (
        <div className="rooms-loader" role="status" aria-live="polite">
          <span />
          <p>Xonalar yuklanmoqda...</p>
        </div>
      )}
      {isError && (
        <p className="rooms-notice">Xonalarni yuklashda xatolik yuz berdi. Iltimos, birozdan keyin qayta urinib ko‘ring.</p>
      )}
      {!isLoading && !isError && (
        <div className="room-grid">
          {categories.map((room) => (
          <article className="room-card" key={room.category}>
            <button className="room-image-button" type="button" onClick={() => openPreview(room)} aria-label={`${room.category}: ${labels.viewPhotos}`}>
              <img src={resolveRoomImage(room.images?.[0])} alt={`${room.category}: ${labels.roomView}`} />
              <span>Rasmlarni ko‘rish</span>
            </button>
            <div className="room-card-body">
              <div className="room-card-copy">
                <h3>{room.category}</h3>
                <span>{room.capacity} kishilik</span>
              </div>
              <div className="room-card-action">
                <strong>{formatMoney(room.minForeignPrice, language)} <small>{labels.perNight}</small></strong>
                <button type="button" onClick={() => selectRoomCategory(room.category)}>Bron qilish</button>
              </div>
            </div>
            <div className="room-card-amenities">
              {roomAmenities.map(([icon, label]) => (
                <small key={label}><AmenityIcon name={icon}/>{label}</small>
              ))}
            </div>
          </article>
          ))}
        </div>
      )}
      {preview && (
        <div className="room-preview" role="dialog" aria-modal="true" aria-label={`${preview.title}: ${labels.photos}`} onMouseDown={closePreview}>
          <div className="room-preview-panel" onMouseDown={(event) => event.stopPropagation()}>
            <div className="room-preview-top">
              <div>
                <h3>{preview.title}</h3>
                <p>{preview.index + 1} / {preview.images.length}</p>
              </div>
              <button type="button" className="room-preview-close" onClick={closePreview} aria-label={labels.close} />
            </div>
            <div className="room-preview-main">
              {preview.images.length > 1 && (
                <button type="button" className="room-preview-nav room-preview-prev" onClick={() => movePreview(-1)} aria-label={labels.previous} />
              )}
              <img src={preview.images[preview.index]} alt={`${preview.title}: ${labels.photo}`} />
              {preview.images.length > 1 && (
                <button type="button" className="room-preview-nav room-preview-next" onClick={() => movePreview(1)} aria-label={labels.next} />
              )}
            </div>
            {preview.images.length > 1 && (
              <div className="room-preview-thumbs">
                {preview.images.map((image, index) => (
                  <button
                    type="button"
                    className={index === preview.index ? 'active' : ''}
                    key={image}
                    onClick={() => setPreview((current) => ({ ...current, index }))}
                    aria-label={`${index + 1}: ${labels.image}`}
                  >
                    <img src={image} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
