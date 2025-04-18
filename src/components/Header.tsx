
import { Heart, Search, User, LogIn, Menu, X, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // État simulé pour démontrer la fonctionnalité (à remplacer par un vrai système d'authentification)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<"family" | "nanny" | "admin" | null>(null);
  const [language, setLanguage] = useState<"fr" | "ar">("fr");
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const changeLanguage = (lang: "fr" | "ar") => {
    setLanguage(lang);
    // Ici vous pourriez implémenter la logique pour changer la langue dans l'application
    // Par exemple, stocker la préférence dans localStorage
    localStorage.setItem("language", lang);
    // Recharger la page pour appliquer les changements (dans une implémentation complète, vous utiliseriez un contexte ou une bibliothèque i18n)
    window.location.reload();
  };
  
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm py-3 px-4 md:px-6 sticky top-0 z-50">
      <div className="container max-w-7xl mx-auto flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <Heart className="w-6 h-6 text-pink-500" />
          <h1 className="text-xl md:text-2xl font-bold text-pink-500">Nanny</h1>
        </div>
        
        {/* Navigation sur desktop */}
        <nav className="hidden md:flex items-center gap-6">
          <Button 
            variant="ghost"
            className="flex items-center gap-2" 
            onClick={() => navigate("/search")}
          >
            <Search className="w-4 h-4" />
            Rechercher
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <Globe className="w-4 h-4" />
                Langue
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => changeLanguage("fr")}>
                Français
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage("ar")}>
                العربية
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {!isLoggedIn ? (
            <>
              <Button 
                variant="outline" 
                className="border-pink-500/40 text-pink-700 hover:bg-pink-50"
                onClick={() => navigate("/login")}
              >
                <LogIn className="w-4 h-4 mr-2" />
                Connexion
              </Button>
              <Button 
                className="bg-gradient-to-r from-pink-500 to-pink-600 hover:opacity-90 text-white"
                onClick={() => navigate("/register")}
              >
                S'inscrire
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="ghost"
                onClick={() => navigate(userType === "family" ? "/family/dashboard" : userType === "nanny" ? "/nanny/dashboard" : "/admin")}
              >
                Tableau de bord
              </Button>
              <Button 
                variant="outline" 
                className="border-pink-500/40 text-pink-700 hover:bg-pink-50"
                onClick={() => navigate("/profile/me")}
              >
                <User className="w-4 h-4 mr-2" />
                Mon profil
              </Button>
            </>
          )}
        </nav>
        
        {/* Bouton menu mobile */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      
      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-b border-gray-200 py-4 z-50">
          <nav className="flex flex-col space-y-2 px-4">
            <Button 
              variant="ghost"
              className="flex justify-start items-center gap-2" 
              onClick={() => {
                navigate("/search");
                setIsMenuOpen(false);
              }}
            >
              <Search className="w-4 h-4" />
              Rechercher
            </Button>
            
            <Button 
              variant="ghost"
              className="flex justify-start items-center gap-2" 
              onClick={() => changeLanguage(language === "fr" ? "ar" : "fr")}
            >
              <Globe className="w-4 h-4" />
              {language === "fr" ? "العربية" : "Français"}
            </Button>
            
            {!isLoggedIn ? (
              <>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-pink-500/40 text-pink-700 hover:bg-pink-50"
                  onClick={() => {
                    navigate("/login");
                    setIsMenuOpen(false);
                  }}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Connexion
                </Button>
                <Button 
                  className="w-full justify-start bg-gradient-to-r from-pink-500 to-pink-600 hover:opacity-90 text-white"
                  onClick={() => {
                    navigate("/register");
                    setIsMenuOpen(false);
                  }}
                >
                  S'inscrire
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    navigate(userType === "family" ? "/family/dashboard" : userType === "nanny" ? "/nanny/dashboard" : "/admin");
                    setIsMenuOpen(false);
                  }}
                >
                  Tableau de bord
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-pink-500/40 text-pink-700 hover:bg-pink-50"
                  onClick={() => {
                    navigate("/profile/me");
                    setIsMenuOpen(false);
                  }}
                >
                  <User className="w-4 h-4 mr-2" />
                  Mon profil
                </Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
