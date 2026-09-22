import Booking from '../components/booking/Booking';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import Topbar from '../components/topbar/Topbar';

export default function BookingPage() {
  return (
    <main>
      <Topbar />
      <Header />
      <Booking standalone />
      <Footer />
    </main>
  );
}
