
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
import "./Register.css";

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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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
    <div className="register-container">
      <Header />
      
      <main className="register-main">
        <div className="register-form-container">
          <div className="register-card">
            <div className="card-header">
              <div className="heart-icon">
                <Heart className="heart" />
              </div>
              <h2 className="card-title">Créer un compte</h2>
              <p className="card-description">Rejoignez la communauté Nanny</p>
            </div>
            
            <div className="card-content">
              <div className="tabs">
                <div className="tabs-list">
                  <button 
                    className={`tab-button ${activeTab === 'family' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('family')}
                  >
                    Je suis une famille
                  </button>
                  <button 
                    className={`tab-button ${activeTab === 'nanny' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('nanny')}
                  >
                    Je suis une nounou
                  </button>
                </div>
                
                <div className="tabs-content">
                  {activeTab === 'family' && (
                    <form onSubmit={handleFamilySubmit} className="form">
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="family-firstName">Prénom</label>
                          <input
                            id="family-firstName"
                            name="firstName"
                            value={familyForm.firstName}
                            onChange={handleFamilyFormChange}
                            required
                            className="form-input"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label htmlFor="family-lastName">Nom</label>
                          <input
                            id="family-lastName"
                            name="lastName"
                            value={familyForm.lastName}
                            onChange={handleFamilyFormChange}
                            required
                            className="form-input"
                          />
                        </div>
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="family-email">Email</label>
                        <input
                          id="family-email"
                          name="email"
                          type="email"
                          placeholder="votre@email.com"
                          value={familyForm.email}
                          onChange={handleFamilyFormChange}
                          required
                          className="form-input"
                        />
                      </div>
                      
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="family-password">Mot de passe</label>
                          <input
                            id="family-password"
                            name="password"
                            type="password"
                            value={familyForm.password}
                            onChange={handleFamilyFormChange}
                            required
                            className="form-input"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label htmlFor="family-confirmPassword">Confirmer</label>
                          <input
                            id="family-confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={familyForm.confirmPassword}
                            onChange={handleFamilyFormChange}
                            required
                            className="form-input"
                          />
                        </div>
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="family-address">Adresse</label>
                        <input
                          id="family-address"
                          name="address"
                          value={familyForm.address}
                          onChange={handleFamilyFormChange}
                          required
                          className="form-input"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="family-city">Ville</label>
                        <input
                          id="family-city"
                          name="city"
                          value={familyForm.city}
                          onChange={handleFamilyFormChange}
                          required
                          className="form-input"
                        />
                      </div>
                      
                      <button 
                        type="submit" 
                        className="submit-button"
                        disabled={isLoading}
                      >
                        {isLoading ? "Inscription en cours..." : "S'inscrire comme famille"}
                      </button>
                    </form>
                  )}
                  
                  {activeTab === 'nanny' && (
                    <form onSubmit={handleNannySubmit} className="form">
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="nanny-firstName">Prénom</label>
                          <input
                            id="nanny-firstName"
                            name="firstName"
                            value={nannyForm.firstName}
                            onChange={handleNannyFormChange}
                            required
                            className="form-input"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label htmlFor="nanny-lastName">Nom</label>
                          <input
                            id="nanny-lastName"
                            name="lastName"
                            value={nannyForm.lastName}
                            onChange={handleNannyFormChange}
                            required
                            className="form-input"
                          />
                        </div>
                      </div>
                      
                      {/* Ajout du champ pour télécharger une photo */}
                      <div className="form-group">
                        <label htmlFor="nanny-photo">Photo de profil</label>
                        <div className="photo-upload">
                          {photoPreview ? (
                            <div className="photo-preview-container">
                              <div className="photo-preview">
                                <img src={photoPreview} alt="Aperçu" />
                                <button
                                  type="button"
                                  onClick={removePhoto}
                                  className="remove-photo-button"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="photo-upload-area">
                              <label
                                htmlFor="nanny-photo-upload"
                                className="photo-upload-label"
                              >
                                <div className="upload-icon-container">
                                  <Upload className="upload-icon" />
                                  <p className="upload-text">Cliquez pour ajouter une photo</p>
                                </div>
                                <input
                                  id="nanny-photo-upload"
                                  name="photo"
                                  type="file"
                                  accept="image/*"
                                  onChange={handlePhotoChange}
                                  className="hidden-input"
                                />
                              </label>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="nanny-email">Email</label>
                        <input
                          id="nanny-email"
                          name="email"
                          type="email"
                          placeholder="votre@email.com"
                          value={nannyForm.email}
                          onChange={handleNannyFormChange}
                          required
                          className="form-input"
                        />
                      </div>
                      
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="nanny-password">Mot de passe</label>
                          <input
                            id="nanny-password"
                            name="password"
                            type="password"
                            value={nannyForm.password}
                            onChange={handleNannyFormChange}
                            required
                            className="form-input"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label htmlFor="nanny-confirmPassword">Confirmer</label>
                          <input
                            id="nanny-confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={nannyForm.confirmPassword}
                            onChange={handleNannyFormChange}
                            required
                            className="form-input"
                          />
                        </div>
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="nanny-experience">Années d'expérience</label>
                        <input
                          id="nanny-experience"
                          name="experience"
                          type="number"
                          min="0"
                          placeholder="2"
                          value={nannyForm.experience}
                          onChange={handleNannyFormChange}
                          required
                          className="form-input"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="nanny-bio">Présentation</label>
                        <textarea
                          id="nanny-bio"
                          name="bio"
                          rows={3}
                          placeholder="Parlez un peu de vous, de votre expérience..."
                          value={nannyForm.bio}
                          onChange={handleNannyFormChange}
                          required
                          className="textarea-input"
                        />
                      </div>
                      
                      <button 
                        type="submit" 
                        className="submit-button"
                        disabled={isLoading}
                      >
                        {isLoading ? "Inscription en cours..." : "S'inscrire comme nounou"}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
            
            <div className="card-footer">
              <div className="login-link">
                Déjà un compte? {" "}
                <Link to="/login" className="login-link-text">
                  Se connecter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="register-footer">
        © 2025 Nanny - Tous droits réservés
      </footer>
    </div>
  );
};

export default Register;
