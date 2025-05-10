
import React from "react";
import { CheckCircle, Star, Calendar, Shield } from "lucide-react";

const BenefitsSection = () => {
  return (
    <section className="py-16 px-4 bg-pink-50/90">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800">Pourquoi choisir Nanny ?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-start">
            <CheckCircle className="w-6 h-6 text-pink-500 mr-4 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-xl mb-2">Profils vérifiés</h3>
              <p className="text-gray-600">Chaque nounou est vérifiée avec soin pour garantir votre sécurité et celle de vos enfants.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Star className="w-6 h-6 text-pink-500 mr-4 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-xl mb-2">Évaluations transparentes</h3>
              <p className="text-gray-600">Consultez les avis des autres familles pour faire un choix éclairé.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Calendar className="w-6 h-6 text-pink-500 mr-4 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-xl mb-2">Disponibilités en temps réel</h3>
              <p className="text-gray-600">Trouvez facilement une nounou disponible quand vous en avez besoin.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Shield className="w-6 h-6 text-pink-500 mr-4 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-xl mb-2">Plateforme sécurisée</h3>
              <p className="text-gray-600">Vos données et communications sont protégées par les meilleurs standards de sécurité.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
