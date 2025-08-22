import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EnhancedRecommendationResults } from '@/components/EnhancedRecommendationResults';
import { SEOHead } from '@/components/SEOHead';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAdvancedRecommendationEngine } from '@/hooks/useAdvancedRecommendationEngine';
import { UserSurveyAnswers } from '@/types/travel';

function decodeAnswers(param: string | null): UserSurveyAnswers | null {
  if (!param) return null;
  try {
    const json = decodeURIComponent(atob(param));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export default function ResultsPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { calculateAdvancedRecommendations, generateTravelProfile, loading, error } = useAdvancedRecommendationEngine();

  const answers = decodeAnswers(params.get('a'));

  if (!answers) {
    return (
      <div className="min-h-screen wanderlust-bg flex items-center justify-center px-4 py-10">
        <Card className="w-full max-w-xl pastel-card fade-in">
          <CardHeader>
            <CardTitle className="text-center text-coral">{t('common.error')}</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-gray-600">
            <p className="mb-4">Please complete the quiz first.</p>
            <div className="mt-4">
              <a className="text-teal underline" href="/quiz">Start Quiz</a>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen wanderlust-bg flex items-center justify-center px-4 py-10">
        <div className="text-gray-600">{t('common.loading')}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen wanderlust-bg flex items-center justify-center px-4 py-10">
        <div className="text-coral">{t('common.error')}</div>
      </div>
    );
  }

  const travelProfile = generateTravelProfile(answers);
  const recommendations = calculateAdvancedRecommendations(answers);

  const handleStartOver = () => {
    navigate('/quiz');
  };

  return (
    <>
      <SEOHead 
        title={t('results.title')}
        description={t('results.description')}
        canonical="https://www.travelmatch.xyz/results"
      />
      <div className="min-h-screen wanderlust-bg px-4 py-10">
        <EnhancedRecommendationResults
          recommendations={recommendations}
          travelProfile={travelProfile}
          onStartOver={handleStartOver}
        />
      </div>
    </>
  );
}


