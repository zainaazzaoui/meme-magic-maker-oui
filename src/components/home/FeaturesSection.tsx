
import React from "react";
import { Search, MessageCircle, BadgeCheck } from "lucide-react";

const FeaturesSection = () => {
  return (
    <section className="py-16 px-4 bg-white/80">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800">Comment ça fonctionne</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-pink-50 p-8 rounded-lg shadow-md text-center">
            <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 h-8 text-pink-500" />
            </div>
            <h3 className="font-bold text-xl mb-4">Recherchez</h3>
            <p className="text-gray-600">Trouvez des nounous qualifiées selon vos critères de localisation et d'expérience.</p>
          </div>
          
          <div className="bg-pink-50 p-8 rounded-lg shadow-md text-center">
            <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-8 h-8 text-pink-500" />
            </div>
            <h3 className="font-bold text-xl mb-4">Communiquez</h3>
            <p className="text-gray-600">Échangez directement avec les nounous pour mieux connaître leurs services.</p>
          </div>
          
          <div className="bg-pink-50 p-8 rounded-lg shadow-md text-center">
            <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <BadgeCheck className="w-8 h-8 text-pink-500" />
            </div>
            <h3 className="font-bold text-xl mb-4">Choisissez</h3>
            <p className="text-gray-600">Sélectionnez la personne qui correspond le mieux à vos besoins et à vos valeurs.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
