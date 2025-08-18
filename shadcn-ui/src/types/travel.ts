export interface TravelDestination {
  city: string;
  country: string;
  cultural_region: string;
  travel_styles: string[];
  rating: number;
  key_attractions: string[];
  lifestyle_characteristics: string[];
  climate: string;
  best_season: string;
  budget_range: string;
  image_url: string;
}

export interface TravelData {
  destinations: TravelDestination[];
  metadata: {
    total_destinations: number;
    travel_styles: string[];
    cultural_regions: string[];
    budget_ranges: string[];
  };
}

export interface SurveyQuestion {
  id: string;
  question: string;
  emoji: string;
  category: string;
  options: SurveyOption[];
}

export interface SurveyOption {
  id: string;
  text: string;
  emoji: string;
  value: string;
  weight: number;
}

export interface UserSurveyAnswers {
  [questionId: string]: string;
}

export interface UserTravelProfile {
  primaryStyle: string;
  secondaryStyles: string[];
  travelPersonality: string;
  description: string;
  characteristics: string[];
  preferredRegions: string[];
  budgetRange: string;
  climatePreference: string;
  seasonPreference: string;
}

export interface RecommendationResult {
  destination: TravelDestination;
  score: number;
  matchingFactors: string[];
  personalityAlignment: string[];
}