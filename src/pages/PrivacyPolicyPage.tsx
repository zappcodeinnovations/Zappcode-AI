import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PrivacyPolicy from '../components/PrivacyPolicy';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <PrivacyPolicy />
      </div>
      <Footer />
    </div>
  );
}
