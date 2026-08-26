import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TermsAndConditions from '../components/TermsAndConditions';

export default function TermsAndConditionsPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <TermsAndConditions />
      </div>
      <Footer />
    </div>
  );
}
