
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Pages principales
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FamilyDashboard from "./pages/family/Dashboard";
import FamilyProfile from "./pages/family/Profile";
import NannyDashboard from "./pages/nanny/Dashboard";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import AdminPanel from "./pages/admin/AdminPanel";

// Pour la gestion de la langue
interface AppWrapperProps {
  children: React.ReactNode;
}

const AppWrapper = ({ children }: AppWrapperProps) => {
  const [isArabic, setIsArabic] = useState(false);
  
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage === "ar") {
      setIsArabic(true);
      document.documentElement.classList.add("rtl");
    } else {
      document.documentElement.classList.remove("rtl");
    }
  }, []);
  
  return <>{children}</>;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/family/dashboard" element={<FamilyDashboard />} />
            <Route path="/family/profile" element={<FamilyProfile />} />
            <Route path="/profile/me" element={<FamilyProfile />} />
            <Route path="/nanny/dashboard" element={<NannyDashboard />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppWrapper>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
