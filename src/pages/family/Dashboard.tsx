
import React from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Search, MessageCircle, User, Calendar, Bell, Clock, Heart } from "lucide-react";

// Types pour les données simulées
interface MessagePreview {
  id: string;
  nannyName: string;
  nannyAvatar: string;
  message: string;
  date: string;
  unread: boolean;
}

interface Booking {
  id: string;
  nannyName: string;
  nannyAvatar: string;
  date: string;
  time: string;
  status: "confirmed" | "pending" | "completed";
}

interface FavoriteNanny {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  location: string;
}

// Données simulées
const recentMessages: MessagePreview[] = [
  {
    id: "m1",
    nannyName: "Marie Dupont",
    nannyAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    message: "D'accord pour la garde de vendredi, je serai là à 18h comme convenu.",
    date: "Aujourd'hui, 14:30",
    unread: true
  },
  {
    id: "m2",
    nannyName: "Sophie Martin",
    nannyAvatar: "https://randomuser.me/api/portraits/women/66.jpg",
    message: "Merci pour votre demande. Je suis disponible aux dates que vous avez mentionnées.",
    date: "Hier, 20:15",
    unread: false
  },
  {
    id: "m3",
    nannyName: "Thomas Bernard",
    nannyAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    message: "Je vous confirme ma disponibilité pour garder vos enfants ce week-end.",
    date: "12 Avril, 09:45",
    unread: false
  }
];

const upcomingBookings: Booking[] = [
  {
    id: "b1",
    nannyName: "Marie Dupont",
    nannyAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    date: "Vendredi 18 Avril",
    time: "18:00 - 22:00",
    status: "confirmed"
  },
  {
    id: "b2",
    nannyName: "Sophie Martin",
    nannyAvatar: "https://randomuser.me/api/portraits/women/66.jpg",
    date: "Samedi 26 Avril",
    time: "14:00 - 18:00",
    status: "pending"
  }
];

const favoriteNannies: FavoriteNanny[] = [
  {
    id: "1",
    name: "Marie Dupont",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4.8,
    location: "Paris"
  },
  {
    id: "2",
    name: "Sophie Martin",
    avatar: "https://randomuser.me/api/portraits/women/66.jpg",
    rating: 4.9,
    location: "Lyon"
  },
  {
    id: "3",
    name: "Thomas Bernard",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.7,
    location: "Paris"
  }
];

const FamilyDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-pink-50/50">
      <Header />
      
      <main className="flex-grow py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Bonjour, Famille Martin</h1>
              <p className="text-muted-foreground">Bienvenue sur votre tableau de bord</p>
            </div>
            
            <Button 
              className="bg-gradient-to-r from-pink-500 to-pink-600 hover:opacity-90"
              onClick={() => navigate("/search")}
            >
              <Search className="w-4 h-4 mr-2" />
              Trouver une nounou
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Colonne principale */}
            <div className="lg:col-span-2 space-y-6">
              {/* Réservations à venir */}
              <Card className="border-pink-100">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-xl">Réservations à venir</CardTitle>
                    <CardDescription>Vos prochaines gardes d'enfants planifiées</CardDescription>
                  </div>
                  <Calendar className="w-5 h-5 text-pink-500" />
                </CardHeader>
                <CardContent>
                  {upcomingBookings.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingBookings.map((booking) => (
                        <div 
                          key={booking.id}
                          className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <img 
                            src={booking.nannyAvatar} 
                            alt={booking.nannyName} 
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-grow">
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium">{booking.nannyName}</h3>
                              <Badge 
                                className={
                                  booking.status === 'confirmed' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                                  booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' :
                                  'bg-blue-100 text-blue-800 hover:bg-blue-200'
                                }
                              >
                                {booking.status === 'confirmed' ? 'Confirmé' : 
                                 booking.status === 'pending' ? 'En attente' : 'Terminé'}
                              </Badge>
                            </div>
                            <div className="flex gap-6 text-sm text-gray-600 mt-1">
                              <div className="flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                {booking.date}
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {booking.time}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <Button 
                        variant="outline" 
                        className="w-full mt-4 border-pink-200 text-pink-700 hover:bg-pink-50"
                      >
                        Voir toutes les réservations
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <h3 className="font-medium text-lg mb-1">Aucune réservation à venir</h3>
                      <p className="text-muted-foreground mb-4">Vous n'avez pas encore planifié de garde d'enfants</p>
                      <Button onClick={() => navigate("/search")}>
                        Trouver une nounou
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Messages récents */}
              <Card className="border-pink-100">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-xl">Messages récents</CardTitle>
                    <CardDescription>Vos dernières conversations avec des nounous</CardDescription>
                  </div>
                  <MessageCircle className="w-5 h-5 text-pink-500" />
                </CardHeader>
                <CardContent>
                  {recentMessages.length > 0 ? (
                    <div className="space-y-4">
                      {recentMessages.map((message) => (
                        <div 
                          key={message.id}
                          className={`flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors ${message.unread ? 'bg-pink-50' : ''}`}
                        >
                          <img 
                            src={message.nannyAvatar} 
                            alt={message.nannyName} 
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-grow">
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium flex items-center">
                                {message.nannyName}
                                {message.unread && (
                                  <span className="ml-2 w-2 h-2 bg-pink-500 rounded-full"></span>
                                )}
                              </h3>
                              <span className="text-xs text-gray-500">{message.date}</span>
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-1 mt-1">{message.message}</p>
                          </div>
                        </div>
                      ))}
                      
                      <Button 
                        variant="outline" 
                        className="w-full mt-4 border-pink-200 text-pink-700 hover:bg-pink-50"
                      >
                        Voir tous les messages
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <h3 className="font-medium text-lg mb-1">Aucun message récent</h3>
                      <p className="text-muted-foreground mb-4">Commencez à discuter avec des nounous</p>
                      <Button onClick={() => navigate("/search")}>
                        Trouver une nounou
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Colonne latérale */}
            <div className="space-y-6">
              {/* Profil */}
              <Card className="border-pink-100">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-xl">Mon profil</CardTitle>
                    <CardDescription>Informations de la famille</CardDescription>
                  </div>
                  <User className="w-5 h-5 text-pink-500" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center text-pink-500 text-xl font-bold">
                      FM
                    </div>
                    <div>
                      <h3 className="font-bold">Famille Martin</h3>
                      <p className="text-sm text-gray-600">Paris, 75015</p>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Complétude du profil</span>
                      <span>75%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-pink-500 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-pink-200 text-pink-700 hover:bg-pink-50"
                    onClick={() => navigate("/profile/me")}
                  >
                    Modifier mon profil
                  </Button>
                </CardContent>
              </Card>
              
              {/* Nounous favoris */}
              <Card className="border-pink-100">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-xl">Nounous favoris</CardTitle>
                    <CardDescription>Vos nounous préférées</CardDescription>
                  </div>
                  <Heart className="w-5 h-5 text-pink-500" />
                </CardHeader>
                <CardContent>
                  {favoriteNannies.length > 0 ? (
                    <div className="space-y-4">
                      {favoriteNannies.map((nanny) => (
                        <div 
                          key={nanny.id}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                          onClick={() => navigate(`/profile/${nanny.id}`)}
                        >
                          <img 
                            src={nanny.avatar} 
                            alt={nanny.name} 
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-grow">
                            <h3 className="font-medium">{nanny.name}</h3>
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPin className="w-3 h-3 mr-1" />
                              {nanny.location}
                            </div>
                          </div>
                          <div className="flex items-center text-yellow-500">
                            <Star className="w-4 h-4 fill-yellow-400" />
                            <span className="ml-1 text-sm font-medium text-gray-700">{nanny.rating.toFixed(1)}</span>
                          </div>
                        </div>
                      ))}
                      
                      <Button 
                        variant="outline" 
                        className="w-full mt-2 border-pink-200 text-pink-700 hover:bg-pink-50"
                      >
                        Voir tous les favoris
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <h3 className="font-medium mb-1">Aucun favori</h3>
                      <p className="text-muted-foreground text-sm mb-4">Ajoutez des nounous à vos favoris</p>
                      <Button 
                        variant="outline" 
                        onClick={() => navigate("/search")}
                        className="border-pink-200"
                      >
                        Rechercher des nounous
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Notifications */}
              <Card className="border-pink-100">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-xl">Notifications</CardTitle>
                    <CardDescription>Actualités et alertes</CardDescription>
                  </div>
                  <Bell className="w-5 h-5 text-pink-500" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <h4 className="font-medium text-blue-800">Nouvelle fonctionnalité</h4>
                      <p className="text-sm text-blue-700">Vous pouvez maintenant noter vos nounous préférées !</p>
                    </div>
                    <div className="p-3 bg-pink-50 rounded-lg border border-pink-100">
                      <h4 className="font-medium text-pink-800">Rappel</h4>
                      <p className="text-sm text-pink-700">N'oubliez pas de compléter votre profil pour une meilleure expérience.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-6 px-4 mt-12">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center md:text-left">
            <p className="text-gray-400">© 2025 Nanny - Tous droits réservés</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FamilyDashboard;
