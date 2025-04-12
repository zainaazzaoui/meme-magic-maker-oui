
import React, { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Heart, Upload, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Register = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Déterminer le type d'utilisateur initial en fonction des paramètres d'URL
  const initialTab = searchParams.get("type") === "nanny" ? "nanny" : "family";
  
  const [activeTab, setActiveTab] = useState<"family" | "nanny">(initialTab as "family" | "nanny");
  const [isLoading, setIsLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  
  // États des formulaires
  const [familyForm, setFamilyForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
  });
  
  const [nannyForm, setNannyForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    experience: "",
    bio: "",
    photo: null as File | null,
  });

  const handleFamilySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (familyForm.password !== familyForm.confirmPassword) {
        toast.error("Les mots de passe ne correspondent pas.");
        return;
      }
      
      // Simulation d'une requête d'inscription
      // À remplacer par un vrai appel API vers le backend Laravel
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Compte famille créé avec succès !");
      navigate("/family/dashboard");
    } catch (error) {
      toast.error("Erreur lors de l'inscription. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNannySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (nannyForm.password !== nannyForm.confirmPassword) {
        toast.error("Les mots de passe ne correspondent pas.");
        return;
      }
      
      // Simulation d'une requête d'inscription avec upload de photo
      // À remplacer par un vrai appel API vers le backend Laravel
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Affichage d'un message concernant la photo
      if (nannyForm.photo) {
        console.log("Photo à envoyer:", nannyForm.photo.name);
      }
      
      toast.success("Compte nounou créé avec succès !");
      navigate("/nanny/dashboard");
    } catch (error) {
      toast.error("Erreur lors de l'inscription. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFamilyFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFamilyForm(prev => ({ ...prev, [name]: value }));
  };

  const handleNannyFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNannyForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      // Mise à jour du formulaire avec la photo
      setNannyForm(prev => ({ ...prev, photo: file }));
      
      // Création d'une URL pour l'aperçu de la photo
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const removePhoto = () => {
    setNannyForm(prev => ({ ...prev, photo: null }));
    setPhotoPreview(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-pink-50/50">
      <Header />
      
      <main className="flex-grow py-10 px-4">
        <div className="max-w-lg mx-auto">
          <Card className="border-pink-100 shadow-lg">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-2">
                <Heart className="w-8 h-8 text-pink-500" />
              </div>
              <CardTitle className="text-2xl font-bold">Créer un compte</CardTitle>
              <CardDescription>Rejoignez la communauté Nanny</CardDescription>
            </CardHeader>
            
            <CardContent>
              <Tabs defaultValue={activeTab} onValueChange={(v) => setActiveTab(v as "family" | "nanny")} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="family">Je suis une famille</TabsTrigger>
                  <TabsTrigger value="nanny">Je suis une nounou</TabsTrigger>
                </TabsList>
                
                <TabsContent value="family">
                  <form onSubmit={handleFamilySubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="family-firstName">Prénom</Label>
                        <Input
                          id="family-firstName"
                          name="firstName"
                          value={familyForm.firstName}
                          onChange={handleFamilyFormChange}
                          required
                          className="border-pink-200 focus-visible:ring-pink-300"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="family-lastName">Nom</Label>
                        <Input
                          id="family-lastName"
                          name="lastName"
                          value={familyForm.lastName}
                          onChange={handleFamilyFormChange}
                          required
                          className="border-pink-200 focus-visible:ring-pink-300"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="family-email">Email</Label>
                      <Input
                        id="family-email"
                        name="email"
                        type="email"
                        placeholder="votre@email.com"
                        value={familyForm.email}
                        onChange={handleFamilyFormChange}
                        required
                        className="border-pink-200 focus-visible:ring-pink-300"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="family-password">Mot de passe</Label>
                        <Input
                          id="family-password"
                          name="password"
                          type="password"
                          value={familyForm.password}
                          onChange={handleFamilyFormChange}
                          required
                          className="border-pink-200 focus-visible:ring-pink-300"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="family-confirmPassword">Confirmer</Label>
                        <Input
                          id="family-confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={familyForm.confirmPassword}
                          onChange={handleFamilyFormChange}
                          required
                          className="border-pink-200 focus-visible:ring-pink-300"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="family-address">Adresse</Label>
                      <Input
                        id="family-address"
                        name="address"
                        value={familyForm.address}
                        onChange={handleFamilyFormChange}
                        required
                        className="border-pink-200 focus-visible:ring-pink-300"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="family-city">Ville</Label>
                      <Input
                        id="family-city"
                        name="city"
                        value={familyForm.city}
                        onChange={handleFamilyFormChange}
                        required
                        className="border-pink-200 focus-visible:ring-pink-300"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:opacity-90"
                      disabled={isLoading}
                    >
                      {isLoading ? "Inscription en cours..." : "S'inscrire comme famille"}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="nanny">
                  <form onSubmit={handleNannySubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nanny-firstName">Prénom</Label>
                        <Input
                          id="nanny-firstName"
                          name="firstName"
                          value={nannyForm.firstName}
                          onChange={handleNannyFormChange}
                          required
                          className="border-pink-200 focus-visible:ring-pink-300"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="nanny-lastName">Nom</Label>
                        <Input
                          id="nanny-lastName"
                          name="lastName"
                          value={nannyForm.lastName}
                          onChange={handleNannyFormChange}
                          required
                          className="border-pink-200 focus-visible:ring-pink-300"
                        />
                      </div>
                    </div>
                    
                    {/* Ajout du champ pour télécharger une photo */}
                    <div className="space-y-2">
                      <Label htmlFor="nanny-photo">Photo de profil</Label>
                      <div className="flex flex-col items-center space-y-4">
                        {photoPreview ? (
                          <div className="relative">
                            <Avatar className="w-24 h-24">
                              <AvatarImage src={photoPreview} alt="Aperçu" />
                              <AvatarFallback>Photo</AvatarFallback>
                            </Avatar>
                            <button
                              type="button"
                              onClick={removePhoto}
                              className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <div className="w-full">
                            <label
                              htmlFor="nanny-photo-upload"
                              className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-pink-300 rounded-lg cursor-pointer hover:bg-pink-50"
                            >
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-8 h-8 text-pink-400 mb-2" />
                                <p className="text-sm text-gray-500">Cliquez pour ajouter une photo</p>
                              </div>
                              <Input
                                id="nanny-photo-upload"
                                name="photo"
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoChange}
                                className="hidden"
                              />
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="nanny-email">Email</Label>
                      <Input
                        id="nanny-email"
                        name="email"
                        type="email"
                        placeholder="votre@email.com"
                        value={nannyForm.email}
                        onChange={handleNannyFormChange}
                        required
                        className="border-pink-200 focus-visible:ring-pink-300"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nanny-password">Mot de passe</Label>
                        <Input
                          id="nanny-password"
                          name="password"
                          type="password"
                          value={nannyForm.password}
                          onChange={handleNannyFormChange}
                          required
                          className="border-pink-200 focus-visible:ring-pink-300"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="nanny-confirmPassword">Confirmer</Label>
                        <Input
                          id="nanny-confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={nannyForm.confirmPassword}
                          onChange={handleNannyFormChange}
                          required
                          className="border-pink-200 focus-visible:ring-pink-300"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="nanny-experience">Années d'expérience</Label>
                      <Input
                        id="nanny-experience"
                        name="experience"
                        type="number"
                        min="0"
                        placeholder="2"
                        value={nannyForm.experience}
                        onChange={handleNannyFormChange}
                        required
                        className="border-pink-200 focus-visible:ring-pink-300"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="nanny-bio">Présentation</Label>
                      <textarea
                        id="nanny-bio"
                        name="bio"
                        rows={3}
                        placeholder="Parlez un peu de vous, de votre expérience..."
                        value={nannyForm.bio}
                        onChange={handleNannyFormChange}
                        required
                        className="w-full border-pink-200 focus-visible:ring-pink-300 rounded-md min-h-[80px] p-3"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:opacity-90"
                      disabled={isLoading}
                    >
                      {isLoading ? "Inscription en cours..." : "S'inscrire comme nounou"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
            
            <CardFooter className="flex justify-center">
              <div className="text-sm text-gray-500">
                Déjà un compte? {" "}
                <Link to="/login" className="text-pink-600 hover:underline font-medium">
                  Se connecter
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <footer className="py-6 text-center text-sm text-gray-500">
        © 2025 Nanny - Tous droits réservés
      </footer>
    </div>
  );
};

export default Register;
