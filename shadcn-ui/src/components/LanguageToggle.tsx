import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg border border-gray-200">
        <Globe className="h-4 w-4 text-teal" />
        <Button
          variant={language === 'en' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setLanguage('en')}
          className={`px-3 py-1 text-xs rounded-full ${
            language === 'en' 
              ? 'bg-teal text-white' 
              : 'text-gray-600 hover:text-teal'
          }`}
        >
          EN
        </Button>
        <Button
          variant={language === 'ko' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setLanguage('ko')}
          className={`px-3 py-1 text-xs rounded-full ${
            language === 'ko' 
              ? 'bg-teal text-white' 
              : 'text-gray-600 hover:text-teal'
          }`}
        >
          한국어
        </Button>
      </div>
    </div>
  );
}
