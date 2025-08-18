import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MapPin, Star, Calendar, DollarSign, Thermometer, Plane, Heart, Trophy, Sparkles, Camera } from 'lucide-react';
import { RecommendationResult, UserTravelProfile } from '@/types/travel';
import { TravelStyleAnalysis } from './TravelStyleAnalysis';
import { ShareButton } from './ShareButton';

interface EnhancedRecommendationResultsProps {
  recommendations: RecommendationResult[];
  travelProfile: UserTravelProfile;
  onStartOver: () => void;
}

export function EnhancedRecommendationResults({ 
  recommendations, 
  travelProfile, 
  onStartOver 
}: EnhancedRecommendationResultsProps) {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (recommendations.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4">
        <Card className="pastel-card travel-card fade-in">
          <CardHeader className="text-center mobile-spacing">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-coral rounded-full">
                <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-white mobile-icon-large" />
              </div>
              <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mobile-title text-overflow-safe">Oops! No matches found</CardTitle>
            </div>
            <CardDescription className="text-base sm:text-lg text-gray-600 mobile-text-fix">
              🌟 Don't worry! Let's adjust your preferences to find your perfect adventure destination! ✈️
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center mobile-spacing">
            <Button onClick={onStartOver} className="wanderlust-button text-white text-base sm:text-lg font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl mobile-button">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 mobile-icon" />
                <span className="mobile-text-fix">Try New Adventure Preferences</span>
              </div>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const topDestination = recommendations[0];
  const otherDestinations = recommendations.slice(1, 4);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 sm:space-y-8 md:space-y-12 fade-in px-4">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12 md:mb-16">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="p-3 sm:p-4 bg-teal rounded-full animate-bounce">
            <Trophy className="h-8 w-8 sm:h-10 sm:w-10 text-white mobile-icon-large" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-teal mobile-title text-overflow-safe text-center">
            Your Dream Destinations Await! 
          </h1>
        </div>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 font-medium mb-3 sm:mb-4 mobile-text-fix px-2">
          🎉 We found the perfect places that match your wanderlust! 🌟
        </p>
        <p className="text-base sm:text-lg text-gray-600 mobile-text-fix px-2">
          Pack your bags and get ready for an unforgettable adventure!
        </p>
      </div>

      {/* Recommendation Explanation */}
      <Card className="pastel-card travel-card shadow-xl slide-in-up mb-6 sm:mb-8">
        <CardHeader className="text-center mobile-spacing">
          <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mobile-title">
            <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-coral mobile-icon-large" />
            <span className="text-overflow-safe text-center">Why These Destinations Are Perfect For You</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center px-4 sm:px-6 md:px-8 pb-6 sm:pb-8 mobile-spacing">
          <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto mobile-text-fix text-overflow-safe">
            Based on your answers, we've identified that you're <strong className="text-teal">{travelProfile.travelPersonality}</strong>. 
            The destinations below perfectly align with your <strong className="text-coral">{travelProfile.primaryStyle}</strong> travel style, 
            while also offering experiences that match your {travelProfile.characteristics.slice(0, 2).map(c => c.toLowerCase()).join(' and ')} personality. 
            Each recommendation is scored based on how well it matches your preferences for activities, budget, climate, and cultural experiences.
          </p>
        </CardContent>
      </Card>

      {/* Travel Style Analysis */}
      <TravelStyleAnalysis profile={travelProfile} />

      {/* Top Recommendation */}
      <Card className="overflow-hidden pastel-card travel-card shadow-2xl slide-in-up">
        <div className="relative destination-image">
          <img 
            src={topDestination.destination.image_url}
            alt={`Beautiful scenic view of ${topDestination.destination.city}, ${topDestination.destination.country} - Top travel destination recommendation`}
            className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover mobile-image"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800';
            }}
          />
          <div className="absolute top-3 sm:top-4 md:top-6 left-3 sm:left-4 md:left-6">
            <div className="flex items-center gap-1 sm:gap-2 bg-coral text-white px-3 sm:px-4 md:px-6 py-2 sm:py-2 md:py-3 rounded-full shadow-lg">
              <Trophy className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 mobile-icon" />
              <span className="font-bold text-xs sm:text-sm md:text-base lg:text-lg mobile-text-fix">
                🏆 #1 Perfect Match - {Math.round(topDestination.score)}% 🌟
              </span>
            </div>
          </div>
          <div className="absolute top-3 sm:top-4 md:top-6 right-3 sm:right-4 md:right-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 sm:p-3 shadow-lg">
              <Heart className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-coral mobile-icon" />
            </div>
          </div>
        </div>
        
        <CardHeader className="pb-4 sm:pb-6 mobile-spacing">
          <CardTitle as="h2" className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-2xl sm:text-3xl md:text-4xl font-bold mobile-title">
            <div className="p-2 bg-teal rounded-lg">
              <MapPin className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white mobile-icon-large" />
            </div>
            <span className="text-teal text-overflow-safe text-center sm:text-left">
              {topDestination.destination.city}, {topDestination.destination.country}
            </span>
          </CardTitle>
          <CardDescription className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 md:gap-6 text-base sm:text-lg md:text-xl mt-4">
            <span className="flex items-center gap-2 bg-yellow-100 px-3 sm:px-4 py-2 rounded-full mobile-badge">
              <Star className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 fill-yellow-500 text-yellow-500 mobile-icon" />
              <span className="font-semibold text-gray-700 text-sm sm:text-base mobile-text-fix">{topDestination.destination.rating}/5.0</span>
            </span>
            <span className="bg-cream px-3 sm:px-4 py-2 rounded-full font-semibold text-teal text-sm sm:text-base mobile-badge mobile-text-fix">
              🌍 {topDestination.destination.cultural_region}
            </span>
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4 sm:space-y-6 md:space-y-8 px-4 sm:px-6 md:px-8 pb-6 sm:pb-8 mobile-spacing">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mobile-grid">
            <div className="bg-cream p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-teal/20">
              <h4 className="font-bold mb-2 sm:mb-3 flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg mobile-text-fix">
                <div className="p-2 bg-teal rounded-lg">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-white mobile-icon" />
                </div>
                <span className="text-overflow-safe text-center sm:text-left">🗓️ Best Time to Visit</span>
              </h4>
              <p className="text-gray-700 font-medium text-sm sm:text-base md:text-lg mobile-text-fix text-overflow-safe text-center sm:text-left">{topDestination.destination.best_season}</p>
            </div>
            <div className="bg-cream p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-coral/20">
              <h4 className="font-bold mb-2 sm:mb-3 flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg mobile-text-fix">
                <div className="p-2 bg-coral rounded-lg">
                  <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-white mobile-icon" />
                </div>
                <span className="text-overflow-safe text-center sm:text-left">💰 Budget Range</span>
              </h4>
              <p className="text-gray-700 font-medium text-sm sm:text-base md:text-lg capitalize mobile-text-fix text-overflow-safe text-center sm:text-left">{topDestination.destination.budget_range}</p>
            </div>
            <div className="bg-cream p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-teal/20">
              <h4 className="font-bold mb-2 sm:mb-3 flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg mobile-text-fix">
                <div className="p-2 bg-teal rounded-lg">
                  <Thermometer className="h-4 w-4 sm:h-5 sm:w-5 text-white mobile-icon" />
                </div>
                <span className="text-overflow-safe text-center sm:text-left">🌡️ Climate</span>
              </h4>
              <p className="text-gray-700 font-medium text-sm sm:text-base md:text-lg capitalize mobile-text-fix text-overflow-safe text-center sm:text-left">{topDestination.destination.climate}</p>
            </div>
          </div>

          <div className="bg-cream p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-coral/20">
            <h4 className="font-bold mb-3 sm:mb-4 flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl mobile-text-fix">
              <Camera className="h-5 w-5 sm:h-6 sm:w-6 text-coral mobile-icon" />
              <span className="text-overflow-safe text-center sm:text-left">📸 Must-See Attractions</span>
            </h4>
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start flex-mobile">
              {topDestination.destination.key_attractions.map((attraction, index) => (
                <Badge key={index} className="bg-coral text-white px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium hover:shadow-lg transition-all mobile-badge text-overflow-safe">
                  {attraction}
                </Badge>
              ))}
            </div>
          </div>

          <div className="bg-cream p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-teal/20">
            <h4 className="font-bold mb-3 sm:mb-4 flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl mobile-text-fix">
              <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-teal mobile-icon" />
              <span className="text-overflow-safe text-center sm:text-left">✨ Lifestyle & Vibes</span>
            </h4>
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start flex-mobile">
              {topDestination.destination.lifestyle_characteristics.map((characteristic, index) => (
                <Badge key={index} className="bg-teal text-white px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium hover:shadow-lg transition-all mobile-badge text-overflow-safe">
                  {characteristic}
                </Badge>
              ))}
            </div>
          </div>

          <div className="bg-cream p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-coral/20">
            <h4 className="font-bold mb-3 sm:mb-4 flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl mobile-text-fix">
              <Plane className="h-5 w-5 sm:h-6 sm:w-6 text-coral mobile-icon" />
              <span className="text-overflow-safe text-center sm:text-left">🎯 Perfect Travel Styles</span>
            </h4>
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start flex-mobile">
              {topDestination.destination.travel_styles.map((style, index) => (
                <Badge key={index} className="bg-coral text-white px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium hover:shadow-lg transition-all mobile-badge text-overflow-safe">
                  {style.replace('-', ' ')}
                </Badge>
              ))}
            </div>
          </div>

          <div className="bg-cream p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-teal/20">
            <h4 className="font-bold mb-3 sm:mb-4 flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl mobile-text-fix">
              <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-teal mobile-icon" />
              <span className="text-overflow-safe text-center sm:text-left">🌟 Why This Is Perfect For You</span>
            </h4>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start flex-mobile">
                {topDestination.matchingFactors.map((factor, index) => (
                  <Badge key={index} className="bg-teal text-white px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium hover:shadow-lg transition-all mobile-badge text-overflow-safe">
                    ✓ {factor}
                  </Badge>
                ))}
              </div>
              {topDestination.personalityAlignment.length > 0 && (
                <div className="pt-2">
                  <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start flex-mobile">
                    {topDestination.personalityAlignment.map((alignment, index) => (
                      <Badge key={index} className="bg-coral text-white px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium hover:shadow-lg transition-all mobile-badge text-overflow-safe">
                        🎯 {alignment}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Other Recommendations */}
      {otherDestinations.length > 0 && (
        <div className="slide-in-up">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-coral mobile-title text-overflow-safe">
              🌟 More Amazing Adventures 
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mobile-text-fix">These destinations are also calling your name!</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mobile-grid">
            {otherDestinations.map((rec, index) => (
              <Card key={rec.destination.city} className="pastel-card travel-card overflow-hidden">
                <div className="relative">
                  <img 
                    src={rec.destination.image_url}
                    alt={`Scenic travel destination ${rec.destination.city}, ${rec.destination.country} - Perfect for ${rec.destination.travel_styles.join(', ')} travelers`}
                    className="w-full h-40 sm:h-48 object-cover mobile-image"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800';
                    }}
                  />
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                    <Badge className={`${index === 0 ? 'bg-teal' : index === 1 ? 'bg-coral' : 'bg-teal'} text-white px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold mobile-badge`}>
                      #{index + 2} {Math.round(rec.score)}% Match
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4 sm:p-6 mobile-spacing">
                  <div className="mb-3 sm:mb-4">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mb-2 mobile-title">
                      <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-teal mobile-icon" />
                      <span className="text-overflow-safe text-center sm:text-left">{rec.destination.city}, {rec.destination.country}</span>
                    </h3>
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm sm:text-base md:text-lg">
                      <span className="flex items-center gap-1 bg-yellow-100 px-2 sm:px-3 py-1 rounded-full mobile-badge">
                        <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-yellow-500 text-yellow-500 mobile-icon" />
                        <span className="font-semibold text-gray-700 mobile-text-fix">{rec.destination.rating}/5.0</span>
                      </span>
                      <span className="bg-cream px-2 sm:px-3 py-1 rounded-full font-semibold text-teal mobile-badge mobile-text-fix">
                        {rec.destination.cultural_region}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4 mobile-grid">
                    <div className="bg-cream p-2 sm:p-3 rounded-lg border border-coral/20">
                      <span className="font-semibold text-coral flex items-center gap-1 text-xs sm:text-sm mobile-text-fix">
                        <Thermometer className="h-3 w-3 sm:h-4 sm:w-4 mobile-icon" />
                        Climate:
                      </span> 
                      <span className="text-gray-700 capitalize text-xs sm:text-sm mobile-text-fix text-overflow-safe">{rec.destination.climate}</span>
                    </div>
                    <div className="bg-cream p-2 sm:p-3 rounded-lg border border-teal/20">
                      <span className="font-semibold text-teal flex items-center gap-1 text-xs sm:text-sm mobile-text-fix">
                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mobile-icon" />
                        Best Season:
                      </span> 
                      <span className="text-gray-700 text-xs sm:text-sm mobile-text-fix text-overflow-safe">{rec.destination.best_season}</span>
                    </div>
                    <div className="bg-cream p-2 sm:p-3 rounded-lg border border-coral/20">
                      <span className="font-semibold text-coral flex items-center gap-1 text-xs sm:text-sm mobile-text-fix">
                        <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 mobile-icon" />
                        Budget:
                      </span> 
                      <span className="text-gray-700 capitalize text-xs sm:text-sm mobile-text-fix text-overflow-safe">{rec.destination.budget_range}</span>
                    </div>
                  </div>

                  <Separator className="my-3 sm:my-4" />

                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <span className="font-semibold text-teal flex items-center gap-2 mb-1 sm:mb-2 text-xs sm:text-sm mobile-text-fix">
                        <Camera className="h-3 w-3 sm:h-4 sm:w-4 mobile-icon" />
                        Top Attractions: 
                      </span>
                      <div className="flex flex-wrap gap-1 sm:gap-2 flex-mobile">
                        {rec.destination.key_attractions.slice(0, 3).map((attraction, i) => (
                          <Badge key={i} variant="outline" className="text-xs mobile-badge border-teal text-teal text-overflow-safe">
                            {attraction}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="font-semibold text-coral flex items-center gap-2 mb-1 sm:mb-2 text-xs sm:text-sm mobile-text-fix">
                        <Plane className="h-3 w-3 sm:h-4 sm:w-4 mobile-icon" />
                        Travel Styles: 
                      </span>
                      <div className="flex flex-wrap gap-1 sm:gap-2 flex-mobile">
                        {rec.destination.travel_styles.slice(0, 3).map((style, i) => (
                          <Badge key={i} variant="secondary" className="text-xs mobile-badge text-overflow-safe">
                            {style.replace('-', ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {rec.matchingFactors.length > 0 && (
                      <div>
                        <span className="font-semibold text-teal flex items-center gap-2 mb-1 sm:mb-2 text-xs sm:text-sm mobile-text-fix">
                          <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 mobile-icon" />
                          Perfect because: 
                        </span>
                        <div className="flex flex-wrap gap-1 sm:gap-2 flex-mobile">
                          {rec.matchingFactors.slice(0, 2).map((factor, i) => (
                            <Badge key={i} className="bg-cream text-teal border border-teal text-xs mobile-badge text-overflow-safe">
                              ✓ {factor}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Share Section */}
      <div className="mt-12 sm:mt-16">
        <ShareButton />
      </div>

      {/* Start Over Section */}
      <div className="text-center mt-12 sm:mt-16">
        <Button 
          onClick={onStartOver} 
          className="adventure-button text-white text-lg sm:text-xl font-bold py-4 sm:py-6 px-8 sm:px-12 rounded-xl sm:rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 mobile-button"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <Heart className="h-5 w-5 sm:h-6 sm:w-6 mobile-icon" />
            <span className="mobile-text-fix">✨ Discover More Adventures ✨</span>
          </div>
        </Button>
        <p className="text-gray-600 mt-3 sm:mt-4 text-base sm:text-lg mobile-text-fix px-4">
          Ready to explore different destinations? Let's find your next perfect getaway!
        </p>
      </div>
    </div>
  );
}