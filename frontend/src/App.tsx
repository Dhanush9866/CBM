
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "@/components/Layout/Layout";
import Services from "./pages/Services";
import Industries from "./pages/Industries";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import TestingInspection from "./pages/TestingInspection";
import TestingDetail from "./pages/TestingDetail";
import CBMMonitoring from "./pages/CBMMonitoring";
import CBMDetail from "./pages/CBMDetail";
import Inspection from "./pages/Inspection";
import InspectionDetail from "./pages/InspectionDetail";
import Auditing from "./pages/Auditing";
import AuditingDetail from "./pages/AuditingDetail";
import VerificationCertification from "./pages/VerificationCertification";
import VerificationCertificationDetail from "./pages/VerificationCertificationDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/services" replace />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/testing" element={<TestingInspection />} />
            <Route path="/services/testing/:slug" element={<TestingDetail />} />
            <Route path="/services/cbm" element={<CBMMonitoring />} />
            <Route path="/services/cbm/:slug" element={<CBMDetail />} />
            <Route path="/services/inspection" element={<Inspection />} />
            <Route path="/services/inspection/:slug" element={<InspectionDetail />} />
            <Route path="/services/auditing" element={<Auditing />} />
            <Route path="/services/auditing/:slug" element={<AuditingDetail />} />
            <Route path="/services/verification-certification" element={<VerificationCertification />} />
            <Route path="/services/verification-certification/:slug" element={<VerificationCertificationDetail />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
