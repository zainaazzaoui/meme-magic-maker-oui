
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MessageCircle, Calendar, Clock, CheckCircle, MapPin, Award, Heart, ThumbsUp } from "lucide-react";
import { toast } from "sonner";

// Types pour le profil de la nounou
interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
}

interface Experience {
  id: string;
  family: string;
  period: string;
  description: string;
}

interface Nanny {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  cover: string;
  rating: number;
  reviews: Review[];
  experience: Experience[];
  location: string;
  hourlyRate: number;
  availability: string[];
  badges: string[];
  bio: string;
  verified: boolean;
  languages: string[];
  education: string[];
  yearsExperience: number;
}

const mockNanny: Nanny = {
  id: "1",
  firstName: "Marie",
  lastName: "Dupont",
  avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  cover: "https://images.unsplash.com/photo-1560184611-ce895ea52403?q=80&w=1600&auto=format&fit=crop",
  rating: 4.8,
  reviews: [
    {
      id: "r1",
      userName: "Émilie Martin",
      userAvatar: "https://randomuser.me/api/portraits/women/33.jpg",
      rating: 5,
      date: "15 mars 2025",
      comment: "Marie a été formidable avec nos deux enfants. Elle est patiente, attentive et très créative. Les enfants l'adorent et demandent toujours quand elle reviendra !"
    },
    {
      id: "r2",
      userName: "Thomas Blanc",
      userAvatar: "https://randomuser.me/api/portraits/men/41.jpg",
      rating: 4.5,
      date: "2 février 2025",
      comment: "Très professionnelle et ponctuelle. Notre fils s'est tout de suite senti à l'aise avec elle. Je recommande vivement."
    },
    {
      id: "r3",
      userName: "Laura Petit",
      userAvatar: "https://randomuser.me/api/portraits/women/67.jpg",
      rating: 5,
      date: "12 janvier 2025",
      comment: "Marie est exceptionnelle ! Elle a su gérer nos trois enfants avec brio, même pendant une soirée difficile. Elle est maintenant notre nounou régulière."
    }
  ],
  experience: [
    {
      id: "e1",
      family: "Famille Martin",
      period: "Jan 2023 - Présent",
      description: "Garde régulière de deux enfants (3 et 5 ans). Organisation d'activités éducatives, aide aux devoirs et préparation des repas."
    },
    {
      id: "e2",
      family: "Famille Dubois",
      period: "Sep 2021 - Déc 2022",
      description: "Garde à temps partiel d'un enfant de 2 ans. Développement d'activités adaptées à son âge et gestion des routines quotidiennes."
    },
    {
      id: "e3",
      family: "Famille Bernard",
      period: "Juin 2020 - Août 2021",
      description: "Garde de trois enfants (2, 5 et 7 ans) pendant les vacances scolaires. Organisation de sorties et activités ludiques."
    }
  ],
  location: "Paris, 75011",
  hourlyRate: 15,
  availability: ["Lundi", "Mardi", "Mercredi", "Vendredi"],
  badges: ["Premiers secours", "Éducation Montessori", "Permis de conduire", "Non-fumeuse"],
  bio: "Je suis une nounou passionnée avec 5 ans d'expérience dans la garde d'enfants de tous âges. Formée à la pédagogie Montessori, je crois en l'apprentissage par le jeu et l'exploration. Je suis certifiée en premiers secours et j'aime organiser des activités créatives qui stimulent l'imagination et la curiosité des enfants.\n\nPatiente et bienveillante, je m'adapte aux besoins spécifiques de chaque enfant et famille. J'ai l'habitude de travailler avec des familles de différentes cultures et j'aime partager des activités qui favorisent l'ouverture d'esprit.",
  verified: true,
  languages: ["Français", "Anglais", "Espagnol (notions)"],
  education: ["Diplôme d'État d'éducateur de jeunes enfants", "Formation aux premiers secours pédiatriques"],
  yearsExperience: 5
};

