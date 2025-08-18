import { useState, useEffect } from 'react';
import { Destination, TravelData, UserPreferences, RecommendationResult } from '@/types/travel';

export function useRecommendationEngine() {
  const [travelData, setTravelData] = useState<TravelData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTravelData = async () => {
      try {
        const response = await fetch('/travel_destinations_data.json');
        if (!response.ok) {
          throw new Error('Failed to load travel data');
        }
        const data: TravelData = await response.json();
        setTravelData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadTravelData();
  }, []);

  const calculateRecommendations = (preferences: UserPreferences): RecommendationResult[] => {
    if (!travelData) return [];

    const recommendations: RecommendationResult[] = travelData.destinations.map(destination => {
      let score = 0;
      const matchingFactors: string[] = [];

      // Travel styles matching (40% weight)
      const styleMatches = destination.travel_styles.filter(style => 
        preferences.travelStyles.includes(style)
      );
      if (styleMatches.length > 0) {
        score += (styleMatches.length / preferences.travelStyles.length) * 40;
        matchingFactors.push(`${styleMatches.length} matching travel style${styleMatches.length > 1 ? 's' : ''}`);
      }

      // Cultural region matching (25% weight)
      if (preferences.culturalRegions.length === 0 || 
          preferences.culturalRegions.includes(destination.cultural_region)) {
        score += 25;
        matchingFactors.push('Cultural region preference');
      }

      // Budget matching (20% weight)
      if (!preferences.budgetRange || destination.budget_range === preferences.budgetRange) {
        score += 20;
        matchingFactors.push('Budget range fit');
      } else {
        // Partial scoring for budget compatibility
        const budgetOrder = ['budget-friendly', 'moderate', 'expensive'];
        const userBudgetIndex = budgetOrder.findIndex(b => preferences.budgetRange.includes(b));
        const destBudgetIndex = budgetOrder.findIndex(b => destination.budget_range.includes(b));
        
        if (userBudgetIndex !== -1 && destBudgetIndex !== -1) {
          const difference = Math.abs(userBudgetIndex - destBudgetIndex);
          if (difference <= 1) {
            score += 10;
            matchingFactors.push('Compatible budget range');
          }
        }
      }

      // Climate matching (10% weight)
      if (!preferences.climatePreference || destination.climate === preferences.climatePreference) {
        score += 10;
        matchingFactors.push('Climate preference');
      }

      // Season matching (5% weight)
      if (!preferences.seasonPreference || 
          destination.best_season.toLowerCase().includes(preferences.seasonPreference.toLowerCase()) ||
          destination.best_season.includes('year-round')) {
        score += 5;
        matchingFactors.push('Season preference');
      }

      // Bonus for high ratings
      if (destination.rating >= 4.7) {
        score += 5;
        matchingFactors.push('Highly rated destination');
      }

      // Activity-based lifestyle matching
      const activityKeywords = {
        'Museums & Art Galleries': ['art', 'cultural', 'artistic', 'museum'],
        'Historical Sites': ['historical', 'heritage', 'ancient', 'traditional'],
        'Beach Activities': ['beach', 'coastal', 'island', 'tropical'],
        'Adventure Sports': ['adventure', 'outdoor', 'nature', 'sports'],
        'Fine Dining': ['culinary', 'food', 'dining', 'cuisine'],
        'Shopping': ['shopping', 'market', 'bazaar'],
        'Nightlife': ['nightlife', 'entertainment', 'vibrant'],
        'Nature & Wildlife': ['nature', 'wildlife', 'outdoor'],
        'Photography': ['scenic', 'beautiful', 'landscapes'],
        'Architecture Tours': ['architectural', 'historical', 'heritage']
      };

      preferences.preferredActivities.forEach(activity => {
        const keywords = activityKeywords[activity] || [];
        const hasMatch = keywords.some(keyword => 
          destination.travel_styles.some(style => style.includes(keyword)) ||
          destination.lifestyle_characteristics.some(char => char.includes(keyword)) ||
          destination.key_attractions.some(attr => attr.toLowerCase().includes(keyword))
        );
        
        if (hasMatch) {
          score += 3;
          matchingFactors.push(`${activity} activities available`);
        }
      });

      return {
        destination,
        score: Math.min(score, 100), // Cap at 100%
        matchingFactors
      };
    });

    // Sort by score (descending) and then by rating
    return recommendations
      .sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        return b.destination.rating - a.destination.rating;
      })
      .slice(0, 3); // Return top 3 recommendations
  };

  return {
    travelData,
    loading,
    error,
    calculateRecommendations
  };
}