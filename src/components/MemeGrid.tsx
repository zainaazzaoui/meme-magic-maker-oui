
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

// Types définissant le format des mèmes
interface Meme {
  id: string;
  title: string;
  imageUrl: string;
  likes: number;
}

// Mèmes populaires à afficher
const popularMemes: Meme[] = [
  {
    id: "1",
    title: "Quand le prof annonce un examen surprise",
    imageUrl: "https://i.imgflip.com/7eh5bg.jpg",
    likes: 423
  },
  {
    id: "2",
    title: "Lundi matin vs Vendredi soir",
    imageUrl: "https://i.imgflip.com/1g8my4.jpg",
    likes: 321
  },
  {
    id: "3",
    title: "Moi qui écoute mes propres conseils",
    imageUrl: "https://i.imgflip.com/1bij.jpg",
    likes: 287
  },
  {
    id: "4",
    title: "Quand il reste une part de pizza",
    imageUrl: "/lovable-uploads/ee80c5c9-1b04-4999-ab16-19de0a398c3b.png",
    likes: 543
  },
  {
    id: "5",
    title: "Quand tu trouves le bug après 4h",
    imageUrl: "https://i.imgflip.com/4acd7j.png",
    likes: 186
  },
  {
    id: "6",
    title: "Moi à 3h du matin",
    imageUrl: "https://i.imgflip.com/2wifvo.jpg",
    likes: 298
  }
];

const MemeGrid = () => {
  const navigate = useNavigate();

  return (
    <section className="py-8 px-4">
      <div className="container max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Mèmes Populaires</h2>
          <Button 
            onClick={() => navigate("/create")}
            variant="outline" 
            className="border-meme-pink/40 text-meme-dark hover:bg-meme-pink/10"
          >
            Créer le tien
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {popularMemes.map((meme) => (
            <div 
              key={meme.id} 
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-meme-purple/20"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={meme.imageUrl}
                  alt={meme.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onClick={() => navigate("/create")}
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-meme-dark mb-2 line-clamp-1">{meme.title}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">❤️ {meme.likes} likes</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-meme-blue hover:text-meme-purple hover:bg-meme-purple/10"
                    onClick={() => navigate("/create")}
                  >
                    Modifier
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MemeGrid;
