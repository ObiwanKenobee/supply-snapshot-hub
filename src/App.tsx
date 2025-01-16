import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Lazy load pages
const Index = lazy(() => import("./pages/Index"));
const Monitoring = lazy(() => import("./pages/Monitoring"));
const ESGTracker = lazy(() => import("./pages/ESGTracker"));
const RiskManagement = lazy(() => import("./pages/RiskManagement"));
const ReportsAnalytics = lazy(() => import("./pages/ReportsAnalytics"));
const Settings = lazy(() => import("./pages/Settings"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/monitoring" element={<Monitoring />} />
            <Route path="/esg" element={<ESGTracker />} />
            <Route path="/risk" element={<RiskManagement />} />
            <Route path="/reports" element={<ReportsAnalytics />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;