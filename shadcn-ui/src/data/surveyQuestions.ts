import { SurveyQuestion } from '@/types/travel';

export const surveyQuestions: SurveyQuestion[] = [
  {
    id: 'trip_frequency',
    question: 'How often do you travel for leisure?',
    emoji: '✈️',
    category: 'travel_habits',
    options: [
      { id: 'frequent', text: 'Multiple times per year', emoji: '🌍', value: 'frequent', weight: 1.0 },
      { id: 'regular', text: 'Once or twice per year', emoji: '🗓️', value: 'regular', weight: 0.8 },
      { id: 'occasional', text: 'Every few years', emoji: '⏰', value: 'occasional', weight: 0.6 },
      { id: 'rare', text: 'Very rarely', emoji: '🏠', value: 'rare', weight: 0.4 }
    ]
  },
  {
    id: 'trip_duration',
    question: 'What is your ideal trip length?',
    emoji: '📅',
    category: 'travel_preferences',
    options: [
      { id: 'weekend', text: 'Weekend getaways (2-3 days)', emoji: '🎒', value: 'short', weight: 0.6 },
      { id: 'week', text: 'One week', emoji: '📆', value: 'medium', weight: 0.8 },
      { id: 'extended', text: '2-3 weeks', emoji: '🌴', value: 'long', weight: 1.0 },
      { id: 'nomad', text: 'A month or more', emoji: '🎯', value: 'extended', weight: 1.2 }
    ]
  },
  {
    id: 'budget_priority',
    question: 'How important is budget when choosing a destination?',
    emoji: '💰',
    category: 'financial_preferences',
    options: [
      { id: 'very_important', text: 'Very important - I\'m budget conscious', emoji: '💵', value: 'budget', weight: 1.0 },
      { id: 'somewhat', text: 'Somewhat important', emoji: '⚖️', value: 'mid-range', weight: 0.8 },
      { id: 'not_much', text: 'Not very important', emoji: '💎', value: 'luxury', weight: 0.6 },
      { id: 'money_no_object', text: 'Money is no object', emoji: '👑', value: 'ultra-luxury', weight: 0.4 }
    ]
  },
  {
    id: 'accommodation_style',
    question: 'What type of accommodation do you prefer?',
    emoji: '🏨',
    category: 'travel_preferences',
    options: [
      { id: 'luxury_hotel', text: 'Luxury hotels & resorts', emoji: '🏨', value: 'luxury', weight: 1.0 },
      { id: 'boutique', text: 'Boutique hotels & B&Bs', emoji: '🏡', value: 'boutique', weight: 0.8 },
      { id: 'local_stays', text: 'Local homes & apartments', emoji: '🏠', value: 'local', weight: 0.9 },
      { id: 'budget_friendly', text: 'Hostels & budget options', emoji: '🎒', value: 'budget', weight: 0.7 }
    ]
  },
  {
    id: 'group_composition',
    question: 'Who do you usually travel with?',
    emoji: '👥',
    category: 'travel_habits',
    options: [
      { id: 'solo', text: 'I prefer solo adventures', emoji: '🧳', value: 'solo', weight: 1.0 },
      { id: 'partner', text: 'With my partner/spouse', emoji: '💕', value: 'couple', weight: 0.9 },
      { id: 'friends', text: 'With close friends', emoji: '👫', value: 'friends', weight: 0.8 },
      { id: 'family', text: 'With family members', emoji: '👨‍👩‍👧‍👦', value: 'family', weight: 0.7 }
    ]
  },
  {
    id: 'activity_energy',
    question: 'What energy level describes your ideal trip?',
    emoji: '⚡',
    category: 'activity_preferences',
    options: [
      { id: 'high_energy', text: 'High energy - packed schedule', emoji: '🏃‍♂️', value: 'active', weight: 1.0 },
      { id: 'moderate', text: 'Moderate - balanced activities', emoji: '🚶‍♀️', value: 'moderate', weight: 0.8 },
      { id: 'relaxed', text: 'Relaxed - slow and easy', emoji: '🧘‍♀️', value: 'relaxed', weight: 0.6 },
      { id: 'ultra_chill', text: 'Ultra chill - minimal planning', emoji: '😴', value: 'chill', weight: 0.4 }
    ]
  },
  {
    id: 'cultural_immersion',
    question: 'How important is experiencing local culture?',
    emoji: '🎭',
    category: 'cultural_preferences',
    options: [
      { id: 'essential', text: 'Essential - I want deep immersion', emoji: '🌍', value: 'immersive', weight: 1.0 },
      { id: 'important', text: 'Important - some local experiences', emoji: '🎨', value: 'cultural', weight: 0.8 },
      { id: 'nice_to_have', text: 'Nice to have but not essential', emoji: '📸', value: 'tourist', weight: 0.6 },
      { id: 'not_priority', text: 'Not a priority for me', emoji: '🏖️', value: 'resort', weight: 0.4 }
    ]
  },
  {
    id: 'food_adventure',
    question: 'How adventurous are you with local cuisine?',
    emoji: '🍜',
    category: 'culinary_preferences',
    options: [
      { id: 'very_adventurous', text: 'Very adventurous - try everything!', emoji: '🦂', value: 'foodie', weight: 1.0 },
      { id: 'somewhat', text: 'Somewhat - open to new flavors', emoji: '🍲', value: 'culinary', weight: 0.8 },
      { id: 'cautious', text: 'Cautious - familiar foods preferred', emoji: '🍝', value: 'conservative', weight: 0.6 },
      { id: 'very_cautious', text: 'Very cautious - stick to what I know', emoji: '🍔', value: 'familiar', weight: 0.4 }
    ]
  },
  {
    id: 'nature_vs_city',
    question: 'What environment do you prefer?',
    emoji: '🏙️',
    category: 'environment_preferences',
    options: [
      { id: 'pure_nature', text: 'Pure nature - mountains, forests, wildlife', emoji: '🏔️', value: 'nature', weight: 1.0 },
      { id: 'nature_leaning', text: 'Nature with some city conveniences', emoji: '🌲', value: 'nature-city', weight: 0.8 },
      { id: 'city_leaning', text: 'Cities with access to nature', emoji: '🌆', value: 'city-nature', weight: 0.6 },
      { id: 'pure_city', text: 'Urban environments - cities and culture', emoji: '🏙️', value: 'urban', weight: 0.4 }
    ]
  },
  {
    id: 'weather_preference',
    question: 'What weather makes you happiest?',
    emoji: '☀️',
    category: 'climate_preferences',
    options: [
      { id: 'hot_sunny', text: 'Hot and sunny - beach weather', emoji: '🏝️', value: 'tropical', weight: 1.0 },
      { id: 'warm_pleasant', text: 'Warm and pleasant - spring-like', emoji: '🌸', value: 'temperate', weight: 0.8 },
      { id: 'cool_crisp', text: 'Cool and crisp - autumn vibes', emoji: '🍂', value: 'continental', weight: 0.6 },
      { id: 'cold_snowy', text: 'Cold and snowy - winter wonderland', emoji: '❄️', value: 'cold', weight: 0.4 }
    ]
  },
  {
    id: 'planning_style',
    question: 'How do you prefer to plan your trips?',
    emoji: '📋',
    category: 'travel_habits',
    options: [
      { id: 'detailed_planner', text: 'Detailed planner - every hour scheduled', emoji: '📅', value: 'structured', weight: 0.8 },
      { id: 'loose_plan', text: 'Loose plan - key highlights booked', emoji: '🗺️', value: 'flexible', weight: 1.0 },
      { id: 'minimal_plan', text: 'Minimal planning - figure it out there', emoji: '🎲', value: 'spontaneous', weight: 0.9 },
      { id: 'no_plan', text: 'No planning - completely spontaneous', emoji: '🌪️', value: 'chaotic', weight: 0.7 }
    ]
  },
  {
    id: 'photography_priority',
    question: 'How important is getting great photos?',
    emoji: '📷',
    category: 'activity_preferences',
    options: [
      { id: 'very_important', text: 'Very important - Instagram worthy spots', emoji: '📸', value: 'photogenic', weight: 1.0 },
      { id: 'somewhat', text: 'Somewhat important - nice memories', emoji: '🖼️', value: 'memorable', weight: 0.8 },
      { id: 'not_much', text: 'Not very important - living in moment', emoji: '👁️', value: 'experiential', weight: 0.6 },
      { id: 'not_at_all', text: 'Not important at all', emoji: '🚫', value: 'unplugged', weight: 0.4 }
    ]
  },
  {
    id: 'nightlife_importance',
    question: 'How important is nightlife and entertainment?',
    emoji: '🌃',
    category: 'entertainment_preferences',
    options: [
      { id: 'essential', text: 'Essential - love the party scene', emoji: '🎉', value: 'nightlife', weight: 1.0 },
      { id: 'enjoy', text: 'Enjoy occasional nights out', emoji: '🍸', value: 'social', weight: 0.8 },
      { id: 'casual', text: 'Casual dining and drinks', emoji: '🍷', value: 'dining', weight: 0.6 },
      { id: 'early_bird', text: 'Early to bed, early to rise', emoji: '🌅', value: 'early-bird', weight: 0.4 }
    ]
  },
  {
    id: 'shopping_interest',
    question: 'What role does shopping play in your travels?',
    emoji: '🛍️',
    category: 'activity_preferences',
    options: [
      { id: 'major_activity', text: 'Major activity - love finding unique items', emoji: '💎', value: 'shopping', weight: 1.0 },
      { id: 'enjoy_browsing', text: 'Enjoy browsing local markets', emoji: '🏪', value: 'markets', weight: 0.8 },
      { id: 'minimal', text: 'Minimal - just essentials/souvenirs', emoji: '🎁', value: 'souvenirs', weight: 0.6 },
      { id: 'avoid', text: 'Avoid shopping when traveling', emoji: '🚫', value: 'no-shopping', weight: 0.4 }
    ]
  },
  {
    id: 'adventure_level',
    question: 'What level of adventure appeals to you?',
    emoji: '🎢',
    category: 'adventure_preferences',
    options: [
      { id: 'extreme', text: 'Extreme - skydiving, bungee jumping', emoji: '🪂', value: 'extreme', weight: 1.0 },
      { id: 'moderate', text: 'Moderate - hiking, water sports', emoji: '🥾', value: 'adventure', weight: 0.8 },
      { id: 'mild', text: 'Mild - walking tours, gentle activities', emoji: '🚶‍♀️', value: 'gentle', weight: 0.6 },
      { id: 'comfort', text: 'Comfort zone - prefer safe activities', emoji: '☂️', value: 'safe', weight: 0.4 }
    ]
  },
  {
    id: 'history_culture',
    question: 'How interested are you in history and museums?',
    emoji: '🏛️',
    category: 'cultural_preferences',
    options: [
      { id: 'passionate', text: 'Passionate - could spend days in museums', emoji: '📚', value: 'history-buff', weight: 1.0 },
      { id: 'interested', text: 'Interested - enjoy learning about places', emoji: '🎓', value: 'educational', weight: 0.8 },
      { id: 'casual', text: 'Casual interest - quick visits', emoji: '👀', value: 'casual-culture', weight: 0.6 },
      { id: 'not_interested', text: 'Not interested - prefer other activities', emoji: '🏃‍♂️', value: 'action-focused', weight: 0.4 }
    ]
  },
  {
    id: 'transportation_style',
    question: 'How do you prefer to get around while traveling?',
    emoji: '🚗',
    category: 'logistics_preferences',
    options: [
      { id: 'rental_car', text: 'Rental car - freedom to explore', emoji: '🚙', value: 'road-trip', weight: 1.0 },
      { id: 'public_transport', text: 'Public transport - authentic experience', emoji: '🚇', value: 'local-transport', weight: 0.8 },
      { id: 'walking_biking', text: 'Walking and biking', emoji: '🚲', value: 'active-transport', weight: 0.9 },
      { id: 'organized_tours', text: 'Organized tours and transfers', emoji: '🚌', value: 'guided', weight: 0.6 }
    ]
  },
  {
    id: 'luxury_level',
    question: 'What level of comfort do you prefer?',
    emoji: '🛏️',
    category: 'comfort_preferences',
    options: [
      { id: 'ultra_luxury', text: 'Ultra luxury - 5-star everything', emoji: '👑', value: 'ultra-luxury', weight: 1.0 },
      { id: 'comfortable', text: 'Comfortable - good quality amenities', emoji: '🛎️', value: 'comfort', weight: 0.8 },
      { id: 'basic_comfort', text: 'Basic comfort - clean and functional', emoji: '🛏️', value: 'basic', weight: 0.6 },
      { id: 'backpacker', text: 'Backpacker style - roughing it', emoji: '🎒', value: 'budget', weight: 0.4 }
    ]
  },
  {
    id: 'crowd_tolerance',
    question: 'How do you feel about crowded tourist destinations?',
    emoji: '👫',
    category: 'social_preferences',
    options: [
      { id: 'love_crowds', text: 'Love the energy of popular places', emoji: '🎪', value: 'popular', weight: 0.6 },
      { id: 'tolerate', text: 'Can tolerate for must-see attractions', emoji: '📸', value: 'mainstream', weight: 0.7 },
      { id: 'prefer_quieter', text: 'Prefer quieter, less touristy spots', emoji: '🤫', value: 'off-beaten-path', weight: 0.9 },
      { id: 'avoid_crowds', text: 'Actively avoid crowded places', emoji: '🏞️', value: 'secluded', weight: 1.0 }
    ]
  },
  {
    id: 'seasonal_preference',
    question: 'When do you prefer to travel?',
    emoji: '🗓️',
    category: 'timing_preferences',
    options: [
      { id: 'peak_season', text: 'Peak season - best weather/activities', emoji: '☀️', value: 'peak', weight: 0.8 },
      { id: 'shoulder_season', text: 'Shoulder season - good balance', emoji: '🌤️', value: 'shoulder', weight: 1.0 },
      { id: 'off_season', text: 'Off season - fewer crowds, lower prices', emoji: '🌧️', value: 'off-season', weight: 0.9 },
      { id: 'flexible', text: 'Flexible - depends on destination', emoji: '🔄', value: 'flexible', weight: 0.9 }
    ]
  },
  {
    id: 'language_barrier',
    question: 'How comfortable are you with language barriers?',
    emoji: '🗣️',
    category: 'communication_preferences',
    options: [
      { id: 'love_challenge', text: 'Love the challenge - part of adventure', emoji: '💪', value: 'language-adventurous', weight: 1.0 },
      { id: 'manageable', text: 'Manageable with translation apps', emoji: '📱', value: 'adaptable', weight: 0.8 },
      { id: 'some_english', text: 'Prefer places with some English', emoji: '🇺🇸', value: 'english-friendly', weight: 0.6 },
      { id: 'english_essential', text: 'Need English-speaking destinations', emoji: '🗨️', value: 'english-only', weight: 0.4 }
    ]
  },
  {
    id: 'wellness_focus',
    question: 'How important is wellness and relaxation?',
    emoji: '🧘‍♀️',
    category: 'wellness_preferences',
    options: [
      { id: 'primary_focus', text: 'Primary focus - spa and wellness trips', emoji: '💆‍♀️', value: 'wellness', weight: 1.0 },
      { id: 'important_element', text: 'Important element - some relaxation', emoji: '🛀', value: 'relaxation', weight: 0.8 },
      { id: 'nice_addition', text: 'Nice addition but not essential', emoji: '☮️', value: 'balanced', weight: 0.6 },
      { id: 'not_priority', text: 'Not a priority - prefer active trips', emoji: '🏃‍♂️', value: 'active', weight: 0.4 }
    ]
  },
  {
    id: 'sustainability_concern',
    question: 'How important is sustainable travel to you?',
    emoji: '🌱',
    category: 'values_preferences',
    options: [
      { id: 'very_important', text: 'Very important - eco-friendly choices', emoji: '♻️', value: 'eco-conscious', weight: 1.0 },
      { id: 'consider', text: 'Consider it when making decisions', emoji: '🌍', value: 'environmentally-aware', weight: 0.8 },
      { id: 'somewhat', text: 'Somewhat aware but not deciding factor', emoji: '🌿', value: 'moderately-conscious', weight: 0.6 },
      { id: 'not_priority', text: 'Not a priority in travel decisions', emoji: '🤷‍♂️', value: 'conventional', weight: 0.4 }
    ]
  },
  {
    id: 'technology_usage',
    question: 'How do you use technology while traveling?',
    emoji: '📱',
    category: 'digital_preferences',
    options: [
      { id: 'heavy_user', text: 'Heavy user - apps for everything', emoji: '💻', value: 'digital-native', weight: 0.8 },
      { id: 'moderate', text: 'Moderate use - navigation and booking', emoji: '🗺️', value: 'tech-savvy', weight: 0.9 },
      { id: 'minimal', text: 'Minimal use - prefer offline experiences', emoji: '📴', value: 'unplugged', weight: 1.0 },
      { id: 'digital_detox', text: 'Digital detox - avoid technology', emoji: '🚫', value: 'tech-free', weight: 0.7 }
    ]
  },
  {
    id: 'learning_goals',
    question: 'What do you hope to learn from travel?',
    emoji: '🎓',
    category: 'learning_preferences',
    options: [
      { id: 'new_skills', text: 'New skills - cooking, language, crafts', emoji: '👨‍🍳', value: 'skill-building', weight: 1.0 },
      { id: 'cultural_knowledge', text: 'Cultural knowledge and perspectives', emoji: '🌍', value: 'cultural-learning', weight: 0.9 },
      { id: 'self_discovery', text: 'Self-discovery and personal growth', emoji: '🪞', value: 'self-development', weight: 0.8 },
      { id: 'just_fun', text: 'Nothing specific - just have fun!', emoji: '🎉', value: 'fun-focused', weight: 0.6 }
    ]
  }
];