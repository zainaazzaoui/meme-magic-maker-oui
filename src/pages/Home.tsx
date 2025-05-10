
import React from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/home/HeroSection";
import FamilyProfileSection from "@/components/home/FamilyProfileSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import CTASection from "@/components/home/CTASection";
import Footer from "@/components/home/Footer";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1721322800607-8c38375eef04')`,
          opacity: 0.15
        }}
      />
      
      <div className="relative z-10 bg-gradient-to-b from-white to-pink-50/50 flex flex-col min-h-screen">
        <Header />
        
        <HeroSection />
        <FamilyProfileSection />
        <FeaturesSection />
        <BenefitsSection />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
