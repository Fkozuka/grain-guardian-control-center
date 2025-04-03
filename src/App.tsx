
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Storage from "./pages/Storage";
import NotFound from "./pages/NotFound";
import Secadores from "./pages/Secadores";
import Monitoring from "./pages/Monitoring";
import Charts from "./pages/Charts";
import FluxoTransferencia from "./pages/FluxoTransferencia";
import Equipamento from "./pages/Equipamento";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/storage" element={<Storage />} />
          <Route path="/secadores" element={<Secadores />} />
          <Route path="/monitoring" element={<Monitoring />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/fluxo-transferencia" element={<FluxoTransferencia />} />
          <Route path="/equipamento/:id" element={<Equipamento />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
