import "./AboutSections.css";

const infoItems = [
  ["Kelish vaqti", "14:00 dan boshlab ro'yxatdan o'tish"],
  ["Chiqish vaqti", "12:00 gacha ro'yxatdan chiqish"],
  ["Manzil", "Namangan viloyati, Davlatobod tumani, Islom Karimov ko'chasi 20-uy"],
  ["Aloqa", "+998 78 223 00 15, qabulxona 24/7"],
];

const loyaltyLevels = [
  ["Base", "10% chegirma", "Doimiy mehmonlar uchun boshlang'ich imtiyoz."],
  ["Silver", "12% chegirma", "5 kecha va undan ko'p jamg'argan mehmonlar uchun."],
  ["Gold", "15% chegirma", "10 kecha va undan ko'p jamg'argan mehmonlar uchun."],
];

const galleryImages = [
  ["/assets/banner-1.png", "Istiqlol Hotel tashqi ko'rinishi"],
  ["/assets/banner-2.png", "Istiqlol Hotel xonasi"],
  ["/assets/banner-3.png", "Istiqlol Hotel yotoq qismi"],
  ["/assets/banner-4.png", "Istiqlol Hotel xona interyeri"],
  ["/assets/banner-5.png", "Istiqlol Hotel qabulxonasi"],
  ["/assets/room-preview.png", "Istiqlol Hotel xona rasmi"],
];

export default function AboutSections() {
  return (
    <section className="about-sections" aria-label="Mehmonxona bo'limlari">
      <div className="about-menu-strip">
        <a href="#about-hotel">Mehmonxona haqida</a>
        <a href="#hotel-info">Ma'lumot</a>
        <a href="#loyalty">Sodiqlik dasturi</a>
        <a href="#photos">Fotogalereya</a>
        <a href="#restaurant">Restoran</a>
      </div>

      <div className="about-detail" id="hotel-info">
        <div>
          <p className="eyebrow">Ma'lumot</p>
          <h2>Mehmonlar uchun asosiy ma'lumotlar</h2>
          <p>
            Istiqlol Hotel shahar ichida qulay joylashgan. Aeroport va asosiy
            manzillarga yetib borish oson, qabulxona esa mehmonlarga kunu tun
            yordam beradi.
          </p>
        </div>
        <div className="info-grid">
          {infoItems.map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </div>

      <div className="about-detail loyalty-detail" id="loyalty">
        <div>
          <p className="eyebrow">Sodiqlik dasturi</p>
          <h2>Har safar ko'proq foyda</h2>
          <p>
            Doimiy mehmonlar uchun sodiqlik dasturi mavjud. Mehmonxonada
            ko'proq tunagan sari daraja oshadi va keyingi bandlovlarda
            chegirmalar yanada qulaylashadi.
          </p>
        </div>
        <div className="loyalty-grid">
          {loyaltyLevels.map(([level, discount, text]) => (
            <article key={level}>
              <span>{level}</span>
              <strong>{discount}</strong>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="about-detail gallery-detail" id="photos">
        <div>
          <p className="eyebrow">Fotogalereya</p>
          <h2>Xonalar va mehmonxona muhitidan lavhalar</h2>
        </div>
        <div className="about-gallery">
          {galleryImages.map(([src, alt]) => (
            <img key={src} src={src} alt={alt} />
          ))}
        </div>
      </div>

      <div className="about-detail restaurant-detail" id="restaurant">
        <img src="/assets/banner-5.png" alt="Istiqlol Hotel restoran va nonushta muhiti" />
        <div>
          <p className="eyebrow">Restoran</p>
          <h2>Kun mazali nonushta bilan boshlanadi</h2>
          <p>
            Mehmonxonada har kuni 07:00 dan 10:00 gacha bufet usulida nonushta
            taqdim etiladi. Yorug' va shinam zalda mehmonlar o'z didiga mos
            taomlarni tanlab, kunni yoqimli muhitda boshlashlari mumkin.
          </p>
          <p>
            Restoran qismi qisqa dam olish, ish uchrashuvi oldidan nonushta
            qilish yoki safar davomida xotirjam ovqatlanish uchun qulay.
          </p>
        </div>
      </div>
    </section>
  );
}
