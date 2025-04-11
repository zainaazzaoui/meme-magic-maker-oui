
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Heart } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulation d'une requête d'authentification
      // À remplacer par un vrai appel API vers le backend Laravel
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulation de succès
      toast.success("Connexion réussie !");
      navigate("/family/dashboard");
    } catch (error) {
      toast.error("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-pink-50/50">
      <Header />
      
      <main className="flex-grow py-10 px-4">
        <div className="max-w-md mx-auto">
          <Card className="border-pink-100 shadow-lg">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-2">
                <Heart className="w-8 h-8 text-pink-500" />
              </div>
              <CardTitle className="text-2xl font-bold">Connexion</CardTitle>
              <CardDescription>Connectez-vous à votre compte Nanny</CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Adresse e-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-pink-200 focus-visible:ring-pink-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Mot de passe</Label>
                    <Link to="#" className="text-sm text-pink-600 hover:underline">
                      Mot de passe oublié?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-pink-200 focus-visible:ring-pink-300"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:opacity-90"
                  disabled={isLoading}
                >
                  {isLoading ? "Connexion en cours..." : "Se connecter"}
                </Button>
              </form>
            </CardContent>
            
            <CardFooter className="flex flex-col gap-4 items-center">
              <div className="text-sm text-gray-500">
                Pas encore de compte?{" "}
                <Link to="/register" className="text-pink-600 hover:underline font-medium">
                  Créer un compte
                </Link>
              </div>
              
              <div className="flex flex-col w-full text-center">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">ou</span>
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  <Button variant="outline" className="w-full">
                    Continuer avec Google
                  </Button>
                  <Button variant="outline" className="w-full">
                    Continuer avec Facebook
                  </Button>
                </div>
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

export default Login;
