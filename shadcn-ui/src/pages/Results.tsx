import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EnhancedRecommendationResults } from '@/components/EnhancedRecommendationResults';
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
  const { calculateAdvancedRecommendations, generateTravelProfile, loading, error } = useAdvancedRecommendationEngine();

  const answers = decodeAnswers(params.get('a'));

  if (!answers) {
    return (
      <div className="min-h-screen wanderlust-bg flex items-center justify-center px-4 py-10">
        <Card className="w-full max-w-xl pastel-card fade-in">
          <CardHeader>
            <CardTitle className="text-center text-coral">결과 데이터를 찾을 수 없어요</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-gray-600">
            퀴즈를 먼저 완료해주세요.
            <div className="mt-4">
              <a className="text-teal underline" href="/quiz">퀴즈 시작하기</a>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen wanderlust-bg flex items-center justify-center px-4 py-10">
        <div className="text-gray-600">Loading recommendations...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen wanderlust-bg flex items-center justify-center px-4 py-10">
        <div className="text-coral">데이터 로딩 중 오류가 발생했습니다.</div>
      </div>
    );
  }

  const travelProfile = generateTravelProfile(answers);
  const recommendations = calculateAdvancedRecommendations(answers);

  const handleStartOver = () => {
    navigate('/quiz');
  };

  return (
    <div className="min-h-screen wanderlust-bg px-4 py-10">
      <EnhancedRecommendationResults
        recommendations={recommendations}
        travelProfile={travelProfile}
        onStartOver={handleStartOver}
      />
    </div>
  );
}


