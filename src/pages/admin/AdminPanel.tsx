
import React, { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Search, User, MessageCircle, AlertCircle, CheckCircle, XCircle, Eye, Shield, BarChart, Users } from "lucide-react";

// Types pour les données simulées
interface UserData {
  id: string;
  name: string;
  email: string;
  type: "family" | "nanny";
  status: "active" | "pending" | "suspended";
  joinDate: string;
  avatar: string;
}

interface MessageData {
  id: string;
  from: {
    id: string;
    name: string;
    type: "family" | "nanny";
    avatar: string;
  };
  to: {
    id: string;
    name: string;
    type: "family" | "nanny";
    avatar: string;
  };
  date: string;
  preview: string;
  flagged: boolean;
}

interface Report {
  id: string;
  type: "user" | "message" | "review";
  reportedBy: string;
  reportedUser: string;
  date: string;
  reason: string;
  status: "pending" | "resolved" | "dismissed";
}

// Données simulées
const users: UserData[] = [
  {
    id: "1",
    name: "Marie Dupont",
    email: "marie.dupont@example.com",
    type: "nanny",
    status: "active",
    joinDate: "15/01/2025",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: "2",
    name: "Famille Martin",
    email: "martin.famille@example.com",
    type: "family",
    status: "active",
    joinDate: "03/02/2025",
    avatar: "https://randomuser.me/api/portraits/men/54.jpg"
  },
  {
    id: "3",
    name: "Sophie Bernard",
    email: "sophie.bernard@example.com",
    type: "nanny",
    status: "pending",
    joinDate: "27/03/2025",
    avatar: "https://randomuser.me/api/portraits/women/66.jpg"
  },
  {
    id: "4",
    name: "Famille Dubois",
    email: "dubois.famille@example.com",
    type: "family",
    status: "suspended",
    joinDate: "10/02/2025",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg"
  }
];

