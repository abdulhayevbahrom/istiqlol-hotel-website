import Booking from '../components/booking/Booking';
import Footer from '../components/footer/Footer';
import Gallery from '../components/gallery/Gallery';
import Header from '../components/header/Header';
import Hero from '../components/hero/Hero';
import Rooms from '../components/rooms/Rooms';
import Topbar from '../components/topbar/Topbar';

export default function HomePage() {
  return <main><Topbar /><Header /><Hero /><Booking /><Rooms /><Gallery /><Footer /></main>;
}
