import { useState, useEffect } from 'react';
import { TravelData, UserSurveyAnswers, RecommendationResult, UserTravelProfile, TravelDestination } from '@/types/travel';

export function useAdvancedRecommendationEngine() {
  const [travelData, setTravelData] = useState<TravelData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTravelData = async () => {
      try {
        const response = await fetch('/travel_destinations_data.json');
        const data = await response.json();
        setTravelData(data);
      } catch (err) {
        setError('Failed to load travel data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTravelData();
  }, []);

  const generateTravelProfile = (answers: UserSurveyAnswers): UserTravelProfile => {
    // Analyze answers to determine travel profile
    const styleScores: { [key: string]: number } = {};
    
    // Define travel style mappings based on answers
    const styleMapping: { [key: string]: { [key: string]: number } } = {
      adventure: {
        high_energy: 1.0, extreme: 1.0, moderate: 0.8, road_trip: 0.7, active_transport: 0.8,
        nature: 0.9, eco_conscious: 0.7, skill_building: 0.8
      },
      luxury: {
        ultra_luxury: 1.0, money_no_object: 1.0, luxury_hotel: 0.9, comfort: 0.7,
        not_priority: 0.8, peak: 0.7, ultra_chill: 0.6
      },
      cultural: {
        immersive: 1.0, cultural: 0.9, passionate: 0.8, educational: 0.9, history_buff: 1.0,
        cultural_learning: 1.0, language_adventurous: 0.8
      },
      budget: {
        very_important: 1.0, budget_friendly: 0.9, budget: 0.8, backpacker: 1.0,
        off_season: 0.7, minimal: 0.6
      },
      nature: {
        pure_nature: 1.0, nature_leaning: 0.8, eco_conscious: 0.9, active_transport: 0.7,
        secluded: 0.8, unplugged: 0.9, tech_free: 0.8
      },
      urban: {
        pure_city: 1.0, city_leaning: 0.8, tech_savvy: 0.7, digital_native: 0.6,
        popular: 0.7, mainstream: 0.6
      },
      romantic: {
        partner: 1.0, ultra_chill: 0.8, relaxed: 0.7, dining: 0.8, comfort: 0.7,
        peak: 0.6
      },
      foodie: {
        very_adventurous: 1.0, foodie: 1.0, culinary: 0.9, somewhat: 0.7,
        major_activity: 0.8, markets: 0.8
      },
      wellness: {
        primary_focus: 1.0, wellness: 1.0, important_element: 0.8, relaxation: 0.9,
        ultra_chill: 0.7, early_bird: 0.6
      },
      nightlife: {
        essential: 1.0, nightlife: 1.0, enjoy: 0.8, social: 0.7, friends: 0.6
      }
    };

    // Calculate style scores based on answers
    Object.entries(answers).forEach(([questionId, answerId]) => {
      Object.entries(styleMapping).forEach(([style, mapping]) => {
        if (mapping[answerId]) {
          styleScores[style] = (styleScores[style] || 0) + mapping[answerId];
        }
      });
    });

    // Normalize scores
    const maxScore = Math.max(...Object.values(styleScores));
    const normalizedScores = Object.fromEntries(
      Object.entries(styleScores).map(([style, score]) => [style, score / maxScore])
    );

    // Determine primary and secondary styles
    const sortedStyles = Object.entries(normalizedScores)
      .sort(([, a], [, b]) => b - a)
      .map(([style]) => style);

    const primaryStyle = sortedStyles[0] || 'cultural';
    const secondaryStyles = sortedStyles.slice(1, 4);

    // Generate personality description
    const personalityMap: { [key: string]: { name: string; description: string; characteristics: string[] } } = {
      adventure: {
        name: 'The Thrill Seeker',
        description: 'You crave excitement and new experiences. Mountains, extreme sports, and off-the-beaten-path destinations call to your adventurous spirit.',
        characteristics: ['Adrenaline junkie', 'Nature lover', 'Risk taker', 'Active lifestyle']
      },
      luxury: {
        name: 'The Sophisticate',
        description: 'You appreciate the finer things in life and believe travel should be comfortable and indulgent. Five-star experiences and premium amenities are your standard.',
        characteristics: ['Quality-focused', 'Comfort seeker', 'Appreciates excellence', 'Values service']
      },
      cultural: {
        name: 'The Culture Enthusiast',
        description: 'You travel to learn and immerse yourself in different ways of life. Museums, local traditions, and authentic experiences feed your curious soul.',
        characteristics: ['Intellectually curious', 'Culturally sensitive', 'History lover', 'Learning-focused']
      },
      budget: {
        name: 'The Smart Traveler',
        description: 'You believe amazing experiences don\'t have to break the bank. You\'re resourceful and find joy in discovering hidden gems and local secrets.',
        characteristics: ['Value-conscious', 'Resourceful', 'Locally-minded', 'Practical']
      },
      nature: {
        name: 'The Nature Lover',
        description: 'You find peace and rejuvenation in natural settings. National parks, wildlife, and pristine landscapes are your happy place.',
        characteristics: ['Environmentally conscious', 'Peace seeker', 'Wildlife enthusiast', 'Outdoor lover']
      },
      urban: {
        name: 'The City Explorer',
        description: 'You thrive in the energy of bustling cities. Skylines, street art, diverse neighborhoods, and urban culture energize your spirit.',
        characteristics: ['Energy-driven', 'Culturally diverse', 'Trend-aware', 'Socially connected']
      },
      romantic: {
        name: 'The Romantic',
        description: 'You seek destinations that stir the heart and create intimate moments. Sunset views, cozy cafes, and enchanting atmospheres define your ideal trip.',
        characteristics: ['Emotionally driven', 'Aesthetically minded', 'Intimacy seeker', 'Beauty appreciator']
      },
      foodie: {
        name: 'The Culinary Explorer',
        description: 'Your travels are guided by your taste buds. Street food tours, cooking classes, and local markets are essential parts of your journey.',
        characteristics: ['Taste adventurer', 'Culturally curious', 'Social eater', 'Experience collector']
      },
      wellness: {
        name: 'The Wellness Seeker',
        description: 'Travel is your time to recharge and reconnect with yourself. Spas, yoga retreats, and peaceful environments restore your mind and body.',
        characteristics: ['Health-conscious', 'Mindful', 'Balance seeker', 'Self-care focused']
      },
      nightlife: {
        name: 'The Social Butterfly',
        description: 'You come alive when the sun goes down. Vibrant nightlife, social scenes, and party destinations fuel your social energy.',
        characteristics: ['Socially energetic', 'Fun-loving', 'Extroverted', 'Culture mixer']
      }
    };

    const personalityData = personalityMap[primaryStyle] || personalityMap.cultural;

    // Determine preferred regions based on answers
    const preferredRegions: string[] = [];
    
    // Budget and climate preferences influence regions
    const budgetAnswer = answers.budget_priority;
    const climateAnswer = answers.weather_preference;
    
    if (budgetAnswer === 'very_important' || budgetAnswer === 'somewhat') {
      preferredRegions.push('Southeast Asian', 'South American', 'Eastern European');
    }
    if (budgetAnswer === 'not_much' || budgetAnswer === 'money_no_object') {
      preferredRegions.push('Western European', 'North American', 'Scandinavian');
    }
    
    if (climateAnswer === 'hot_sunny') {
      preferredRegions.push('Caribbean', 'Southeast Asian', 'Pacific Islander');
    }
    if (climateAnswer === 'cool_crisp' || climateAnswer === 'cold_snowy') {
      preferredRegions.push('Nordic', 'Scandinavian', 'Central European');
    }

    return {
      primaryStyle,
      secondaryStyles,
      travelPersonality: personalityData.name,
      description: personalityData.description,
      characteristics: personalityData.characteristics,
      preferredRegions: preferredRegions.slice(0, 3),
      budgetRange: answers.budget_priority || 'moderate',
      climatePreference: answers.weather_preference || 'temperate',
      seasonPreference: answers.seasonal_preference || 'flexible'
    };
  };

  const calculateAdvancedRecommendations = (answers: UserSurveyAnswers): RecommendationResult[] => {
    if (!travelData) return [];

    const profile = generateTravelProfile(answers);
    
    const scoredDestinations = travelData.destinations.map(destination => {
      let score = 0;
      const matchingFactors: string[] = [];
      const personalityAlignment: string[] = [];

      // Style matching (40% of score)
      const styleMatches = destination.travel_styles.filter(style => 
        [profile.primaryStyle, ...profile.secondaryStyles].includes(style)
      ).length;
      const styleScore = (styleMatches / Math.max(destination.travel_styles.length, 1)) * 40;
      score += styleScore;
      
      if (styleMatches > 0) {
        matchingFactors.push(`${styleMatches} matching travel styles`);
      }

      // Budget matching (20% of score)
      const budgetCompatibility = getBudgetCompatibility(answers.budget_priority, destination.budget_range);
      score += budgetCompatibility * 20;
      
      if (budgetCompatibility > 0.7) {
        matchingFactors.push('Perfect budget match');
      }

      // Climate matching (15% of score)
      const climateCompatibility = getClimateCompatibility(answers.weather_preference, destination.climate);
      score += climateCompatibility * 15;
      
      if (climateCompatibility > 0.8) {
        matchingFactors.push('Ideal climate');
      }

      // Activity preferences (15% of score)
      const activityScore = getActivityCompatibility(answers, destination);
      score += activityScore * 15;
      
      if (activityScore > 0.7) {
        matchingFactors.push('Great activity options');
      }

      // Cultural preferences (10% of score)
      const culturalScore = getCulturalCompatibility(answers, destination);
      score += culturalScore * 10;
      
      if (culturalScore > 0.8) {
        matchingFactors.push('Rich cultural experiences');
      }

      // Personality alignment
      if (destination.travel_styles.includes(profile.primaryStyle)) {
        personalityAlignment.push(`Perfect for ${profile.travelPersonality}`);
      }
      
      profile.characteristics.forEach(characteristic => {
        if (destination.lifestyle_characteristics.some(lifestyle => 
          lifestyle.toLowerCase().includes(characteristic.toLowerCase().split(' ')[0])
        )) {
          personalityAlignment.push(`Matches your ${characteristic.toLowerCase()} nature`);
        }
      });

      return {
        destination,
        score: Math.min(score, 100),
        matchingFactors: matchingFactors.slice(0, 4),
        personalityAlignment: personalityAlignment.slice(0, 3)
      };
    });

    return scoredDestinations
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  };

  // Helper functions for compatibility scoring
  const getBudgetCompatibility = (userBudget: string, destinationBudget: string): number => {
    const budgetMap: { [key: string]: number } = {
      'very_important': 1,
      'somewhat': 2,
      'not_much': 3,
      'money_no_object': 4
    };
    
    const destBudgetMap: { [key: string]: number } = {
      'budget-friendly': 1,
      'moderate': 2,
      'expensive': 3,
      'budget-friendly to luxury': 2.5,
      'moderate to expensive': 2.5
    };
    
    const userLevel = budgetMap[userBudget] || 2;
    const destLevel = destBudgetMap[destinationBudget] || 2;
    
    return Math.max(0, 1 - Math.abs(userLevel - destLevel) / 3);
  };

  const getClimateCompatibility = (userClimate: string, destinationClimate: string): number => {
    const climateMap: { [key: string]: string[] } = {
      'hot_sunny': ['tropical', 'desert', 'subtropical'],
      'warm_pleasant': ['temperate', 'Mediterranean', 'temperate oceanic'],
      'cool_crisp': ['temperate continental', 'oceanic', 'temperate'],
      'cold_snowy': ['subpolar oceanic', 'continental', 'subtropical highland']
    };
    
    const preferredClimates = climateMap[userClimate] || [];
    return preferredClimates.includes(destinationClimate) ? 1 : 0.5;
  };

  const getActivityCompatibility = (answers: UserSurveyAnswers, destination: TravelDestination): number => {
    let compatibility = 0;
    let factors = 0;

    // Energy level
    const energyLevel = answers.activity_energy;
    if (energyLevel === 'high_energy' && destination.travel_styles.includes('adventure')) {
      compatibility += 0.3;
    }
    if (energyLevel === 'relaxed' && destination.travel_styles.includes('resort destination')) {
      compatibility += 0.3;
    }
    factors++;

    // Adventure level
    const adventureLevel = answers.adventure_level;
    if (adventureLevel === 'extreme' && destination.travel_styles.includes('adventure')) {
      compatibility += 0.4;
    }
    if (adventureLevel === 'comfort' && destination.travel_styles.includes('cultural')) {
      compatibility += 0.3;
    }
    factors++;

    return factors > 0 ? compatibility / factors : 0.5;
  };

  const getCulturalCompatibility = (answers: UserSurveyAnswers, destination: TravelDestination): number => {
    let compatibility = 0;
    
    const culturalImmersion = answers.cultural_immersion;
    if (culturalImmersion === 'essential' && destination.travel_styles.includes('cultural')) {
      compatibility += 0.5;
    }
    if (culturalImmersion === 'not_priority' && destination.travel_styles.includes('resort destination')) {
      compatibility += 0.4;
    }
    
    const historyInterest = answers.history_culture;
    if (historyInterest === 'passionate' && destination.travel_styles.includes('historical')) {
      compatibility += 0.5;
    }
    
    return compatibility;
  };

  return {
    travelData,
    loading,
    error,
    calculateAdvancedRecommendations,
    generateTravelProfile
  };
}