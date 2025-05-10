
import React from "react";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-pink-400" />
              <h2 className="text-2xl font-bold text-pink-400">Nanny</h2>
            </div>
            <p className="text-gray-400 max-w-xs">La plateforme qui connecte facilement et en toute sécurité les familles avec des nounous.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-4 text-lg">Navigation</h3>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-400 hover:text-white transition">Accueil</a></li>
                <li><a href="/search" className="text-gray-400 hover:text-white transition">Rechercher</a></li>
                <li><a href="/login" className="text-gray-400 hover:text-white transition">Connexion</a></li>
                <li><a href="/register" className="text-gray-400 hover:text-white transition">Inscription</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4 text-lg">Ressources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Conseils</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4 text-lg">Légal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Conditions d'utilisation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Politique de confidentialité</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Mentions légales</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-10 pt-6 text-center md:text-left">
          <p className="text-gray-400">© 2025 Nanny - Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
