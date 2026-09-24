import { Link, useParams } from 'react-router-dom';
import { API_URL } from '../config/apiConfig';
import { useGetPublicBookingConfirmationQuery } from '../store/websiteApi';
import { useLanguage } from '../i18n/LanguageProvider';
import './BookingConfirmationPage.css';

const formatPrice = (value) => `${Number(value || 0).toLocaleString('uz-UZ')} UZS`;
const formatDate = (value) => {
  if (!value) return '-';
  const parts = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'Asia/Tashkent',
  }).formatToParts(new Date(value));
  const part = (type) => parts.find((item) => item.type === type)?.value || '';
  return `${part('day')}.${part('month')}.${part('year')}`;
};

export default function BookingConfirmationPage() {
  const { language } = useLanguage();
  const localized = {
    uz: { resident: 'O‘zbekiston rezidenti', nonresident: 'Norezident', capacity: (count) => `${count} kishilik` },
    ru: { resident: 'Резидент Узбекистана', nonresident: 'Нерезидент', capacity: (count) => `На ${count} чел.` },
    en: { resident: 'Uzbekistan resident', nonresident: 'Non-resident', capacity: (count) => `Sleeps ${count}` },
  }[language];
  const { token } = useParams();
  const { data: booking, isLoading, isError } = useGetPublicBookingConfirmationQuery(token, { skip: !token });

  return (
    <main className="confirmation-page">
      <section className="confirmation-sheet">
        <div className="confirmation-brand"><span>IH</span><div><strong>Istiqlol Hotel</strong><small>Bron tasdiq qog‘ozi</small></div></div>
        {isLoading && <p className="confirmation-state">Bron ma’lumotlari yuklanmoqda...</p>}
        {isError && <div className="confirmation-state error"><h1>Bron topilmadi</h1><p>Havola noto‘g‘ri yoki yaroqsiz.</p><Link to="/">Bosh sahifaga qaytish</Link></div>}
        {booking && (
          <>
            <div className="confirmation-status"><span>✓</span><div><h1>Bron tasdiqlandi</h1><p>Bron raqami: <strong>{booking.reference}</strong></p></div></div>
            <div className="confirmation-info">
              <p><span>Mehmon</span><strong>{booking.guestName}</strong></p>
              <p><span>Telefon</span><strong>{booking.phone}</strong></p>
              <p><span>Email</span><strong>{booking.email}</strong></p>
              <p><span>Rezidentlik</span><strong data-no-translate>{booking.guestType === 'chetellik' ? localized.nonresident : localized.resident}</strong></p>
              <p><span>Kelish</span><strong data-no-translate>{formatDate(booking.checkIn)}</strong></p>
              <p><span>Ketish</span><strong data-no-translate>{formatDate(booking.checkOut)}</strong></p>
            </div>
            <div className="confirmation-rooms">
              <h2>Tanlangan xonalar</h2>
              {booking.rooms?.map((room, index) => (
                <div key={`${room.roomNumber}-${index}`}><span><strong>{room.category}</strong><small data-no-translate>{localized.capacity(room.capacity)} · {room.roomNumber}</small></span><b>{formatPrice(room.dailyRate * room.stayDays)}</b></div>
              ))}
              <div className="confirmation-total"><span>Jami</span><strong>{formatPrice(booking.totalAmount)}</strong></div>
            </div>
            <div className="confirmation-actions">
              <a href={`${API_URL}/public/booking/${token}/pdf`} download>PDF yuklab olish</a>
              <Link to="/">Bosh sahifa</Link>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
