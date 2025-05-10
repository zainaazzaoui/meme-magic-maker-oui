
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-4 bg-pink-600 text-white">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à trouver la nounou idéale ?</h2>
        <p className="text-lg md:text-xl mb-8">Rejoignez des milliers de familles qui font confiance à Nanny pour la garde de leurs enfants.</p>
        <Button 
          className="bg-white text-pink-600 hover:bg-gray-100 text-lg py-6 px-10"
          onClick={() => navigate("/register")}
        >
          Créer un compte
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
