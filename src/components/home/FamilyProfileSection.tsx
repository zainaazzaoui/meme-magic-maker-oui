
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Users, Calendar, Check } from "lucide-react";

const FamilyProfileSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-4 bg-white/90">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center text-gray-800">Votre profil de famille</h2>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">Personnalisez votre profil pour trouver la nounou idéale qui correspond parfaitement aux besoins de votre famille.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 order-2 md:order-1">
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h3 className="font-bold text-xl mb-4 flex items-center text-pink-700">
                <Users className="mr-2 w-5 h-5" />
                Informations de la famille
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Type de famille</span>
                  <span className="font-medium">Couple avec 2 enfants</span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Âges des enfants</span>
                  <span className="font-medium">3 ans, 6 ans</span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Localisation</span>
                  <span className="font-medium">Paris, 75015</span>
                </div>
                <div className="flex items-center justify-between pb-2">
                  <span className="text-gray-600">Langues parlées</span>
                  <span className="font-medium">Français, Anglais</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h3 className="font-bold text-xl mb-4 flex items-center text-pink-700">
                <Calendar className="mr-2 w-5 h-5" />
                Besoins de garde
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Après l'école</p>
                    <p className="text-sm text-gray-600">Lundi, Mardi, Jeudi de 16h30 à 19h00</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Mercredi entier</p>
                    <p className="text-sm text-gray-600">De 8h30 à 18h00</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Occasionnellement les week-ends</p>
                    <p className="text-sm text-gray-600">Selon disponibilité</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Button 
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:opacity-90 text-white py-6"
              onClick={() => navigate("/register")}
            >
              Compléter mon profil
            </Button>
          </div>
          
          <div className="relative order-1 md:order-2 group">
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-100 to-pink-50 rounded-xl opacity-60 group-hover:opacity-80 transition duration-300 ease-in-out blur-lg"></div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1517022812141-23620dba5c23" 
                alt="Une famille" 
                className="rounded-xl shadow-xl w-full h-auto object-cover z-10 transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 rounded-b-xl">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">FM</span>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Famille Martin</h3>
                    <p className="text-white/80 text-sm">Membre depuis 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FamilyProfileSection;
