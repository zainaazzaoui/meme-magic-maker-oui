
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, MapPin, Clock, Filter } from "lucide-react";

// Types pour les nounous
interface Nanny {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  rating: number;
  experience: number;
  location: string;
  hourlyRate: number;
  availability: string[];
  badges: string[];
  bio: string;
  verified: boolean;
}

// Données simulées des nounous
const mockNannies: Nanny[] = [
  {
    id: "1",
    firstName: "Marie",
    lastName: "Dupont",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4.8,
    experience: 5,
    location: "Paris",
    hourlyRate: 15,
    availability: ["Lundi", "Mardi", "Mercredi", "Vendredi"],
    badges: ["Premiers secours", "Éducation Montessori"],
    bio: "Je suis une nounou expérimentée avec 5 ans d'expérience dans la garde d'enfants de tous âges. Je suis formée aux premiers secours et j'adore organiser des activités créatives.",
    verified: true
  },
  {
    id: "2",
    firstName: "Sophie",
    lastName: "Martin",
    avatar: "https://randomuser.me/api/portraits/women/66.jpg",
    rating: 4.9,
    experience: 7,
    location: "Lyon",
    hourlyRate: 18,
    availability: ["Lundi", "Mercredi", "Jeudi", "Samedi"],
    badges: ["Premiers secours", "Cuisine", "Aide aux devoirs"],
    bio: "Ancienne institutrice, j'ai 7 ans d'expérience dans la garde d'enfants. Je peux aider aux devoirs et j'ai une approche pédagogique pour chaque activité.",
    verified: true
  },
  {
    id: "3",
    firstName: "Thomas",
    lastName: "Bernard",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.7,
    experience: 3,
    location: "Paris",
    hourlyRate: 14,
    availability: ["Mardi", "Jeudi", "Vendredi", "Dimanche"],
    badges: ["Sport", "Activités extérieures"],
    bio: "Moniteur sportif de formation, j'adore organiser des activités ludiques et sportives pour les enfants. Je suis dynamique et patient.",
    verified: true
  },
  {
    id: "4",
    firstName: "Emma",
    lastName: "Petit",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    rating: 4.5,
    experience: 2,
    location: "Marseille",
    hourlyRate: 13,
    availability: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"],
    badges: ["Musique", "Arts plastiques"],
    bio: "Étudiante en arts, j'aime partager ma passion créative avec les enfants. Je propose des activités artistiques et musicales adaptées à chaque âge.",
    verified: false
  },
  {
    id: "5",
    firstName: "Lucas",
    lastName: "Dubois",
    avatar: "https://randomuser.me/api/portraits/men/86.jpg",
    rating: 4.6,
    experience: 4,
    location: "Lyon",
    hourlyRate: 16,
    availability: ["Mercredi", "Jeudi", "Vendredi", "Samedi"],
    badges: ["Premiers secours", "Langues étrangères"],
    bio: "Polyglotte et patient, j'ai 4 ans d'expérience dans la garde d'enfants. Je peux aider vos enfants à progresser en anglais ou en espagnol.",
    verified: true
  }
];

