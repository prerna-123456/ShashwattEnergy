import "./global.css";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Residential from "./pages/Residential";
import Commercial from "./pages/Commercial";
import PMSuryaGharYojana from "./pages/PMSuryaGharYojana";
import AboutUs from "./pages/AboutUs";
import Projects from "./pages/Projects";
import FAQ from "./pages/FAQ";
import Calculator from "./pages/Calcalutor";
import ContactUs from "./pages/ContactUs";
import Blog from "./pages/Blog";

const queryClient = new QueryClient();
const whatsappNumber = "917829575683";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/residential" element={<Residential />} />
          <Route path="/commercial" element={<Commercial />} />
          <Route path="/pm-surya-ghar" element={<PMSuryaGharYojana />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/contact" element={<ContactUs />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_28px_rgba(37,211,102,0.35)] transition duration-300 hover:-translate-y-1 hover:bg-[#1EBE5D] hover:shadow-[0_16px_34px_rgba(37,211,102,0.45)] focus:outline-none focus:ring-4 focus:ring-[#25D366]/30 md:bottom-8 md:right-8"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 32 32"
            className="h-7 w-7"
            fill="currentColor"
          >
            <path d="M16.04 3.5c-6.88 0-12.47 5.54-12.47 12.36 0 2.18.58 4.31 1.68 6.18L3.5 28.5l6.66-1.73a12.6 12.6 0 0 0 5.88 1.47c6.88 0 12.47-5.54 12.47-12.36S22.92 3.5 16.04 3.5Zm0 22.64c-1.86 0-3.68-.5-5.27-1.45l-.38-.23-3.95 1.03 1.05-3.8-.25-.39a10.1 10.1 0 0 1-1.56-5.43c0-5.66 4.65-10.27 10.36-10.27S26.4 10.2 26.4 15.86 21.75 26.14 16.04 26.14Zm5.68-7.68c-.31-.15-1.84-.9-2.12-1-.28-.1-.49-.15-.7.15-.2.3-.8 1-.98 1.2-.18.2-.36.22-.67.07-.31-.15-1.3-.48-2.48-1.52-.92-.81-1.54-1.82-1.72-2.12-.18-.3-.02-.47.14-.62.14-.14.31-.36.46-.54.15-.18.2-.3.31-.5.1-.2.05-.38-.03-.54-.08-.15-.7-1.67-.95-2.29-.25-.6-.51-.52-.7-.53h-.6c-.2 0-.54.08-.82.38-.28.3-1.08 1.05-1.08 2.56 0 1.51 1.1 2.97 1.26 3.17.15.2 2.17 3.29 5.25 4.61.73.31 1.31.5 1.75.64.74.23 1.41.2 1.94.12.59-.09 1.84-.74 2.1-1.46.26-.72.26-1.34.18-1.46-.08-.13-.28-.2-.59-.35Z" />
          </svg>
        </a>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
