import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import QuizPage from './pages/Quiz';
import ResultsPage from './pages/Results';
import CityResultPage from './pages/CityResult';

const queryClient = new QueryClient();

function AnalyticsListener() {
  const location = useLocation();

  useEffect(() => {
    const gtag = (window as any).gtag as
      | ((command: string, targetId: string, params?: Record<string, unknown>) => void)
      | undefined;

    if (gtag) {
      gtag('config', 'G-54NMCJNHFS', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <BrowserRouter>
          <AnalyticsListener />
          <LanguageToggle />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/city/:cityName" element={<CityResultPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
