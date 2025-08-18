import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Heart, Sparkles } from 'lucide-react';
import { surveyQuestions } from '@/data/surveyQuestions';
import { UserSurveyAnswers } from '@/types/travel';

interface MultiStepSurveyProps {
  onComplete: (answers: UserSurveyAnswers) => void;
}

export function MultiStepSurvey({ onComplete }: MultiStepSurveyProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<UserSurveyAnswers>({});
  const [selectedOption, setSelectedOption] = useState<string>('');

  const currentQuestion = surveyQuestions[currentStep];
  const progress = ((currentStep + 1) / surveyQuestions.length) * 100;

  useEffect(() => {
    // Load existing answer for this question
    const existingAnswer = answers[currentQuestion.id];
    setSelectedOption(existingAnswer || '');
  }, [currentStep, currentQuestion.id, answers]);

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionId
    }));
  };

  const handleNext = () => {
    if (currentStep < surveyQuestions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Survey complete
      onComplete(answers);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const isLastQuestion = currentStep === surveyQuestions.length - 1;
  const canProceed = selectedOption !== '';

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 sm:space-y-8 fade-in px-4">
      {/* Progress Header */}
      <div className="text-center space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
          <div className="p-2 bg-teal rounded-full">
            <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-white mobile-icon" />
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-teal mobile-title text-overflow-safe">
            Discover Your Travel Soul
          </h1>
        </div>
        <div className="space-y-2">
          <p className="text-base sm:text-lg text-gray-600 mobile-text-fix">
            Question {currentStep + 1} of {surveyQuestions.length}
          </p>
          <Progress value={progress} className="w-full max-w-xs sm:max-w-md mx-auto h-2 sm:h-3 mobile-progress" />
          <p className="text-xs sm:text-sm text-gray-500 mobile-text-fix">
            {Math.round(progress)}% complete
          </p>
        </div>
      </div>

      {/* Question Card */}
      <Card className="pastel-card travel-card shadow-2xl slide-in-up">
        <CardHeader className="text-center pb-4 sm:pb-8 mobile-spacing">
          <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4" role="img" aria-label="Question icon">{currentQuestion.emoji}</div>
          <CardTitle as="h2" className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-800 leading-relaxed mobile-title text-overflow-safe px-2">
            {currentQuestion.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 md:px-8 pb-4 sm:pb-8 mobile-spacing">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mobile-grid">
            {currentQuestion.options.map((option) => (
              <div
                key={option.id}
                className={`group cursor-pointer transition-all duration-300 ${
                  selectedOption === option.id
                    ? 'transform scale-102 sm:scale-105'
                    : 'hover:scale-101 sm:hover:scale-102'
                }`}
                onClick={() => handleOptionSelect(option.id)}
              >
                <div
                  className={`p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 mobile-spacing ${
                    selectedOption === option.id
                      ? 'border-teal bg-cream shadow-xl'
                      : 'border-gray-200 bg-white hover:border-teal hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-start space-x-2 sm:space-x-3 md:space-x-4">
                    <div className="text-xl sm:text-2xl md:text-3xl flex-shrink-0">{option.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <div
                        className={`text-sm sm:text-base md:text-lg font-semibold mb-1 sm:mb-2 text-overflow-safe mobile-text-fix ${
                          selectedOption === option.id
                            ? 'text-teal'
                            : 'text-gray-700 group-hover:text-teal'
                        }`}
                      >
                        {option.text}
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 transition-all flex-shrink-0 mobile-icon ${
                        selectedOption === option.id
                          ? 'border-teal bg-teal'
                          : 'border-gray-300 group-hover:border-teal'
                      }`}
                    >
                      {selectedOption === option.id && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <Button
          onClick={handlePrevious}
          variant="outline"
          disabled={currentStep === 0}
          className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base md:text-lg border-teal text-teal hover:bg-teal hover:text-white mobile-button order-2 sm:order-1"
        >
          <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mobile-icon" />
          <span className="mobile-text-fix">Previous</span>
        </Button>

        <div className="text-center order-1 sm:order-2">
          <div className="text-xs sm:text-sm text-gray-500 mb-2 mobile-text-fix px-2">
            {canProceed ? 'Great choice! Ready to continue?' : 'Please select an option to continue'}
          </div>
        </div>

        <Button
          onClick={handleNext}
          disabled={!canProceed}
          className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base md:text-lg font-semibold ${
            isLastQuestion ? 'wanderlust-button' : 'adventure-button'
          } text-white rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mobile-button order-3`}
        >
          {isLastQuestion ? (
            <>
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 mobile-icon" />
              <span className="mobile-text-fix">Discover My Destinations! ✨</span>
            </>
          ) : (
            <>
              <span className="mobile-text-fix">Next Question</span>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 mobile-icon" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}