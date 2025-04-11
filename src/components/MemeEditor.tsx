
import React, { useRef, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Slider } from './ui/slider';
import { toast } from 'sonner';
import { Download, Upload, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';

interface TextLayer {
  id: string;
  text: string;
  x: number;
  y: number;
  isDragging: boolean;
}

const initialTopText = "QUAND TU DÉCOUVRES";
const initialBottomText = "QUE C'EST VENDREDI";

const MemeEditor: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [topText, setTopText] = useState(initialTopText);
  const [bottomText, setBottomText] = useState(initialBottomText);
  const [fontSize, setFontSize] = useState(40);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  
  const sampleMemes = [
    "/lovable-uploads/ee80c5c9-1b04-4999-ab16-19de0a398c3b.png",
    "https://i.imgflip.com/7eh5bg.jpg",
    "https://i.imgflip.com/1g8my4.jpg",
    "https://i.imgflip.com/1bij.jpg"
  ];
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleRandomMeme = () => {
    const randomIndex = Math.floor(Math.random() * sampleMemes.length);
    setImage(sampleMemes[randomIndex]);
  };
  
  const downloadMeme = async () => {
    if (!canvasRef.current) return;
    
    setIsGenerating(true);
    try {
      const canvas = document.createElement('canvas');
      const memeContainer = canvasRef.current;
      const memeImg = memeContainer.querySelector('img');
      
      if (!memeImg) {
        toast.error("Aucune image à télécharger");
        return;
      }
      
      const width = memeImg.width;
      const height = memeImg.height;
      
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Draw the image
      ctx.drawImage(memeImg, 0, 0, width, height);
      
      // Draw the text
      ctx.font = `bold ${fontSize}px Impact`;
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = fontSize / 15;
      ctx.textAlign = 'center';
      
      // Draw top text
      ctx.fillText(topText, width / 2, fontSize + 10);
      ctx.strokeText(topText, width / 2, fontSize + 10);
      
      // Draw bottom text
      ctx.fillText(bottomText, width / 2, height - 20);
      ctx.strokeText(bottomText, width / 2, height - 20);
      
      // Convert to image and download
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'mon-meme.png';
      link.href = dataUrl;
      link.click();
      
      toast.success("Mème téléchargé!");
    } catch (error) {
      console.error("Erreur lors du téléchargement:", error);
      toast.error("Erreur lors du téléchargement");
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="bg-gradient-to-br from-white to-meme-purple/10 border-meme-purple/20">
        <CardHeader className="text-center">
          <h2 className="text-2xl font-bold text-meme-dark">Créateur de Mèmes</h2>
          <p className="text-muted-foreground">Personnalise ton mème et télécharge-le!</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Texte du haut</label>
                <Input
                  value={topText}
                  onChange={(e) => setTopText(e.target.value.toUpperCase())}
                  placeholder="TEXTE DU HAUT"
                  className="border-meme-purple/30 focus-visible:ring-meme-purple/50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Texte du bas</label>
                <Input
                  value={bottomText}
                  onChange={(e) => setBottomText(e.target.value.toUpperCase())}
                  placeholder="TEXTE DU BAS"
                  className="border-meme-purple/30 focus-visible:ring-meme-purple/50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Taille du texte: {fontSize}px</label>
                <Slider 
                  value={[fontSize]} 
                  onValueChange={(value) => setFontSize(value[0])} 
                  min={20} 
                  max={60} 
                  step={1}
                  className="py-4"
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={handleImageClick} 
                  variant="outline"
                  className="flex-1 border-meme-blue/30 hover:bg-meme-blue/5"
                >
                  <Upload className="w-4 h-4 mr-2" /> Importer
                </Button>
                <Button 
                  onClick={handleRandomMeme} 
                  variant="outline"
                  className="flex-1 border-meme-pink/30 hover:bg-meme-pink/5"
                >
                  <RefreshCw className="w-4 h-4 mr-2" /> Aléatoire
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>
            
            <div 
              className="w-full md:w-1/2 h-[300px] md:h-[350px] flex items-center justify-center bg-slate-100 rounded-lg overflow-hidden border border-dashed border-slate-300"
              onClick={!image ? handleImageClick : undefined}
              ref={canvasRef}
            >
              {image ? (
                <div className="meme-container">
                  <img 
                    src={image} 
                    alt="Meme template" 
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute top-0 w-full p-2">
                    <p className="meme-text" style={{ fontSize: `${fontSize}px` }}>
                      {topText}
                    </p>
                  </div>
                  <div className="absolute bottom-0 w-full p-2">
                    <p className="meme-text" style={{ fontSize: `${fontSize}px` }}>
                      {bottomText}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center p-4 cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-meme-purple" />
                  <p>Clique pour importer une image</p>
                  <p className="text-xs text-muted-foreground mt-1">ou utilise le bouton 'Aléatoire'</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button 
            onClick={downloadMeme} 
            disabled={!image || isGenerating}
            className="w-full bg-gradient-to-r from-meme-blue to-meme-purple hover:opacity-90 transition-opacity"
          >
            <Download className="w-4 h-4 mr-2" />
            {isGenerating ? "Génération..." : "Télécharger le Mème"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MemeEditor;
