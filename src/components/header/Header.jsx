import { Link, NavLink } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageProvider';
import './Header.css';

export default function Header() {
  const { language, setLanguage } = useLanguage();
  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="Istiqlol Hotel bosh sahifa">
        <img src="/assets/istiqlol-hotel-logo.png" alt="" /><span>Istiqlol Hotel</span>
      </Link>
      <nav aria-label="Asosiy menyu">
        <Link to="/#rooms">Xonalar</Link>
        <NavLink to="/services">Xizmatlar</NavLink>
        <NavLink to="/special-offers">Takliflar</NavLink>
        <div className="nav-dropdown">
          <NavLink to="/about">Biz haqimizda</NavLink>
          <div className="nav-dropdown-menu">
            <Link to="/about#about-hotel">Mehmonxona haqida</Link>
            <Link to="/about#hotel-info">Ma'lumot</Link>
            <Link to="/about#loyalty">Sodiqlik dasturi</Link>
            <Link to="/about#photos">Fotogalereya</Link>
            <Link to="/about#restaurant">Restoran</Link>
          </div>
        </div>
        <Link to="/#booking">Bron</Link>
        <NavLink to="/contacts">Aloqa</NavLink>
      </nav>
      <label className="language-select">
        <span className="sr-only">Til / Язык / Language</span>
        <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg>
        <select value={language} onChange={(event) => setLanguage(event.target.value)} aria-label="Til / Язык / Language">
          <option value="uz">UZ</option>
          <option value="ru">RU</option>
          <option value="en">EN</option>
        </select>
      </label>
    </header>
  );
}
