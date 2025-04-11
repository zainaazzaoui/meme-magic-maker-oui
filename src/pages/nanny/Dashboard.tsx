
import React from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { User, MessageCircle, Calendar, Star, Clock, DollarSign, Bell, Briefcase } from "lucide-react";

// Types pour les données simulées
interface BookingRequest {
  id: string;
  familyName: string;
  familyAvatar: string;
  date: string;
  time: string;
  status: "pending" | "accepted" | "declined";
  message: string;
}

interface Message {
  id: string;
  familyName: string;
  familyAvatar: string;
  preview: string;
  date: string;
  unread: boolean;
}

interface UpcomingBooking {
  id: string;
  familyName: string;
  familyAvatar: string;
  date: string;
  time: string;
  location: string;
  amount: number;
  children: number;
}

// Données simulées
const bookingRequests: BookingRequest[] = [
  {
    id: "r1",
    familyName: "Famille Dupont",
    familyAvatar: "https://randomuser.me/api/portraits/women/33.jpg",
    date: "Samedi 19 Avril",
    time: "19:00 - 23:00",
    status: "pending",
    message: "Bonjour, nous aurions besoin de vous pour garder nos deux enfants (4 et 6 ans) pendant que nous sortons au restaurant."
  },
  {
    id: "r2",
    familyName: "Famille Bernard",
    familyAvatar: "https://randomuser.me/api/portraits/men/41.jpg",
    date: "Mercredi 23 Avril",
    time: "14:00 - 18:00",
    status: "accepted",
    message: "Bonjour, pourriez-vous vous occuper de notre fille de 3 ans mercredi après-midi ? Elle adore dessiner et jouer dehors."
  }
];

const recentMessages: Message[] = [
  {
    id: "m1",
    familyName: "Famille Dupont",
    familyAvatar: "https://randomuser.me/api/portraits/women/33.jpg",
    preview: "Merci beaucoup pour la garde d'hier soir, les enfants étaient ravis !",
    date: "Aujourd'hui, 10:15",
    unread: true
  },
  {
    id: "m2",
    familyName: "Famille Martin",
    familyAvatar: "https://randomuser.me/api/portraits/men/54.jpg",
    preview: "Bonjour, seriez-vous disponible pour garder nos enfants le week-end prochain ?",
    date: "Hier, 18:30",
    unread: false
  },
  {
    id: "m3",
    familyName: "Famille Bernard",
    familyAvatar: "https://randomuser.me/api/portraits/men/41.jpg",
    preview: "Nous confirmons la garde pour mercredi après-midi. À bientôt !",
    date: "13 Avril, 21:05",
    unread: false
  }
];

const upcomingBookings: UpcomingBooking[] = [
  {
    id: "b1",
    familyName: "Famille Bernard",
    familyAvatar: "https://randomuser.me/api/portraits/men/41.jpg",
    date: "Mercredi 23 Avril",
    time: "14:00 - 18:00",
    location: "Paris 15ème",
    amount: 60,
    children: 1
  },
  {
    id: "b2",
    familyName: "Famille Martin",
    familyAvatar: "https://randomuser.me/api/portraits/men/54.jpg",
    date: "Vendredi 25 Avril",
    time: "18:00 - 22:00",
    location: "Paris 11ème",
    amount: 60,
    children: 2
  }
];

// Données pour les statistiques
const stats = {
  totalEarnings: 840,
  totalHours: 56,
  averageRating: 4.8,
  completedBookings: 14
};

const NannyDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-pink-50/50">
      <Header />
      
      <main className="flex-grow py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Bonjour, Marie</h1>
              <p className="text-muted-foreground">Bienvenue sur votre tableau de bord</p>
            </div>
            
            <Button 
              onClick={() => navigate("/profile/me")}
              variant="outline"
              className="border-pink-300 text-pink-700 hover:bg-pink-50"
            >
              <User className="w-4 h-4 mr-2" />
              Voir mon profil
            </Button>
          </div>
          
          {/* Statistiques */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-pink-50 border-pink-100">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <DollarSign className="w-8 h-8 text-pink-500 mb-2" />
                <p className="text-sm font-medium text-pink-700">Revenus totaux</p>
                <p className="text-2xl font-bold text-pink-800">{stats.totalEarnings}€</p>
              </CardContent>
            </Card>
            
            <Card className="bg-blue-50 border-blue-100">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <Clock className="w-8 h-8 text-blue-500 mb-2" />
                <p className="text-sm font-medium text-blue-700">Heures de garde</p>
                <p className="text-2xl font-bold text-blue-800">{stats.totalHours}h</p>
              </CardContent>
            </Card>
            
            <Card className="bg-yellow-50 border-yellow-100">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <Star className="w-8 h-8 text-yellow-500 mb-2" />
                <p className="text-sm font-medium text-yellow-700">Note moyenne</p>
                <p className="text-2xl font-bold text-yellow-800">{stats.averageRating}/5</p>
              </CardContent>
            </Card>
            
            <Card className="bg-green-50 border-green-100">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <Briefcase className="w-8 h-8 text-green-500 mb-2" />
                <p className="text-sm font-medium text-green-700">Gardes effectuées</p>
                <p className="text-2xl font-bold text-green-800">{stats.completedBookings}</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Contenu principal en colonnes */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Colonne principale */}
            <div className="lg:col-span-2 space-y-6">
              {/* Demandes de garde */}
              <Card className="border-pink-100">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-xl">Demandes de garde</CardTitle>
                    <CardDescription>Nouvelles demandes des familles</CardDescription>
                  </div>
                  <Calendar className="w-5 h-5 text-pink-500" />
                </CardHeader>
                <CardContent>
                  {bookingRequests.length > 0 ? (
                    <div className="space-y-4">
                      {bookingRequests.map((request) => (
                        <Card key={request.id} className="border-gray-100">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                              <img 
                                src={request.familyAvatar} 
                                alt={request.familyName} 
                                className="w-12 h-12 rounded-full object-cover"
                              />
                              <div className="flex-grow">
                                <div className="flex justify-between items-start mb-1">
                                  <h3 className="font-medium">{request.familyName}</h3>
                                  <Badge 
                                    className={
                                      request.status === 'pending' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' :
                                      request.status === 'accepted' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                                      'bg-red-100 text-red-800 hover:bg-red-200'
                                    }
                                  >
                                    {request.status === 'pending' ? 'En attente' : 
                                     request.status === 'accepted' ? 'Acceptée' : 'Refusée'}
                                  </Badge>
                                </div>
                                <div className="flex gap-6 text-sm text-gray-600 mb-2">
                                  <div className="flex items-center">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    {request.date}
                                  </div>
                                  <div className="flex items-center">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {request.time}
                                  </div>
                                </div>
                                <p className="text-sm text-gray-700 mb-3">
                                  {request.message}
                                </p>
                                {request.status === 'pending' && (
                                  <div className="flex gap-2 mt-2">
                                    <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                                      Accepter
                                    </Button>
                                    <Button size="sm" variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
                                      Refuser
                                    </Button>
                                    <Button size="sm" variant="ghost">
                                      Message
                                    </Button>
                                  </div>
                                )}
                                {request.status === 'accepted' && (
                                  <Button size="sm" variant="outline" className="border-pink-300 text-pink-700 hover:bg-pink-50">
                                    Voir les détails
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <h3 className="font-medium text-lg mb-1">Aucune demande en attente</h3>
                      <p className="text-muted-foreground mb-4">Vous n'avez pas de nouvelles demandes de garde</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Prochaines gardes */}
              <Card className="border-pink-100">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-xl">Prochaines gardes</CardTitle>
                    <CardDescription>Vos gardes d'enfants planifiées</CardDescription>
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
                            src={booking.familyAvatar} 
                            alt={booking.familyName} 
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-grow">
                            <h3 className="font-medium">{booking.familyName}</h3>
                            <div className="flex flex-wrap gap-x-6 text-sm text-gray-600 mt-1">
                              <div className="flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                {booking.date}
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {booking.time}
                              </div>
                              <div className="flex items-center">
                                <DollarSign className="w-3 h-3 mr-1" />
                                {booking.amount}€
                              </div>
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            className="border-pink-200 text-pink-700 hover:bg-pink-50"
                            size="sm"
                          >
                            Détails
                          </Button>
                        </div>
                      ))}
                      
                      <Button 
                        variant="outline" 
                        className="w-full mt-4 border-pink-200 text-pink-700 hover:bg-pink-50"
                      >
                        Voir toutes les gardes
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <h3 className="font-medium text-lg mb-1">Aucune garde à venir</h3>
                      <p className="text-muted-foreground mb-4">Vous n'avez pas encore de gardes planifiées</p>
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
                    <CardDescription>Informations personnelles</CardDescription>
                  </div>
                  <User className="w-5 h-5 text-pink-500" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src="https://randomuser.me/api/portraits/women/44.jpg"
                      alt="Photo de profil"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-bold">Marie Dupont</h3>
                      <div className="flex items-center text-sm text-gray-600">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>4.8/5 • 14 avis</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Complétude du profil</span>
                      <span>90%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-pink-500 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span>Statut du profil</span>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                      Vérifié
                    </Badge>
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
              
              {/* Messages récents */}
              <Card className="border-pink-100">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-xl">Messages récents</CardTitle>
                    <CardDescription>Vos conversations</CardDescription>
                  </div>
                  <MessageCircle className="w-5 h-5 text-pink-500" />
                </CardHeader>
                <CardContent>
                  {recentMessages.length > 0 ? (
                    <div className="space-y-3">
                      {recentMessages.map((message) => (
                        <div 
                          key={message.id}
                          className={`flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors ${message.unread ? 'bg-pink-50' : ''}`}
                        >
                          <img 
                            src={message.familyAvatar} 
                            alt={message.familyName} 
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div className="flex-grow">
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium text-sm flex items-center">
                                {message.familyName}
                                {message.unread && (
                                  <span className="ml-2 w-2 h-2 bg-pink-500 rounded-full"></span>
                                )}
                              </h3>
                              <span className="text-xs text-gray-500">{message.date}</span>
                            </div>
                            <p className="text-xs text-gray-600 line-clamp-1 mt-0.5">{message.preview}</p>
                          </div>
                        </div>
                      ))}
                      
                      <Button 
                        variant="outline" 
                        className="w-full mt-2 border-pink-200 text-pink-700 hover:bg-pink-50"
                        size="sm"
                      >
                        Voir tous les messages
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <MessageCircle className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                      <h3 className="font-medium text-sm mb-1">Aucun message</h3>
                      <p className="text-muted-foreground text-xs">Vous n'avez pas de messages récents</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Disponibilités */}
              <Card className="border-pink-100">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-xl">Mes disponibilités</CardTitle>
                    <CardDescription>Jours et heures disponibles</CardDescription>
                  </div>
                  <Calendar className="w-5 h-5 text-pink-500" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="font-medium">Lundi</div>
                      <Badge className="bg-green-100 text-green-800">Disponible</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="font-medium">Mardi</div>
                      <Badge className="bg-green-100 text-green-800">Disponible</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="font-medium">Mercredi</div>
                      <Badge className="bg-green-100 text-green-800">Disponible</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="font-medium">Jeudi</div>
                      <Badge className="bg-red-100 text-red-800">Indisponible</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="font-medium">Vendredi</div>
                      <Badge className="bg-green-100 text-green-800">Disponible</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="font-medium">Samedi</div>
                      <Badge className="bg-red-100 text-red-800">Indisponible</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="font-medium">Dimanche</div>
                      <Badge className="bg-red-100 text-red-800">Indisponible</Badge>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full mt-2 border-pink-200 text-pink-700 hover:bg-pink-50"
                      size="sm"
                    >
                      Modifier mes disponibilités
                    </Button>
                  </div>
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
                      <h4 className="font-medium text-blue-800">Félicitations !</h4>
                      <p className="text-sm text-blue-700">Vous avez reçu une nouvelle évaluation 5 étoiles.</p>
                    </div>
                    <div className="p-3 bg-pink-50 rounded-lg border border-pink-100">
                      <h4 className="font-medium text-pink-800">Conseil</h4>
                      <p className="text-sm text-pink-700">Complétez vos informations pour attirer plus de familles.</p>
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

export default NannyDashboard;