// Afficher les étoiles pour la notation
const renderStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />);
    } else if (i === fullStars && hasHalfStar) {
      stars.push(<Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 half-filled" />);
    } else {
      stars.push(<Star key={i} className="w-5 h-5 text-yellow-400" />);
    }
  }
  return stars;
};

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Dans une vraie application, nous récupérerions les données de la nounou à partir de son ID
  const nanny = mockNanny;
  
  const handleContact = () => {
    toast.success("Demande de contact envoyée à Marie !");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-pink-50/50">
      <Header />
      
      <main className="flex-grow">
        {/* Cover Image */}
        <div className="h-48 md:h-64 lg:h-80 w-full bg-gradient-to-r from-pink-300 to-purple-300 relative overflow-hidden">
          {nanny.cover && (
            <img 
              src={nanny.cover} 
              alt="Cover" 
              className="w-full h-full object-cover"
            />
          )}
        </div>
        
        <div className="container mx-auto max-w-6xl px-4 -mt-16 md:-mt-20 relative z-10">
          {/* Profile Header */}
          <Card className="mb-8 shadow-lg border-pink-100">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="relative">
                  <img 
                    src={nanny.avatar} 
                    alt={`${nanny.firstName} ${nanny.lastName}`} 
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-md object-cover"
                  />
                  {nanny.verified && (
                    <div className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-full shadow">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                  )}
                </div>
                
                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <h1 className="text-2xl md:text-3xl font-bold">
                      {nanny.firstName} {nanny.lastName}
                      {nanny.verified && (
                        <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-200 align-middle text-xs">
                          Vérifiée
                        </Badge>
                      )}
                    </h1>
                    
                    <div className="flex items-center mt-2 md:mt-0">
                      <div className="flex mr-2">
                        {renderStars(nanny.rating)}
                      </div>
                      <span className="font-medium">{nanny.rating.toFixed(1)}</span>
                      <span className="text-gray-500 text-sm ml-1">({nanny.reviews.length} avis)</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mb-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                      <span>{nanny.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-gray-500 mr-2" />
                      <span>{nanny.yearsExperience} ans d'expérience</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                      <span>Disponible: {nanny.availability.join(", ")}</span>
                    </div>
                    <div className="flex items-center">
                      <Award className="w-4 h-4 text-gray-500 mr-2" />
                      <span className="text-pink-600 font-semibold">{nanny.hourlyRate}€/heure</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {nanny.badges.map((badge) => (
                      <Badge key={badge} className="bg-pink-100 text-pink-800 hover:bg-pink-200">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      className="bg-gradient-to-r from-pink-500 to-pink-600 hover:opacity-90 text-white"
                      onClick={handleContact}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Contacter
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-pink-300 text-pink-700 hover:bg-pink-50"
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Ajouter aux favoris
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Tabs Content */}
          <Tabs defaultValue="about" className="mb-12">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="about">À propos</TabsTrigger>
              <TabsTrigger value="experience">Expérience</TabsTrigger>
              <TabsTrigger value="reviews">Avis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="mt-6">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h2 className="text-xl font-bold mb-3">Présentation</h2>
                    <p className="whitespace-pre-line text-gray-700">
                      {nanny.bio}
                    </p>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-bold mb-3">Compétences</h2>
                    <div className="flex flex-wrap gap-2">
                      {nanny.badges.map((badge) => (
                        <Badge key={badge} variant="outline" className="py-1.5 px-3 text-sm">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-bold mb-3">Langues parlées</h2>
                    <div className="flex flex-wrap gap-2">
                      {nanny.languages.map((language) => (
                        <Badge key={language} variant="outline" className="py-1.5 px-3 text-sm">
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-bold mb-3">Formation</h2>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {nanny.education.map((edu, index) => (
                        <li key={index}>{edu}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="experience" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-6">Expérience professionnelle</h2>
                  <div className="space-y-8 relative">
                    {/* Timeline connector */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-pink-200"></div>
                    
                    {nanny.experience.map((exp, index) => (
                      <div key={exp.id} className="flex gap-6">
                        <div className="relative">
                          <div className="w-8 h-8 rounded-full bg-pink-100 border-2 border-pink-300 z-10 relative flex items-center justify-center">
                            <span className="text-pink-600 font-bold">{nanny.experience.length - index}</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg">{exp.family}</h3>
                          <p className="text-gray-500 text-sm">{exp.period}</p>
                          <p className="mt-2 text-gray-700">{exp.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Avis et évaluations</h2>
                    <div className="flex items-center">
                      <div className="flex mr-2">
                        {renderStars(nanny.rating)}
                      </div>
                      <span className="font-medium">{nanny.rating.toFixed(1)}</span>
                      <span className="text-gray-500 text-sm ml-1">({nanny.reviews.length})</span>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {nanny.reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-3">
                            <img 
                              src={review.userAvatar} 
                              alt={review.userName} 
                              className="w-10 h-10 rounded-full"
                            />
                            <div>
                              <h3 className="font-medium">{review.userName}</h3>
                              <p className="text-gray-500 text-sm">{review.date}</p>
                            </div>
                          </div>
                          <div className="flex">
                            {renderStars(review.rating).slice(0, Math.floor(review.rating))}
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                        <div className="flex gap-2 mt-3">
                          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                            <ThumbsUp className="w-4 h-4 mr-1" />
                            Utile
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center md:text-left">
            <p className="text-gray-400">© 2025 Nanny - Tous droits réservés</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Profile;
