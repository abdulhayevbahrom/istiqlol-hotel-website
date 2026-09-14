import AboutHero from '../components/aboutHero/AboutHero';
import AboutIntro from '../components/aboutIntro/AboutIntro';
import AboutSections from '../components/aboutSections/AboutSections';
import BookingRules from '../components/bookingRules/BookingRules';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import StayConditions from '../components/stayConditions/StayConditions';
import Topbar from '../components/topbar/Topbar';

export default function AboutPage() {
  return <main><Topbar /><Header /><AboutHero /><AboutIntro /><AboutSections /><StayConditions /><BookingRules /><Footer /></main>;
}
