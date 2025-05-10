
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Image as ImageIcon } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-4 md:py-24">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-800">
              Trouvez la nounou <span className="text-pink-500">parfaite</span> pour votre famille
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-600">
              Nanny connecte les familles avec des nounous professionnelles et de confiance, pour une garde d'enfants sereine et sécurisée.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-gradient-to-r from-pink-500 to-pink-600 hover:opacity-90 text-white text-lg py-6 px-8"
                onClick={() => navigate("/register")}
              >
                Trouver une nounou
              </Button>
              <Button 
                variant="outline" 
                className="border-pink-500/40 text-pink-700 hover:bg-pink-50 text-lg py-6 px-8"
                onClick={() => navigate("/register?type=nanny")}
              >
                Je suis une nounou
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-pink-50 to-pink-100 rounded-xl opacity-50 group-hover:opacity-75 transition duration-300 ease-in-out blur-lg"></div>
            <img 
              src="https://images.unsplash.com/photo-1721322800607-8c38375eef04" 
              alt="Une famille heureuse avec une nounou" 
              className="rounded-lg shadow-xl w-full h-auto object-cover relative z-10 transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-4 right-4 bg-white/80 p-2 rounded-full shadow-md z-20 group-hover:bg-white transition duration-300">
              <ImageIcon className="w-6 h-6 text-pink-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
