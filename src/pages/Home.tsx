import React from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Star, Calendar, BadgeCheck, MessageCircle, Shield, Search, Heart } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1617311444093-08e1f8ae2ec7?auto=format&fit=crop&w=1920&q=80')`,
          opacity: 0.15
        }}
      />
      
      <div className="relative z-10 bg-gradient-to-b from-white to-pink-50/50 flex flex-col min-h-screen">
        <Header />
        
        {/* Hero Section */}
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
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                  alt="Une nounou s'occupant d'un enfant" 
                  className="rounded-lg shadow-xl w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
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
        
        {/* Benefits Section */}
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
        
        {/* CTA Section */}
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
        
        {/* Footer */}
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
      </div>
    </div>
  );
};

export default Home;
