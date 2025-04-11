
import { Image } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  
  return (
    <header className="bg-background border-b border-meme-purple/20 shadow-sm py-3 px-4 md:px-6">
      <div className="container max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 
            className="text-xl md:text-2xl font-bold bg-gradient-to-r from-meme-pink via-meme-purple to-meme-blue bg-clip-text text-transparent"
            onClick={() => navigate("/")}
          >
            Meme Magic Maker
          </h1>
          <Image className="w-6 h-6 text-meme-pink animate-bounce-subtle" />
        </div>
        
        <Button 
          className="bg-gradient-to-r from-meme-pink to-meme-purple hover:opacity-90 transition-opacity"
          onClick={() => navigate("/create")}
        >
          Créer un Mème
        </Button>
      </div>
    </header>
  );
};

export default Header;
