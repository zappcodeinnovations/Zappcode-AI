import Navbar from '../components/Navbar';
import ContactPage from '../components/ContactPage';
import Footer from '../components/Footer';

export default function ContactUsPage() {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '80px' }}>
        <ContactPage />
      </div>
      <Footer />
    </>
  );
}
