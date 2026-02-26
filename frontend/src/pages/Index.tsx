import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorks from "@/components/landing/HowItWorks";
import QRTypesShowcase from "@/components/landing/QRTypesShowcase";
import FeaturesSection from "@/components/landing/FeaturesSection";
import Testimonials from "@/components/landing/Testimonials";
import FAQSection from "@/components/landing/FAQSection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorks />
        <QRTypesShowcase />
        <FeaturesSection />
        <Testimonials />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;