const Search = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState(10);
  const [maxPrice, setMaxPrice] = useState(20);
  const [minExperience, setMinExperience] = useState(0);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  
  // Filtres
  const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
  
  // Filtrer les nounous en fonction des critères
  const filteredNannies = mockNannies.filter((nanny) => {
    // Filtre par recherche (nom ou ville)
    const searchMatch = searchTerm === "" || 
      nanny.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nanny.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nanny.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtre par prix
    const priceMatch = nanny.hourlyRate >= minPrice && nanny.hourlyRate <= maxPrice;
    
    // Filtre par expérience
    const experienceMatch = nanny.experience >= minExperience;
    
    // Filtre par disponibilité
    const availabilityMatch = selectedDays.length === 0 || 
      selectedDays.some(day => nanny.availability.includes(day));
    
    return searchMatch && priceMatch && experienceMatch && availabilityMatch;
  });
  
  // Gestion des jours sélectionnés
  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };
  
  // Afficher les étoiles pour la notation
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400 half-filled" />);
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-yellow-400" />);
      }
    }
    return stars;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-pink-50/50">
      <Header />
      
      <main className="flex-grow py-6 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            {/* Filtres - version mobile */}
            <div className="w-full md:hidden mb-4">
              <Button 
                onClick={() => setFilterMenuOpen(!filterMenuOpen)} 
                variant="outline"
                className="flex items-center gap-2 w-full justify-between"
              >
                <span>Filtres</span>
                <Filter className="w-4 h-4" />
              </Button>
              
              {filterMenuOpen && (
                <div className="mt-4 p-4 border rounded-lg bg-white shadow-md">
                  {/* Version mobile des filtres */}
                  <div className="space-y-6">
                    <div>
                      <Label className="text-base font-medium">Tarif horaire</Label>
                      <div className="flex justify-between mt-2 mb-1">
                        <span>{minPrice}€/h</span>
                        <span>{maxPrice}€/h</span>
                      </div>
                      <Slider 
                        min={10} 
                        max={30} 
                        step={1} 
                        value={[minPrice, maxPrice]} 
                        onValueChange={(value) => {
                          setMinPrice(value[0]);
                          setMaxPrice(value[1]);
                        }}
                      />
                    </div>
                    
                    <div>
                      <Label className="text-base font-medium">Expérience minimum</Label>
                      <div className="flex justify-between mt-2 mb-1">
                        <span>{minExperience} an{minExperience > 1 ? 's' : ''}</span>
                      </div>
                      <Slider 
                        min={0} 
                        max={10} 
                        step={1} 
                        value={[minExperience]} 
                        onValueChange={(value) => setMinExperience(value[0])}
                      />
                    </div>
                    
                    <div>
                      <Label className="text-base font-medium">Disponibilité</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {days.map((day) => (
                          <Badge 
                            key={day}
                            variant={selectedDays.includes(day) ? "default" : "outline"}
                            className={`cursor-pointer ${selectedDays.includes(day) ? 'bg-pink-500 hover:bg-pink-600' : 'hover:bg-pink-100'}`}
                            onClick={() => toggleDay(day)}
                          >
                            {day}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Filtres - version desktop */}
            <div className="hidden md:block w-1/4 bg-white p-6 rounded-lg shadow-md sticky top-20 border border-pink-100">
              <h2 className="text-xl font-bold mb-6">Filtres</h2>
              
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium">Tarif horaire</Label>
                  <div className="flex justify-between mt-2 mb-1">
                    <span>{minPrice}€/h</span>
                    <span>{maxPrice}€/h</span>
                  </div>
                  <Slider 
                    min={10} 
                    max={30} 
                    step={1} 
                    value={[minPrice, maxPrice]} 
                    onValueChange={(value) => {
                      setMinPrice(value[0]);
                      setMaxPrice(value[1]);
                    }}
                  />
                </div>
                
                <div>
                  <Label className="text-base font-medium">Expérience minimum</Label>
                  <div className="flex justify-between mt-2 mb-1">
                    <span>{minExperience} an{minExperience > 1 ? 's' : ''}</span>
                  </div>
                  <Slider 
                    min={0} 
                    max={10} 
                    step={1} 
                    value={[minExperience]} 
                    onValueChange={(value) => setMinExperience(value[0])}
                  />
                </div>
                
                <div>
                  <Label className="text-base font-medium">Disponibilité</Label>
                  <div className="flex flex-col gap-2 mt-2">
                    {days.map((day) => (
                      <Badge 
                        key={day}
                        variant={selectedDays.includes(day) ? "default" : "outline"}
                        className={`cursor-pointer ${selectedDays.includes(day) ? 'bg-pink-500 hover:bg-pink-600' : 'hover:bg-pink-100'}`}
                        onClick={() => toggleDay(day)}
                      >
                        {day}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Résultats de recherche */}
            <div className="w-full md:w-3/4 space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <h1 className="text-2xl md:text-3xl font-bold">Recherche de nounous</h1>
                <div className="w-full sm:w-auto">
                  <Input 
                    placeholder="Rechercher par nom ou ville..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-pink-200"
                  />
                </div>
              </div>
              
              {filteredNannies.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-lg shadow">
                  <h3 className="text-xl font-medium mb-2">Aucune nounou ne correspond à vos critères</h3>
                  <p className="text-muted-foreground mb-4">Essayez de modifier vos filtres de recherche</p>
                  <Button 
                    onClick={() => {
                      setSearchTerm("");
                      setMinPrice(10);
                      setMaxPrice(20);
                      setMinExperience(0);
                      setSelectedDays([]);
                    }}
                    variant="outline"
                    className="border-pink-300 text-pink-700 hover:bg-pink-50"
                  >
                    Réinitialiser les filtres
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredNannies.map((nanny) => (
                    <Card 
                      key={nanny.id} 
                      className="overflow-hidden hover:shadow-lg transition-shadow border-pink-100"
                    >
                      <div className="p-6 flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/4">
                          <div className="relative">
                            <img 
                              src={nanny.avatar} 
                              alt={`${nanny.firstName} ${nanny.lastName}`}
                              className="w-full h-48 object-cover rounded-lg"
                            />
                            {nanny.verified && (
                              <div className="absolute -bottom-3 -right-3 bg-white p-2 rounded-full shadow-md">
                                <CheckCircle className="w-6 h-6 text-green-500" />
                              </div>
                            )}
                          </div>
                          <div className="mt-4 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start">
                              {renderStars(nanny.rating)}
                              <span className="ml-1 text-sm font-medium">{nanny.rating.toFixed(1)}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="md:w-3/4">
                          <div className="flex flex-col sm:flex-row justify-between mb-4">
                            <h3 className="text-xl font-bold">{nanny.firstName} {nanny.lastName}</h3>
                            <div className="flex items-center gap-1 text-lg font-semibold text-pink-600">
                              {nanny.hourlyRate}€<span className="text-sm font-normal text-gray-600">/heure</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-y-4 mb-3">
                            <div className="w-full sm:w-1/2 flex items-center">
                              <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                              <span className="text-sm">{nanny.location}</span>
                            </div>
                            <div className="w-full sm:w-1/2 flex items-center">
                              <Clock className="w-4 h-4 text-gray-500 mr-2" />
                              <span className="text-sm">{nanny.experience} an{nanny.experience > 1 ? 's' : ''} d'expérience</span>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <h4 className="font-medium mb-1 text-sm">Disponibilités:</h4>
                            <div className="flex flex-wrap gap-2">
                              {nanny.availability.map((day) => (
                                <Badge key={day} variant="secondary" className="bg-gray-100">
                                  {day}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <h4 className="font-medium mb-1 text-sm">Compétences:</h4>
                            <div className="flex flex-wrap gap-2">
                              {nanny.badges.map((badge) => (
                                <Badge key={badge} className="bg-pink-100 text-pink-800 hover:bg-pink-200">
                                  {badge}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 line-clamp-2 mb-4">{nanny.bio}</p>
                          
                          <div className="flex flex-col sm:flex-row gap-3">
                            <Button 
                              className="bg-gradient-to-r from-pink-500 to-pink-600 hover:opacity-90 text-white"
                              onClick={() => navigate(`/profile/${nanny.id}`)}
                            >
                              Voir le profil
                            </Button>
                            <Button 
                              variant="outline" 
                              className="border-pink-300 text-pink-700 hover:bg-pink-50"
                            >
                              Contacter
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-8 px-4 mt-12">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center md:text-left">
            <p className="text-gray-400">© 2025 Nanny - Tous droits réservés</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Search;
