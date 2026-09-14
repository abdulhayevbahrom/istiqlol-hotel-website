import { hotelFacts } from "../../data/hotelData";
import "./AboutIntro.css";

export default function AboutIntro() {
  return (
    <section className="about-intro" id="about-hotel">
      <div className="about-copy">
        <p className="eyebrow">Mehmonxona haqida</p>
        <h2>Namanganda qulay yashash uchun zamonaviy mehmonxona</h2>
        <p>
          Istiqlol Hotel Namangan shahrida sayyohlar va ishbilarmon mehmonlar
          uchun komfortli joylashuvni taklif etadi. Qulay manzil, puxta
          o‘ylangan servis va maqbul narxlar mehmonxonani shaharda qolish
          uchun ishonchli tanlovga aylantiradi.
        </p>
        <p>
          Mehmonlar standart xonalardan lyuksgacha bo‘lgan turli toifadagi
          shinam xonalardan foydalanishlari mumkin. Har bir xonada dam olish
          va ishlash uchun zarur sharoitlar, jumladan konditsioner, Wi-Fi va
          alohida hammom mavjud.
        </p>
        <p>
          Har kuni ertalab 07:00 dan 10:00 gacha bufet usulida nonushta
          beriladi. Istiqlol Hotel qisqa safar uchun ham, uzoq muddatli
          yashash uchun ham sokin muhit va kerakli qulayliklarni bir joyda
          jamlaydi.
        </p>
      </div>
      <dl className="facts-grid">
        {hotelFacts.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
