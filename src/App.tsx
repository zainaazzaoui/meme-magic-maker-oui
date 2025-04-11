
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Pages principales
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FamilyDashboard from "./pages/family/Dashboard";
import NannyDashboard from "./pages/nanny/Dashboard";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import AdminPanel from "./pages/admin/AdminPanel";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/family/dashboard" element={<FamilyDashboard />} />
          <Route path="/nanny/dashboard" element={<NannyDashboard />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
