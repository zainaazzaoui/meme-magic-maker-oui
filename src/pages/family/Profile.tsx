
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Calendar, 
  Check, 
  Heart, 
  MapPin, 
  Pencil, 
  Save, 
  User, 
  Users 
} from "lucide-react";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Form schema for validation
const familyProfileSchema = z.object({
  familyName: z.string().min(2, "Le nom de famille doit contenir au moins 2 caractères"),
  parentNames: z.string().min(2, "Veuillez indiquer les noms des parents"),
  address: z.string().min(5, "L'adresse doit contenir au moins 5 caractères"),
  postalCode: z.string().regex(/^\d{5}$/, "Le code postal doit contenir 5 chiffres"),
  city: z.string().min(2, "La ville doit contenir au moins 2 caractères"),
  childrenCount: z.string(),
  childrenAges: z.string(),
  languages: z.string(),
  description: z.string(),
});

type FamilyProfileFormValues = z.infer<typeof familyProfileSchema>;

const FamilyProfile = () => {
  const navigate = useNavigate();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingNeeds, setIsEditingNeeds] = useState(false);
  
  // Initialize with some sample family data
  const defaultValues: FamilyProfileFormValues = {
    familyName: "Famille Martin",
    parentNames: "Jean et Marie Martin",
    address: "23 rue des Lilas",
    postalCode: "75015",
    city: "Paris",
    childrenCount: "2",
    childrenAges: "3 ans, 6 ans",
    languages: "Français, Anglais",
    description: "Nous sommes une famille active avec deux enfants. Nous recherchons une nounou fiable et dynamique pour s'occuper de nos enfants les après-midis après l'école et le mercredi."
  };

  const form = useForm<FamilyProfileFormValues>({
    resolver: zodResolver(familyProfileSchema),
    defaultValues,
  });

  const onSubmit = (data: FamilyProfileFormValues) => {
    console.log("Form submitted:", data);
    setIsEditingProfile(false);
    setIsEditingNeeds(false);
    // Here you would typically save the data to a database
  };

  // Sample data for childcare needs
  const childcareNeeds = [
    {
      type: "Après l'école",
      days: "Lundi, Mardi, Jeudi",
      hours: "16h30 - 19h00"
    },
    {
      type: "Journée complète",
      days: "Mercredi",
      hours: "8h30 - 18h00"
    },
    {
      type: "Occasionnel",
      days: "Week-ends",
      hours: "Variable selon besoin"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50/50">
      <Header />
      
      <div className="container mx-auto max-w-5xl py-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Mon Profil Famille</h1>
          <Button 
            variant="outline" 
            className="border-pink-200 text-pink-700 hover:bg-pink-50"
            onClick={() => navigate("/family/dashboard")}
          >
            Retour au tableau de bord
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Colonne de gauche - Photo et profil */}
          <div className="space-y-6">
            {/* Photo de profil */}
            <Card className="border-pink-100">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="w-32 h-32 bg-pink-100 rounded-full flex items-center justify-center text-pink-500 text-3xl font-bold mb-4">
                      FM
                    </div>
                    <Button 
                      size="icon" 
                      className="absolute bottom-0 right-0 bg-pink-500 hover:bg-pink-600 text-white rounded-full"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </div>
                  <h2 className="text-xl font-bold mb-1">{form.watch("familyName")}</h2>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="w-3 h-3 mr-1" />
                    {form.watch("city")}, {form.watch("postalCode")}
                  </div>
                  
                  <div className="mt-4 w-full">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Complétude du profil</span>
                      <span>75%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-pink-500 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Status de la famille */}
            <Card className="border-pink-100">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Heart className="w-5 h-5 text-pink-500 mr-2" />
                  Statut de la famille
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Membre depuis</span>
                    <span className="font-medium">Avril 2025</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Réservations</span>
                    <span className="font-medium">3 réservations</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Nounous favorites</span>
                    <span className="font-medium">2 favorites</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Colonne de droite - Informations de la famille */}
          <div className="md:col-span-2 space-y-6">
            {/* Informations de la famille */}
            <Card className="border-pink-100">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl flex items-center">
                  <Users className="w-5 h-5 text-pink-500 mr-2" />
                  Informations de la famille
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  className="text-pink-500 hover:bg-pink-50 hover:text-pink-600"
                >
                  {isEditingProfile ? <Save className="w-5 h-5" /> : <Pencil className="w-5 h-5" />}
                </Button>
              </CardHeader>
              <CardContent>
                {isEditingProfile ? (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="familyName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nom de famille</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="parentNames"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Noms des parents</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Adresse</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="postalCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Code postal</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Ville</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="childrenCount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nombre d'enfants</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="childrenAges"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Âges des enfants</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Ex: 3 ans, 5 ans" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="languages"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Langues parlées</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Ex: Français, Anglais" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description de la famille</FormLabel>
                            <FormControl>
                              <textarea 
                                className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex justify-end gap-3">
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => setIsEditingProfile(false)}
                        >
                          Annuler
                        </Button>
                        <Button type="submit">Enregistrer</Button>
                      </div>
                    </form>
                  </Form>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-600 block mb-1">Nom de famille</Label>
                        <p className="font-medium">{form.watch("familyName")}</p>
                      </div>
                      
                      <div>
                        <Label className="text-gray-600 block mb-1">Noms des parents</Label>
                        <p className="font-medium">{form.watch("parentNames")}</p>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-gray-600 block mb-1">Adresse</Label>
                      <p className="font-medium">{form.watch("address")}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-600 block mb-1">Code postal</Label>
                        <p className="font-medium">{form.watch("postalCode")}</p>
                      </div>
                      
                      <div>
                        <Label className="text-gray-600 block mb-1">Ville</Label>
                        <p className="font-medium">{form.watch("city")}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-600 block mb-1">Nombre d'enfants</Label>
                        <p className="font-medium">{form.watch("childrenCount")}</p>
                      </div>
                      
                      <div>
                        <Label className="text-gray-600 block mb-1">Âges des enfants</Label>
                        <p className="font-medium">{form.watch("childrenAges")}</p>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-gray-600 block mb-1">Langues parlées</Label>
                      <p className="font-medium">{form.watch("languages")}</p>
                    </div>
                    
                    <div>
                      <Label className="text-gray-600 block mb-1">Description</Label>
                      <p className="text-gray-700">{form.watch("description")}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Besoins de garde */}
            <Card className="border-pink-100">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl flex items-center">
                  <Calendar className="w-5 h-5 text-pink-500 mr-2" />
                  Besoins de garde
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsEditingNeeds(!isEditingNeeds)}
                  className="text-pink-500 hover:bg-pink-50 hover:text-pink-600"
                >
                  {isEditingNeeds ? <Save className="w-5 h-5" /> : <Pencil className="w-5 h-5" />}
                </Button>
              </CardHeader>
              <CardContent>
                {isEditingNeeds ? (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600 mb-4">
                      Définissez vos besoins de garde réguliers pour aider les nounous à comprendre votre planning.
                    </p>
                    
                    {childcareNeeds.map((need, index) => (
                      <div key={index} className="space-y-3 p-4 border border-gray-100 rounded-lg">
                        <div>
                          <Label className="text-gray-600 block mb-1">Type de garde</Label>
                          <Input defaultValue={need.type} />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-gray-600 block mb-1">Jours</Label>
                            <Input defaultValue={need.days} />
                          </div>
                          
                          <div>
                            <Label className="text-gray-600 block mb-1">Horaires</Label>
                            <Input defaultValue={need.hours} />
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <Button variant="outline" className="w-full mt-2">
                      + Ajouter un autre besoin de garde
                    </Button>
                    
                    <div className="flex justify-end gap-3 mt-6">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setIsEditingNeeds(false)}
                      >
                        Annuler
                      </Button>
                      <Button onClick={() => setIsEditingNeeds(false)}>
                        Enregistrer
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {childcareNeeds.map((need, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">{need.type}</p>
                          <p className="text-sm text-gray-600">{need.days} de {need.hours}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Simple Footer */}
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

export default FamilyProfile;
