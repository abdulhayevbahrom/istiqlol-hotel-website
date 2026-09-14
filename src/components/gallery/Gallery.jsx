import './Gallery.css';

export default function Gallery() {
  return (
    <section className="section gallery-section">
      <img src="/assets/room-preview.png" alt="Istiqlol Hotel xona rasmi" />
      <div className="map-frame">
        <iframe
          title="Istiqlol Hotel Google xaritasi"
          src="https://www.google.com/maps?q=40.9957124,71.5888152&z=15&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <a href="https://maps.app.goo.gl/s1ALmeSuJQ5kqKq1A" target="_blank" rel="noreferrer">
          Google Maps’da ochish
        </a>
      </div>
    </section>
  );
}
