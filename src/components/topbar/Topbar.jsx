import './Topbar.css';

export default function Topbar() {
  return (
    <div className="topbar">
      <a className="topbar-link" href="https://maps.app.goo.gl/s1ALmeSuJQ5kqKq1A" target="_blank" rel="noreferrer">
        <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 21s7-5.3 7-12A7 7 0 0 0 5 9c0 6.7 7 12 7 12Z" /><path d="M12 12.2a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" /></svg>
        <span>Namangan Province, Namangan</span>
      </a>
      <a className="topbar-link" href="tel:+998782230015">
        <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7A2 2 0 0 1 22 16.9Z" /></svg>
        <span>+998 78 223 00 15</span>
      </a>
    </div>
  );
}
