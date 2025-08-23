
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Team from "./pages/Team";
import TeamMember from "./pages/TeamMember";
import Contact from "./pages/Contact";
import Donate from "./pages/Donate";
import Blog from "./pages/Blog";
import BlogPostDetail from "./pages/BlogPostDetail";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Programs from "./pages/Programs";
import EducationInitiatives from "./pages/EducationInitiatives";
import HealthcareInitiatives from "./pages/programs/Healthcare";
import WomenEmpowerment from "./pages/programs/WomenEmpowerment";
import DigitalLiteracy from "./pages/programs/DigitalLiteracy";
import FinancialInclusion from "./pages/programs/FinancialInclusion";
import EnvironmentalConservation from "./pages/programs/Environmental";
import Events from "./pages/Events";
import SuccessStories from "./pages/SuccessStories";
import GetInvolved from "./pages/GetInvolved";
import Gallery from "./pages/Gallery";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/about/team" element={<Team />} />
              <Route path="/team/:name" element={<TeamMember />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/get-involved" element={<GetInvolved />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/programs/education" element={<EducationInitiatives />} />
              <Route path="/programs/healthcare" element={<HealthcareInitiatives />} />
              <Route path="/programs/women-empowerment" element={<WomenEmpowerment />} />
              <Route path="/programs/digital-literacy" element={<DigitalLiteracy />} />
              <Route path="/programs/financial-inclusion" element={<FinancialInclusion />} />
              <Route path="/programs/environmental" element={<EnvironmentalConservation />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPostDetail />} />
              <Route path="/resources/events" element={<Events />} />
              <Route path="/resources/success-stories" element={<SuccessStories />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
