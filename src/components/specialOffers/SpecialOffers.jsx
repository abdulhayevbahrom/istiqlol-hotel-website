import { specialOffers } from '../../data/hotelData';
import './SpecialOffers.css';

export default function SpecialOffers() {
  return (
    <section className="section special-offers-section" id="special-offers">
      <div className="special-offers-heading">
        <p className="eyebrow">Maxsus takliflar</p>
        <h2>Qolish muddati va rejangizga mos foydali tariflar</h2>
        <p>
          Uzoqroq yashash yoki safarni oldindan rejalashtirish orqali Istiqlol
          Hotel’da yanada qulay shartlarda bron qiling.
        </p>
      </div>

      <div className="offers-grid">
        {specialOffers.map((offer) => (
          <article className="offer-card" key={offer.title}>
            <div className="offer-image">
              <img src={offer.image} alt={`${offer.title} taklifi`} />
              <span>{offer.badge}</span>
            </div>
            <div className="offer-body">
              <div className="offer-title-row">
                <h3>{offer.title}</h3>
                <strong>{offer.discount}</strong>
              </div>
              <p>{offer.text}</p>

              <div className="offer-list-wrap">
                <div>
                  <h4>Tarif shartlari</h4>
                  <ul>
                    {offer.terms.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4>Afzalliklar</h4>
                  <ul>
                    {offer.advantages.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <a className="offer-button" href="#booking">Bron qilish</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
