import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ko';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation data
const translations = {
  en: {
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error occurred',
    'common.tryAgain': 'Try Again',
    'common.startOver': 'Start Over',
    
    // Header
    'header.title': 'TravelMatch',
    'header.subtitle': '✈️ Discover your perfect travel destination and let wanderlust guide your next adventure! 🌍',
    'header.findDestination': 'Find Your Dream Destination',
    'header.startJourney': 'Start Your Journey',
    'header.poweredBy': '✨ Powered by {count} incredible cities worldwide ✨',
    
    // Quiz
    'quiz.title': 'Travel Quiz - Find Your Perfect Destination | TravelMatch',
    'quiz.description': 'Take our personalized travel quiz to discover destinations that match your travel style, budget, and preferences. Find your perfect adventure!',
    'quiz.discoverSoul': 'Discover Your Travel Soul',
    'quiz.question': 'Question {current} of {total}',
    'quiz.complete': '{percent}% complete',
    'quiz.previous': 'Previous',
    'quiz.nextQuestion': 'Next Question',
    'quiz.discoverDestinations': 'Discover My Destinations! ✨',
    'quiz.selectOption': 'Please select an option to continue',
    'quiz.greatChoice': 'Great choice! Ready to continue?',
    
    // Results
    'results.title': 'Your Travel Recommendations | TravelMatch',
    'results.description': 'Discover personalized travel destination recommendations based on your quiz results. Find your next perfect adventure!',
    'results.dreamDestinations': 'Your Dream Destinations Await!',
    'results.perfectPlaces': '🎉 We found the perfect places that match your wanderlust! 🌟',
    'results.packBags': 'Pack your bags and get ready for an unforgettable adventure!',
    'results.whyPerfect': 'Why These Destinations Are Perfect For You',
    'results.perfectMatch': '#1 Perfect Match - {score}% 🌟',
    'results.moreAdventures': '🌟 More Amazing Adventures',
    'results.callingYourName': 'These destinations are also calling your name!',
    'results.discoverMore': '✨ Discover More Adventures ✨',
    'results.nextGetaway': 'Ready to explore different destinations? Let\'s find your next perfect getaway!',
    
    // City specific
    'city.bestTime': '🗓️ Best Time to Visit',
    'city.budget': '💰 Budget Range',
    'city.climate': '🌡️ Climate',
    'city.attractions': '📸 Must-See Attractions',
    'city.lifestyle': '✨ Lifestyle & Vibes',
    'city.travelStyles': '🎯 Perfect Travel Styles',
    'city.perfectBecause': '🌟 Perfect because',
    
    // Language
    'language.english': 'English',
    'language.korean': '한국어',
    'language.selectLanguage': 'Select Language',
  },
  ko: {
    // Common
    'common.loading': '로딩 중...',
    'common.error': '오류가 발생했습니다',
    'common.tryAgain': '다시 시도',
    'common.startOver': '처음부터 시작',
    
    // Header
    'header.title': '트래블매치',
    'header.subtitle': '✈️ 당신의 완벽한 여행지를 찾아보세요! 🌍',
    'header.findDestination': '꿈의 여행지 찾기',
    'header.startJourney': '여행 시작하기',
    'header.poweredBy': '✨ 전 세계 {count}개 놀라운 도시들과 함께 ✨',
    
    // Quiz
    'quiz.title': '여행 퀴즈 - 완벽한 여행지 찾기 | 트래블매치',
    'quiz.description': '개인 맞춤형 여행 퀴즈를 통해 당신의 여행 스타일, 예산, 선호도에 맞는 목적지를 찾아보세요. 완벽한 모험을 시작하세요!',
    'quiz.discoverSoul': '당신의 여행 영혼을 발견하세요',
    'quiz.question': '{total}개 중 {current}번째 질문',
    'quiz.complete': '{percent}% 완료',
    'quiz.previous': '이전',
    'quiz.nextQuestion': '다음 질문',
    'quiz.discoverDestinations': '내 여행지 찾기! ✨',
    'quiz.selectOption': '계속하려면 옵션을 선택해주세요',
    'quiz.greatChoice': '좋은 선택이에요! 계속할까요?',
    
    // Results
    'results.title': '당신의 여행 추천 | 트래블매치',
    'results.description': '퀴즈 결과를 바탕으로 한 개인 맞춤형 여행지 추천을 확인하세요. 다음 완벽한 모험을 찾아보세요!',
    'results.dreamDestinations': '당신의 꿈의 여행지가 기다리고 있어요!',
    'results.perfectPlaces': '🎉 당신의 여행 열정에 완벽하게 맞는 곳들을 찾았어요! 🌟',
    'results.packBags': '가방을 챙기고 잊을 수 없는 모험을 준비하세요!',
    'results.whyPerfect': '이 여행지들이 당신에게 완벽한 이유',
    'results.perfectMatch': '#1 완벽한 매치 - {score}% 🌟',
    'results.moreAdventures': '🌟 더 많은 놀라운 모험들',
    'results.callingYourName': '이 여행지들도 당신을 부르고 있어요!',
    'results.discoverMore': '✨ 더 많은 모험 발견하기 ✨',
    'results.nextGetaway': '다른 여행지도 탐험해보고 싶으신가요? 다음 완벽한 여행지를 찾아봅시다!',
    
    // City specific
    'city.bestTime': '🗓️ 최적 방문 시기',
    'city.budget': '💰 예산 범위',
    'city.climate': '🌡️ 기후',
    'city.attractions': '📸 필수 관광지',
    'city.lifestyle': '✨ 라이프스타일 & 분위기',
    'city.travelStyles': '🎯 완벽한 여행 스타일',
    'city.perfectBecause': '🌟 완벽한 이유',
    
    // Language
    'language.english': 'English',
    'language.korean': '한국어',
    'language.selectLanguage': '언어 선택',
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('travelmatch-language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ko')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('travelmatch-language', lang);
  };

  const t = (key: string, params?: Record<string, string | number>) => {
    let translation = translations[language][key] || translations.en[key] || key;
    
    // Replace parameters in translation
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        translation = translation.replace(`{${paramKey}}`, String(paramValue));
      });
    }
    
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
