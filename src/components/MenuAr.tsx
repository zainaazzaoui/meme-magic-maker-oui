
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Heart, Search, User, LogIn, Menu, X } from "lucide-react";

const MenuAr = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // État simulé pour démontrer la fonctionnalité (à remplacer par un vrai système d'authentification)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<"family" | "nanny" | "admin" | null>(null);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm py-3 px-4 md:px-6 sticky top-0 z-50 rtl">
      <div className="container max-w-7xl mx-auto flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <Heart className="w-6 h-6 text-pink-500" />
          <h1 className="text-xl md:text-2xl font-bold text-pink-500">ناني</h1>
        </div>
        
        {/* Navigation sur desktop */}
        <nav className="hidden md:flex items-center gap-6">
          <Button 
            variant="ghost"
            className="flex items-center gap-2" 
            onClick={() => navigate("/search")}
          >
            بحث
            <Search className="w-4 h-4" />
          </Button>
          
          {!isLoggedIn ? (
            <>
              <Button 
                variant="outline" 
                className="border-pink-500/40 text-pink-700 hover:bg-pink-50"
                onClick={() => navigate("/login")}
              >
                <LogIn className="w-4 h-4 mr-2" />
                تسجيل الدخول
              </Button>
              <Button 
                className="bg-gradient-to-r from-pink-500 to-pink-600 hover:opacity-90 text-white"
                onClick={() => navigate("/register")}
              >
                التسجيل
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="ghost"
                onClick={() => navigate(userType === "family" ? "/family/dashboard" : userType === "nanny" ? "/nanny/dashboard" : "/admin")}
              >
                لوحة التحكم
              </Button>
              <Button 
                variant="outline" 
                className="border-pink-500/40 text-pink-700 hover:bg-pink-50"
                onClick={() => navigate("/profile/me")}
              >
                <User className="w-4 h-4 mr-2" />
                ملفي الشخصي
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
              بحث
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
                  تسجيل الدخول
                </Button>
                <Button 
                  className="w-full justify-start bg-gradient-to-r from-pink-500 to-pink-600 hover:opacity-90 text-white"
                  onClick={() => {
                    navigate("/register");
                    setIsMenuOpen(false);
                  }}
                >
                  التسجيل
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
                  لوحة التحكم
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
                  ملفي الشخصي
                </Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default MenuAr;
