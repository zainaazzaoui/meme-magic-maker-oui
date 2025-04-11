
import Header from "@/components/Header";
import MemeGrid from "@/components/MemeGrid";
import { Button } from "@/components/ui/button";
import { Image } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-meme-purple/5">
      <Header />
      
      <section className="py-12 md:py-20 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Créez des mèmes 
                <span className="bg-gradient-to-r from-meme-pink to-meme-purple bg-clip-text text-transparent"> hilarants </span>
                en quelques secondes !
              </h1>
              <p className="text-lg text-muted-foreground">
                Notre générateur de mèmes simple et puissant vous permet de créer des mèmes personnalisés. Importez votre image, ajoutez votre texte, et partagez !
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button 
                  onClick={() => navigate("/create")}
                  size="lg" 
                  className="bg-gradient-to-r from-meme-pink to-meme-purple hover:opacity-90 transition-opacity"
                >
                  <Image className="w-5 h-5 mr-2" /> Créer un Mème
                </Button>
                <Button 
                  onClick={() => document.getElementById('popular-memes')?.scrollIntoView({ behavior: 'smooth' })}
                  size="lg" 
                  variant="outline" 
                  className="border-meme-purple/40 hover:bg-meme-purple/5"
                >
                  Voir les mèmes populaires
                </Button>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-full h-full rounded-lg bg-meme-purple/30"></div>
                <div className="absolute -bottom-4 -left-4 w-full h-full rounded-lg bg-meme-pink/30"></div>
                <img 
                  src="/lovable-uploads/ee80c5c9-1b04-4999-ab16-19de0a398c3b.png" 
                  alt="Exemple de mème" 
                  className="w-full h-auto rounded-lg shadow-lg relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <div id="popular-memes">
        <MemeGrid />
      </div>
      
      <footer className="text-center py-6 text-sm text-muted-foreground">
        © 2025 Meme Magic Maker - Créé avec ❤️ et beaucoup de bons mèmes
      </footer>
    </div>
  );
};

export default Index;
