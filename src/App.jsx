import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AboutPage from './pages/AboutPage';
import ContactsPage from './pages/ContactsPage';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import SpecialOffersPage from './pages/SpecialOffersPage';
import BookingPage from './pages/BookingPage';
import BookingConfirmationPage from './pages/BookingConfirmationPage';

function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const id = decodeURIComponent(hash.slice(1));
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  }, [hash, pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/special-offers" element={<SpecialOffersPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/booking-confirmation/:token" element={<BookingConfirmationPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
