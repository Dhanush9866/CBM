
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "@/components/Layout/Layout";
import { TranslationProvider } from "@/contexts/TranslationContext";
import RouteScrollTop from "@/components/Common/RouteScrollTop";
import Services from "./pages/Services";
import Industries from "./pages/Industries";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import TestingInspection from "./pages/TestingInspection";
import CBMMonitoring from "./pages/CBMMonitoring";
import Inspection from "./pages/Inspection";
import Auditing from "./pages/Auditing";
import Blog from "./pages/Blog";
import VerificationCertification from "./pages/VerificationCertification";
import InnovationRD from "./pages/InnovationRD";
import ServiceDetail from "./pages/ServiceDetail";
import IndustriesDetail from "./pages/IndustriesDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TranslationProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <RouteScrollTop />
            <Routes>
              <Route path="/" element={<Navigate to="/services" replace />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/testing" element={<TestingInspection />} />
              <Route path="/services/cbm" element={<CBMMonitoring />} />
              <Route path="/services/inspection" element={<Inspection />} />
              <Route path="/services/auditing" element={<Auditing />} />
              <Route path="/services/verification-certification" element={<VerificationCertification />} />
              <Route path="/services/innovation-rd" element={<InnovationRD />} />
              {/* Unified detail route for all services */}
              <Route path="/services/:serviceType/:slug" element={<ServiceDetail />} />
              <Route path="/industries" element={<Industries />} />
              <Route path="/industries/:slug" element={<IndustriesDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </TranslationProvider>
  </QueryClientProvider>
);

export default App;
