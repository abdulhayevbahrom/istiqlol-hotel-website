import { useEffect, useState } from 'react';
import { useLanguage } from '../../i18n/LanguageProvider';
import './Rooms.css';

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL
  || import.meta.env.VITE_BACKEND_BASE_URL
  || ''
).replace(/\/+$/, '');

const normalizeCategoriesPayload = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.innerData)) return payload.innerData;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

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

const pluralizeRu = (value, forms) => {
  const lastTwo = value % 100;
  const last = value % 10;
  if (lastTwo >= 11 && lastTwo <= 14) return forms[2];
  if (last === 1) return forms[0];
  if (last >= 2 && last <= 4) return forms[1];
  return forms[2];
};

const formatRoomAvailability = (capacityValue, countValue, language) => {
  const capacity = Number(capacityValue) || 1;
  const count = Number(countValue) || 0;

  if (language === 'ru') {
    return `До ${capacity} ${pluralizeRu(capacity, ['гостя', 'гостей', 'гостей'])} · ${count} ${pluralizeRu(count, ['номер', 'номера', 'номеров'])}`;
  }
  if (language === 'en') {
    return `Up to ${capacity} ${capacity === 1 ? 'guest' : 'guests'} · ${count} ${count === 1 ? 'room' : 'rooms'}`;
  }
  return `${capacity} mehmon uchun · ${count} ta xona`;
};

const roomLabels = {
  uz: { perNight: '1 kecha uchun', viewPhotos: 'rasmlarini ko‘rish', roomView: 'ko‘rinishi', photos: 'rasmlari', photo: 'rasmi', close: 'Yopish', previous: 'Oldingi rasm', next: 'Keyingi rasm', image: 'rasmni ko‘rish' },
  ru: { perNight: 'за 1 ночь', viewPhotos: 'посмотреть фотографии', roomView: 'вид номера', photos: 'фотографии', photo: 'фотография', close: 'Закрыть', previous: 'Предыдущее фото', next: 'Следующее фото', image: 'открыть фото' },
  en: { perNight: 'per night', viewPhotos: 'view photos', roomView: 'room view', photos: 'photos', photo: 'photo', close: 'Close', previous: 'Previous photo', next: 'Next photo', image: 'view image' },
};

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
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState('loading');
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    let alive = true;

    fetch('/api/public/room-categories')
      .then((response) => {
        if (!response.ok) throw new Error('room_categories_failed');
        return response.json();
      })
      .then((payload) => {
        if (!alive) return;
        setCategories(normalizeCategoriesPayload(payload));
        setStatus('ready');
      })
      .catch(() => {
        if (!alive) return;
        setCategories([]);
        setStatus('error');
      });

    return () => {
      alive = false;
    };
  }, []);

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
      {status === 'loading' && (
        <div className="rooms-loader" role="status" aria-live="polite">
          <span />
          <p>Xonalar yuklanmoqda...</p>
        </div>
      )}
      {status === 'error' && (
        <p className="rooms-notice">Xonalarni yuklashda xatolik yuz berdi. Iltimos, birozdan keyin qayta urinib ko‘ring.</p>
      )}
      {status === 'ready' && (
        <div className="room-grid">
          {categories.map((room) => (
          <article className="room-card" key={room.category}>
            <button className="room-image-button" type="button" onClick={() => openPreview(room)} aria-label={`${room.category}: ${labels.viewPhotos}`}>
              <img src={resolveRoomImage(room.images?.[0])} alt={`${room.category}: ${labels.roomView}`} />
              <span>Rasmlarni ko‘rish</span>
            </button>
            <div>
              <span>{formatRoomAvailability(room.capacity, room.count, language)}</span>
              <h3>{room.category}</h3>
              <strong>{formatMoney(room.minForeignPrice, language)} <small>{labels.perNight}</small></strong>
              <button type="button" onClick={() => selectRoomCategory(room.category)}>Bron qilish</button>
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
