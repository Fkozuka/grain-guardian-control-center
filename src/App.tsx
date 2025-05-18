
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Storage from "./pages/Storage";
import NotFound from "./pages/NotFound";
import Secadores from "./pages/Secadores";
import Monitoring from "./pages/Monitoring";
import Charts from "./pages/Charts";
import FluxoTransferencia from "./pages/FluxoTransferencia";
import Equipamento from "./pages/Equipamento";
import Login from "./pages/Login";
import { AuthProvider } from "./hooks/use-auth";
import ProtectedRoute from "./components/ProtectedRoute";
import { initializeDatabase } from "./api";

const queryClient = new QueryClient();

const App = () => {
  // Initialize the database on app startup
  useEffect(() => {
    // This would be a server-side operation in a real application
    // Here we're doing it client-side for demonstration
    const init = async () => {
      try {
        console.log("Initializing database...");
        const result = await initializeDatabase();
        if (result.success) {
          console.log("Database initialized successfully");
        } else {
          console.error("Failed to initialize database:", result.error);
        }
      } catch (error) {
        console.error("Error during database initialization:", error);
      }
    };
    
    init();
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route 
                path="/" 
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/storage" 
                element={
                  <ProtectedRoute>
                    <Storage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/secadores" 
                element={
                  <ProtectedRoute>
                    <Secadores />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/monitoring" 
                element={
                  <ProtectedRoute>
                    <Monitoring />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/charts" 
                element={
                  <ProtectedRoute>
                    <Charts />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/fluxo-transferencia" 
                element={
                  <ProtectedRoute>
                    <FluxoTransferencia />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/equipamento/:id" 
                element={
                  <ProtectedRoute>
                    <Equipamento />
                  </ProtectedRoute>
                } 
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