const messages: MessageData[] = [
  {
    id: "m1",
    from: {
      id: "2",
      name: "Famille Martin",
      type: "family",
      avatar: "https://randomuser.me/api/portraits/men/54.jpg"
    },
    to: {
      id: "1",
      name: "Marie Dupont",
      type: "nanny",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    date: "15/04/2025 14:30",
    preview: "Bonjour Marie, nous aurions besoin de vos services pour vendredi soir...",
    flagged: false
  },
  {
    id: "m2",
    from: {
      id: "1",
      name: "Marie Dupont",
      type: "nanny",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    to: {
      id: "2",
      name: "Famille Martin",
      type: "family",
      avatar: "https://randomuser.me/api/portraits/men/54.jpg"
    },
    date: "15/04/2025 15:10",
    preview: "Bonjour, je suis disponible vendredi soir. Quelle heure vous conviendrait ?",
    flagged: false
  },
  {
    id: "m3",
    from: {
      id: "4",
      name: "Famille Dubois",
      type: "family",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg"
    },
    to: {
      id: "3",
      name: "Sophie Bernard",
      type: "nanny",
      avatar: "https://randomuser.me/api/portraits/women/66.jpg"
    },
    date: "12/04/2025 09:45",
    preview: "Votre tarif est beaucoup trop élevé, c'est du vol !",
    flagged: true
  }
];

const reports: Report[] = [
  {
    id: "r1",
    type: "message",
    reportedBy: "Sophie Bernard",
    reportedUser: "Famille Dubois",
    date: "12/04/2025",
    reason: "Message inapproprié et agressif",
    status: "pending"
  },
  {
    id: "r2",
    type: "user",
    reportedBy: "Famille Martin",
    reportedUser: "Thomas Petit",
    date: "10/04/2025",
    reason: "Informations trompeuses sur le profil",
    status: "resolved"
  },
  {
    id: "r3",
    type: "review",
    reportedBy: "Marie Dupont",
    reportedUser: "Famille Lambert",
    date: "05/04/2025",
    reason: "Avis mensonger et diffamatoire",
    status: "dismissed"
  }
];

// Statistiques
const stats = {
  totalUsers: 124,
  activeUsers: 98,
  newUsersThisMonth: 14,
  totalBookings: 187,
  totalMessages: 842
};

const AdminPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  // Filtrer les utilisateurs en fonction des critères
  const filteredUsers = users.filter(user => {
    const searchMatch = searchTerm === "" || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const statusMatch = statusFilter === "all" || user.status === statusFilter;
    const typeMatch = typeFilter === "all" || user.type === typeFilter;
    
    return searchMatch && statusMatch && typeMatch;
  });
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50/30">
      <Header />
      
      <main className="flex-grow py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h1 className="text-2xl md:text-3xl font-bold">Panneau d'administration</h1>
            <Badge className="bg-blue-500 hover:bg-blue-600">Administrateur</Badge>
          </div>
          
          {/* Statistiques */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <Users className="w-7 h-7 text-blue-500 mb-2" />
                <p className="text-xs font-medium text-blue-700">Utilisateurs</p>
                <p className="text-xl font-bold text-blue-800">{stats.totalUsers}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <CheckCircle className="w-7 h-7 text-green-500 mb-2" />
                <p className="text-xs font-medium text-green-700">Actifs</p>
                <p className="text-xl font-bold text-green-800">{stats.activeUsers}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <User className="w-7 h-7 text-yellow-500 mb-2" />
                <p className="text-xs font-medium text-yellow-700">Nouveaux</p>
                <p className="text-xl font-bold text-yellow-800">+{stats.newUsersThisMonth}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <Calendar className="w-7 h-7 text-purple-500 mb-2" />
                <p className="text-xs font-medium text-purple-700">Réservations</p>
                <p className="text-xl font-bold text-purple-800">{stats.totalBookings}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <MessageCircle className="w-7 h-7 text-pink-500 mb-2" />
                <p className="text-xs font-medium text-pink-700">Messages</p>
                <p className="text-xl font-bold text-pink-800">{stats.totalMessages}</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Onglets */}
          <Tabs defaultValue="users" className="mb-12">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="users">Utilisateurs</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="reports">Signalements</TabsTrigger>
            </TabsList>
            
            {/* Onglet Utilisateurs */}
            <TabsContent value="users">
              <Card>
                <CardHeader className="pb-0">
                  <div className="flex flex-col md:flex-row gap-4 justify-between">
                    <CardTitle>Gestion des utilisateurs</CardTitle>
                    <div className="flex flex-col md:flex-row gap-2">
                      <div className="w-full md:w-44">
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                          <SelectTrigger>
                            <SelectValue placeholder="Statut" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Tous les statuts</SelectItem>
                            <SelectItem value="active">Actifs</SelectItem>
                            <SelectItem value="pending">En attente</SelectItem>
                            <SelectItem value="suspended">Suspendus</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="w-full md:w-44">
                        <Select value={typeFilter} onValueChange={setTypeFilter}>
                          <SelectTrigger>
                            <SelectValue placeholder="Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Tous les types</SelectItem>
                            <SelectItem value="family">Familles</SelectItem>
                            <SelectItem value="nanny">Nounous</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="w-full md:w-64">
                        <Input
                          placeholder="Rechercher par nom ou email..."
                          value={searchTerm}
                          onChange={e => setSearchTerm(e.target.value)}
                          className="border-blue-200"
                        />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-blue-50 border-y border-blue-100">
                        <tr>
                          <th className="py-3 px-4 text-left">Utilisateur</th>
                          <th className="py-3 px-4 text-left">Email</th>
                          <th className="py-3 px-4 text-left">Type</th>
                          <th className="py-3 px-4 text-left">Statut</th>
                          <th className="py-3 px-4 text-left">Date</th>
                          <th className="py-3 px-4 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.length > 0 ? (
                          filteredUsers.map((user) => (
                            <tr key={user.id} className="border-b border-gray-100">
                              <td className="py-3 px-4">
                                <div className="flex items-center">
                                  <img 
                                    src={user.avatar} 
                                    alt={user.name} 
                                    className="w-8 h-8 rounded-full mr-2"
                                  />
                                  <span>{user.name}</span>
                                </div>
                              </td>
                              <td className="py-3 px-4">{user.email}</td>
                              <td className="py-3 px-4">
                                <Badge className={user.type === 'family' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}>
                                  {user.type === 'family' ? 'Famille' : 'Nounou'}
                                </Badge>
                              </td>
                              <td className="py-3 px-4">
                                <Badge className={
                                  user.status === 'active' ? 'bg-green-100 text-green-800' :
                                  user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }>
                                  {user.status === 'active' ? 'Actif' : 
                                   user.status === 'pending' ? 'En attente' : 
                                   'Suspendu'}
                                </Badge>
                              </td>
                              <td className="py-3 px-4">{user.joinDate}</td>
                              <td className="py-3 px-4">
                                <div className="flex gap-1">
                                  <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" className="p-1 h-8 w-8 text-yellow-500">
                                    <Shield className="w-4 h-4" />
                                  </Button>
                                  {user.status !== 'suspended' && (
                                    <Button variant="ghost" size="sm" className="p-1 h-8 w-8 text-red-500">
                                      <XCircle className="w-4 h-4" />
                                    </Button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="py-4 text-center text-gray-500">
                              Aucun utilisateur trouvé
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Onglet Messages */}
            <TabsContent value="messages">
              <Card>
                <CardHeader>
                  <CardTitle>Surveillance des messages</CardTitle>
                  <CardDescription>Surveiller les conversations entre les utilisateurs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="mb-4">
                      <Input
                        placeholder="Rechercher dans les messages..."
                        className="border-blue-200"
                      />
                    </div>
                    
                    {messages.map((message) => (
                      <Card 
                        key={message.id} 
                        className={`border-gray-100 ${message.flagged ? 'bg-red-50 border-red-200' : ''}`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-1">
                              <div className="flex items-center">
                                <img 
                                  src={message.from.avatar} 
                                  alt={message.from.name} 
                                  className="w-8 h-8 rounded-full"
                                />
                                <div className="flex flex-col ml-2">
                                  <span className="font-medium text-sm">{message.from.name}</span>
                                  <Badge className={message.from.type === 'family' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}>
                                    {message.from.type === 'family' ? 'Famille' : 'Nounou'}
                                  </Badge>
                                </div>
                              </div>
                              
                              <span className="mx-2">→</span>
                              
                              <div className="flex items-center">
                                <img 
                                  src={message.to.avatar} 
                                  alt={message.to.name} 
                                  className="w-8 h-8 rounded-full"
                                />
                                <div className="flex flex-col ml-2">
                                  <span className="font-medium text-sm">{message.to.name}</span>
                                  <Badge className={message.to.type === 'family' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}>
                                    {message.to.type === 'family' ? 'Famille' : 'Nounou'}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            
                            <div className="text-sm text-gray-500">
                              {message.date}
                            </div>
                          </div>
                          
                          <div className="p-3 bg-gray-50 rounded-md">
                            <p className="text-sm">
                              {message.preview}
                            </p>
                          </div>
                          
                          <div className="flex justify-between mt-3">
                            <div className="flex items-center">
                              {message.flagged && (
                                <Badge className="bg-red-100 text-red-800 flex items-center">
                                  <AlertCircle className="w-3 h-3 mr-1" /> Signalé
                                </Badge>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="ghost">
                                Voir la conversation
                              </Button>
                              {message.flagged && (
                                <Button size="sm" variant="outline" className="border-green-300 text-green-700 hover:bg-green-50">
                                  Marquer comme traité
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Onglet Signalements */}
            <TabsContent value="reports">
              <Card>
                <CardHeader>
                  <CardTitle>Gestion des signalements</CardTitle>
                  <CardDescription>Traiter les signalements des utilisateurs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-blue-50 border-y border-blue-100">
                        <tr>
                          <th className="py-3 px-4 text-left">Type</th>
                          <th className="py-3 px-4 text-left">Signalé par</th>
                          <th className="py-3 px-4 text-left">Utilisateur signalé</th>
                          <th className="py-3 px-4 text-left">Date</th>
                          <th className="py-3 px-4 text-left">Raison</th>
                          <th className="py-3 px-4 text-left">Statut</th>
                          <th className="py-3 px-4 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reports.map((report) => (
                          <tr key={report.id} className="border-b border-gray-100">
                            <td className="py-3 px-4">
                              <Badge className={
                                report.type === 'user' ? 'bg-blue-100 text-blue-800' :
                                report.type === 'message' ? 'bg-purple-100 text-purple-800' :
                                'bg-yellow-100 text-yellow-800'
                              }>
                                {report.type === 'user' ? 'Utilisateur' : 
                                 report.type === 'message' ? 'Message' : 
                                 'Avis'}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">{report.reportedBy}</td>
                            <td className="py-3 px-4">{report.reportedUser}</td>
                            <td className="py-3 px-4">{report.date}</td>
                            <td className="py-3 px-4 max-w-xs">
                              <div className="line-clamp-1">{report.reason}</div>
                            </td>
                            <td className="py-3 px-4">
                              <Badge className={
                                report.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                report.status === 'resolved' ? 'bg-green-100 text-green-800' :
                                'bg-gray-100 text-gray-800'
                              }>
                                {report.status === 'pending' ? 'En attente' : 
                                 report.status === 'resolved' ? 'Résolu' : 
                                 'Rejeté'}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              {report.status === 'pending' && (
                                <div className="flex gap-1">
                                  <Button size="sm" variant="outline" className="text-xs h-7 border-green-300 text-green-700">
                                    Approuver
                                  </Button>
                                  <Button size="sm" variant="outline" className="text-xs h-7 border-red-300 text-red-700">
                                    Rejeter
                                  </Button>
                                </div>
                              )}
                              {report.status !== 'pending' && (
                                <Button size="sm" variant="outline" className="text-xs h-7">
                                  Détails
                                </Button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-6 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center md:text-left">
            <p className="text-gray-400">© 2025 Nanny - Accès administrateur</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminPanel;
