import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AboutUs from '../components/AboutUs';

export default function AboutUsPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <AboutUs />
      </div>
      <Footer />
    </div>
  );
}
