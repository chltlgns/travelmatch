import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MultiStepSurvey } from '@/components/MultiStepSurvey';
import { SEOHead } from '@/components/SEOHead';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { UserSurveyAnswers } from '@/types/travel';
import { useAdvancedRecommendationEngine } from '@/hooks/useAdvancedRecommendationEngine';

export default function QuizPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { loading } = useAdvancedRecommendationEngine();

  const encodeAnswers = (answers: UserSurveyAnswers): string => {
    const json = JSON.stringify(answers);
    const base64 = btoa(unescape(encodeURIComponent(json)));
    return encodeURIComponent(base64);
  };

  const handleComplete = (answers: UserSurveyAnswers) => {
    // 엔진은 /results에서 다시 계산하므로 여기서는 답변만 전달
    const encoded = encodeAnswers(answers);
    navigate(`/results?a=${encoded}`);
  };

  return (
    <>
      <SEOHead 
        title={t('quiz.title')}
        description={t('quiz.description')}
        canonical="https://www.travelmatch.xyz/quiz"
      />
      <div className="min-h-screen wanderlust-bg flex items-center justify-center px-4 py-10">
        <Card className="w-full max-w-3xl pastel-card fade-in">
          <CardHeader>
            <CardTitle className="text-center text-teal">{t('quiz.discoverSoul')}</CardTitle>
          </CardHeader>
          <CardContent>
            <MultiStepSurvey onComplete={handleComplete} />
            {loading && (
              <div className="text-center text-gray-500 mt-3 text-sm">{t('common.loading')}</div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}


