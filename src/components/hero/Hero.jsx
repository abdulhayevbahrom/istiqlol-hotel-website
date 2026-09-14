import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { bannerImages } from '../../data/hotelData';
import './Hero.css';

export default function Hero() {
  const [activeBanner, setActiveBanner] = useState(0);
  useEffect(() => { const timer = window.setInterval(() => setActiveBanner((value) => (value + 1) % bannerImages.length), 4500); return () => window.clearInterval(timer); }, []);
  return (
    <section className="hero" id="top">
      <div className="hero-carousel" aria-hidden="true">{bannerImages.map((image,index)=><img className={index===activeBanner?'active':''} src={image.src} alt="" key={image.src}/>)}</div>
      <div className="hero-content"><p className="eyebrow">Mehmonlar uchun qulay joylashuv</p><h1>Istiqlol Hotel</h1><p className="hero-text">Shaharda sokin tunash, toza xonalar va tezkor bron qilish uchun ishonchli mehmonxona.</p><div className="hero-actions"><Link className="button primary" to="/#booking">Xona band qilish</Link><a className="button secondary" href="tel:+998782230015">Qo‘ng‘iroq qilish</a></div></div>
      <div className="carousel-dots hero-dots" aria-label="Banner rasmlari">{bannerImages.map((image,index)=><button className={index===activeBanner?'active':''} type="button" aria-label={`${index+1}-rasmni ko‘rsatish`} onClick={()=>setActiveBanner(index)} key={image.src}/>)}</div>
    </section>
  );
}
