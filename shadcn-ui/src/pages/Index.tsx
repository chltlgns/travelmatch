import React, { useState } from 'react';
import { MultiStepSurvey } from '@/components/MultiStepSurvey';
import { EnhancedRecommendationResults } from '@/components/EnhancedRecommendationResults';
import { useAdvancedRecommendationEngine } from '@/hooks/useAdvancedRecommendationEngine';
import { UserSurveyAnswers, RecommendationResult, UserTravelProfile } from '@/types/travel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, MapPin, Compass, Plane, Heart } from 'lucide-react';

export default function Index() {
  const [currentStep, setCurrentStep] = useState<'survey' | 'results'>('survey');
  const [recommendations, setRecommendations] = useState<RecommendationResult[]>([]);
  const [travelProfile, setTravelProfile] = useState<UserTravelProfile | null>(null);
  
  const { travelData, loading, error, calculateAdvancedRecommendations, generateTravelProfile } = useAdvancedRecommendationEngine();

  const handleSurveySubmit = (answers: UserSurveyAnswers) => {
    const profile = generateTravelProfile(answers);
    const results = calculateAdvancedRecommendations(answers);
    setTravelProfile(profile);
    setRecommendations(results);
    setCurrentStep('results');
  };

  const handleStartOver = () => {
    setCurrentStep('survey');
    setRecommendations([]);
    setTravelProfile(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen wanderlust-bg flex items-center justify-center px-4">
        <Card className="w-full max-w-md pastel-card fade-in">
          <CardContent className="flex flex-col items-center justify-center p-6 sm:p-12 mobile-spacing">
            <div className="relative mb-6">
              <Plane className="h-8 w-8 sm:h-12 sm:w-12 text-teal animate-bounce mobile-icon-large" />
              <div className="absolute -top-2 -right-2">
                <div className="w-4 h-4 sm:w-6 sm:h-6 bg-coral rounded-full animate-ping"></div>
              </div>
            </div>
            <p className="text-lg sm:text-xl font-semibold text-gray-700 mb-2 text-center mobile-text-fix">Discovering Amazing Places...</p>
            <p className="text-sm text-gray-500 text-center mobile-text-fix">Finding the perfect destinations just for you</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen wanderlust-bg flex items-center justify-center px-4">
        <Card className="w-full max-w-md pastel-card fade-in">
          <CardHeader className="mobile-spacing">
            <CardTitle className="text-center text-coral flex items-center justify-center gap-2 mobile-text-fix">
              <Heart className="h-5 w-5 sm:h-6 sm:w-6 mobile-icon" />
              <span className="mobile-subtitle">Oops! Something went wrong</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center mobile-spacing">
            <p className="text-gray-600 mb-4 mobile-text-fix">{error}</p>
            <p className="text-sm text-gray-500 mobile-text-fix">Don't worry, your adventure awaits! Please try again.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen wanderlust-bg">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-16 fade-in">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="relative">
              <Compass className="h-12 w-12 sm:h-16 sm:w-16 text-teal animate-spin mobile-icon-large" style={{ animationDuration: '8s' }} />
              <Plane className="h-4 w-4 sm:h-6 sm:w-6 text-coral absolute -top-1 -right-1 sm:-top-2 sm:-right-2 mobile-icon" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-teal mobile-title text-overflow-safe">
              TravelMatch
            </h1>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-medium leading-relaxed mobile-text-fix px-4">
            ✈️ Discover your perfect travel destination and let wanderlust guide your next adventure! 🌍
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-6 text-gray-600">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-coral mobile-icon" />
              <span className="font-medium text-sm sm:text-base mobile-text-fix">Find Your Dream Destination</span>
            </div>
            <div className="flex items-center gap-2">
              <Plane className="h-4 w-4 sm:h-5 sm:w-5 text-teal mobile-icon" />
              <span className="font-medium text-sm sm:text-base mobile-text-fix">Start Your Journey</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="slide-in-up">
          {currentStep === 'survey' && travelData && (
            <MultiStepSurvey onComplete={handleSurveySubmit} />
          )}

          {currentStep === 'results' && travelProfile && (
            <EnhancedRecommendationResults
              recommendations={recommendations}
              travelProfile={travelProfile}
              onStartOver={handleStartOver}
            />
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 sm:mt-20 pb-6 sm:pb-12 fade-in">
          <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/60 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 text-gray-600 shadow-lg mobile-text-fix">
            <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-teal mobile-icon" />
            <span className="font-medium text-sm sm:text-base">
              ✨ Powered by {travelData?.metadata.total_destinations} incredible cities worldwide ✨
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}