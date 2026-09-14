import { services } from '../../data/hotelData';
import './Services.css';

export default function Services() {
  return (
    <section className="section services-section" id="services">
      <div className="services-heading">
        <p className="eyebrow">Xizmatlar</p>
        <h2>Dam olish va ish safari uchun kerakli xizmatlar</h2>
        <p>
          Istiqlol Hotel Namanganda qulay yashash uchun asosiy va qo‘shimcha
          xizmatlarni bir joyda taqdim etadi.
        </p>
      </div>

      <div className="service-summary-grid">
        <article>
          <h3>Asosiy xizmatlar</h3>
          <ul>
            {services.main.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </article>
        <article>
          <h3>Qo‘shimcha xizmatlar</h3>
          <ul>
            {services.extra.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </article>
      </div>

      <div className="stay-service-grid">
        {services.stayServices.map((service) => (
          <article className="stay-service-card" key={service.title}>
            <img src={service.image} alt={`${service.title} xizmati`} />
            <div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="amenities-panel">
        <div>
          <p className="eyebrow">Qulayliklar</p>
          <h3>Xonalarda mavjud jihozlar</h3>
        </div>
        <div className="amenities-grid">
          {services.amenities.map((amenity) => (
            <span key={amenity}>{amenity}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
