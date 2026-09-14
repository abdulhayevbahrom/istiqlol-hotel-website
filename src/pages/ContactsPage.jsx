import Booking from '../components/booking/Booking';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import Topbar from '../components/topbar/Topbar';
import './ContactsPage.css';

const contactCards = [
  {
    icon: 'pin',
    label: 'Manzil',
    value: 'Namangan viloyati, Davlatobod tumani, Islom Karimov ko‘chasi 20-uy',
    helper: 'Pochta indeksi: 160100',
    href: 'https://maps.app.goo.gl/s1ALmeSuJQ5kqKq1A',
  },
  {
    icon: 'gps',
    label: 'GPS koordinatalari',
    value: '40.9957124, 71.5888152',
    helper: 'Xaritada aniq lokatsiya',
    href: 'https://www.google.com/maps?q=40.9957124,71.5888152',
  },
  {
    icon: 'phone',
    label: 'Qabulxona',
    value: '+998 78 223 00 15',
    helper: '+998 78 223 00 16, 24/7 reception',
    href: 'tel:+998782230015',
  },
  {
    icon: 'mail',
    label: 'Email',
    value: 'hotel.istiqlol@mail.ru',
    helper: 'Back Office',
    href: 'mailto:hotel.istiqlol@mail.ru',
  },
];

const nearbyPlaces = [
  ['Afsonalar vodisyi parki', '2.6 km'],
  ['Namangan Xalqaro Aeroporti', '2 km'],
];

function ContactIcon({ name }) {
  const paths = {
    pin: (
      <>
        <path d="M12 21s7-5.3 7-12A7 7 0 0 0 5 9c0 6.7 7 12 7 12Z" />
        <path d="M12 12.2a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      </>
    ),
    gps: (
      <>
        <path d="M12 3v3" />
        <path d="M12 18v3" />
        <path d="M3 12h3" />
        <path d="M18 12h3" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </>
    ),
    phone: (
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7A2 2 0 0 1 22 16.9Z" />
    ),
    mail: (
      <>
        <path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
        <path d="m22 7-10 6L2 7" />
      </>
    ),
  };

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      {paths[name]}
    </svg>
  );
}

export default function ContactsPage() {
  return (
    <main>
      <Topbar />
      <Header />
      <section className="section contacts-page">
        <div className="contacts-hero">
          <p className="eyebrow">Aloqa</p>
          <h1>Istiqlol Hotel bilan bog‘lanish</h1>
          <p>
            Xona band qilish, manzilni aniqlash yoki mehmonxona bo‘yicha savol
            berish uchun qabulxona 24/7 ishlaydi.
          </p>
        </div>

        <div className="contacts-grid">
          <div className="contacts-card-grid">
            {contactCards.map((card) => (
              <a className="contact-card" href={card.href} target={card.href.startsWith('http') ? '_blank' : undefined} rel={card.href.startsWith('http') ? 'noreferrer' : undefined} key={card.label}>
                <span className="contact-icon"><ContactIcon name={card.icon} /></span>
                <span className="contact-label">{card.label}</span>
                <strong>{card.value}</strong>
                <small>{card.helper}</small>
              </a>
            ))}
          </div>

          <div className="contacts-map">
            <iframe
              title="Istiqlol Hotel Google xaritasi"
              src="https://www.google.com/maps?q=40.9957124,71.5888152&z=15&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>

        <div className="contacts-bottom">
          <section className="route-card">
            <p className="eyebrow">Joylashuv va yo‘nalish</p>
            <h2>Yaqin manzillar</h2>
            <div>
              {nearbyPlaces.map(([place, distance]) => (
                <p key={place}>
                  <strong>{distance}</strong>
                  <span>{place}</span>
                </p>
              ))}
            </div>
            <a href="https://maps.app.goo.gl/s1ALmeSuJQ5kqKq1A" target="_blank" rel="noreferrer">
              Google Maps’da ochish
            </a>
          </section>

          <section className="booking-callout">
            <p className="eyebrow">Online bron</p>
            <h2>Telefon kutmasdan xona band qiling</h2>
            <p>
              Xonani tez va ishonchli band qilish uchun online bron formasidan
              foydalaning va kelish vaqtigacha ma’lumotlaringiz tayyor bo‘lsin.
            </p>
            <a href="#booking">Bron formasiga o‘tish</a>
          </section>
        </div>
      </section>
      <Booking />
      <Footer />
    </main>
  );
}
