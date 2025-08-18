import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MapPin, Star, Calendar, DollarSign, Thermometer, Plane, Heart, Trophy, Sparkles, Camera } from 'lucide-react';
import { RecommendationResult } from '@/types/travel';

interface RecommendationResultsProps {
  recommendations: RecommendationResult[];
  onStartOver: () => void;
}

export function RecommendationResults({ recommendations, onStartOver }: RecommendationResultsProps) {
  if (recommendations.length === 0) {
    return (
      <Card className="w-full max-w-4xl mx-auto pastel-card travel-card">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-800">Oops! No matches found</CardTitle>
          </div>
          <CardDescription className="text-lg text-gray-600">
            🌟 Don't worry! Let's adjust your preferences to find your perfect adventure destination! ✈️
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button onClick={onStartOver} className="wanderlust-button text-white text-lg font-semibold py-4 px-8 rounded-xl">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Try New Adventure Preferences
            </div>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const topDestination = recommendations[0];
  const otherDestinations = recommendations.slice(1, 3);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-12 fade-in">
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="p-4 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full animate-bounce">
            <Trophy className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Your Dream Destinations Await! 
          </h1>
        </div>
        <p className="text-2xl text-gray-700 font-medium mb-4">
          🎉 We found the perfect places that match your wanderlust! 🌟
        </p>
        <p className="text-lg text-gray-600">
          Pack your bags and get ready for an unforgettable adventure!
        </p>
      </div>

      {/* Top Recommendation */}
      <Card className="overflow-hidden pastel-card travel-card shadow-2xl slide-in-up">
        <div className="relative destination-image">
          <img 
            src={topDestination.destination.image_url}
            alt={`${topDestination.destination.city}, ${topDestination.destination.country}`}
            className="w-full h-80 md:h-96 object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800';
            }}
          />
          <div className="absolute top-6 left-6">
            <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full shadow-lg">
              <Trophy className="h-6 w-6" />
              <span className="font-bold text-lg">
                🏆 #1 Perfect Match - {Math.round(topDestination.score)}% 🌟
              </span>
            </div>
          </div>
          <div className="absolute top-6 right-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
              <Heart className="h-6 w-6 text-red-500" />
            </div>
          </div>
        </div>
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-3 text-4xl font-bold">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {topDestination.destination.city}, {topDestination.destination.country}
            </span>
          </CardTitle>
          <CardDescription className="flex items-center gap-6 text-xl mt-4">
            <span className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full">
              <Star className="h-6 w-6 fill-yellow-500 text-yellow-500" />
              <span className="font-semibold text-gray-700">{topDestination.destination.rating}/5.0</span>
            </span>
            <span className="bg-blue-100 px-4 py-2 rounded-full font-semibold text-blue-700">
              🌍 {topDestination.destination.cultural_region}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 px-8 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-sky-100 p-6 rounded-2xl">
              <h4 className="font-bold mb-3 flex items-center gap-3 text-lg">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <Calendar className="h-5 w-5 text-white travel-icon-season" />
                </div>
                🗓️ Best Time to Visit
              </h4>
              <p className="text-gray-700 font-medium text-lg">{topDestination.destination.best_season}</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-2xl">
              <h4 className="font-bold mb-3 flex items-center gap-3 text-lg">
                <div className="p-2 bg-green-500 rounded-lg">
                  <DollarSign className="h-5 w-5 text-white travel-icon-budget" />
                </div>
                💰 Budget Range
              </h4>
              <p className="text-gray-700 font-medium text-lg capitalize">{topDestination.destination.budget_range}</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-red-100 p-6 rounded-2xl">
              <h4 className="font-bold mb-3 flex items-center gap-3 text-lg">
                <div className="p-2 bg-orange-500 rounded-lg">
                  <Thermometer className="h-5 w-5 text-white travel-icon-climate" />
                </div>
                🌡️ Climate
              </h4>
              <p className="text-gray-700 font-medium text-lg capitalize">{topDestination.destination.climate}</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl">
            <h4 className="font-bold mb-4 flex items-center gap-3 text-xl">
              <Camera className="h-6 w-6 text-purple-600" />
              📸 Must-See Attractions
            </h4>
            <div className="flex flex-wrap gap-3">
              {topDestination.destination.key_attractions.map((attraction, index) => (
                <Badge key={index} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 text-sm font-medium hover:shadow-lg transition-all">
                  {attraction}
                </Badge>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl">
            <h4 className="font-bold mb-4 flex items-center gap-3 text-xl">
              <Heart className="h-6 w-6 text-orange-600" />
              ✨ Lifestyle & Vibes
            </h4>
            <div className="flex flex-wrap gap-3">
              {topDestination.destination.lifestyle_characteristics.map((characteristic, index) => (
                <Badge key={index} className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 text-sm font-medium hover:shadow-lg transition-all">
                  {characteristic}
                </Badge>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-sky-50 to-blue-50 p-6 rounded-2xl">
            <h4 className="font-bold mb-4 flex items-center gap-3 text-xl">
              <Plane className="h-6 w-6 text-blue-600" />
              🎯 Perfect Travel Styles
            </h4>
            <div className="flex flex-wrap gap-3">
              {topDestination.destination.travel_styles.map((style, index) => (
                <Badge key={index} className="bg-gradient-to-r from-sky-500 to-blue-500 text-white px-4 py-2 text-sm font-medium hover:shadow-lg transition-all">
                  {style.replace('-', ' ')}
                </Badge>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-2xl">
            <h4 className="font-bold mb-4 flex items-center gap-3 text-xl">
              <Sparkles className="h-6 w-6 text-emerald-600" />
              🌟 Why This Is Perfect For You
            </h4>
            <div className="flex flex-wrap gap-3">
              {topDestination.matchingFactors.map((factor, index) => (
                <Badge key={index} className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 text-sm font-medium hover:shadow-lg transition-all">
                  ✓ {factor}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Other Recommendations */}
      {otherDestinations.length > 0 && (
        <div className="slide-in-up">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              🌟 More Amazing Adventures 
            </h2>
            <p className="text-xl text-gray-600">These destinations are also calling your name!</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {otherDestinations.map((rec, index) => (
              <Card key={rec.destination.city} className="pastel-card travel-card overflow-hidden">
                <div className="relative">
                  <img 
                    src={rec.destination.image_url}
                    alt={`${rec.destination.city}, ${rec.destination.country}`}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800';
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={`${index === 0 ? 'bg-gradient-to-r from-silver-400 to-gray-500' : 'bg-gradient-to-r from-orange-400 to-red-500'} text-white px-3 py-1 text-sm font-bold`}>
                      #{index + 2} {Math.round(rec.score)}% Match
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold flex items-center gap-3 mb-2">
                      <MapPin className="h-6 w-6 text-blue-600" />
                      {rec.destination.city}, {rec.destination.country}
                    </h3>
                    <div className="flex items-center gap-4 text-lg">
                      <span className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
                        <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                        <span className="font-semibold text-gray-700">{rec.destination.rating}/5.0</span>
                      </span>
                      <span className="bg-blue-100 px-3 py-1 rounded-full font-semibold text-blue-700">
                        {rec.destination.cultural_region}
                      </span>
                    </div>
                  </div>
                
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-orange-50 p-3 rounded-lg">
                      <span className="font-semibold text-orange-700 flex items-center gap-1">
                        <Thermometer className="h-4 w-4" />
                        Climate:
                      </span> 
                      <span className="text-gray-700 capitalize">{rec.destination.climate}</span>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <span className="font-semibold text-blue-700 flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Best Season:
                      </span> 
                      <span className="text-gray-700">{rec.destination.best_season}</span>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <span className="font-semibold text-green-700 flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        Budget:
                      </span> 
                      <span className="text-gray-700 capitalize">{rec.destination.budget_range}</span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-4">
                    <div>
                      <span className="font-semibold text-purple-700 flex items-center gap-2 mb-2">
                        <Camera className="h-4 w-4" />
                        Top Attractions: 
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {rec.destination.key_attractions.slice(0, 3).map((attraction, i) => (
                          <Badge key={i} variant="outline" className="text-sm">
                            {attraction}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="font-semibold text-sky-700 flex items-center gap-2 mb-2">
                        <Plane className="h-4 w-4" />
                        Travel Styles: 
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {rec.destination.travel_styles.slice(0, 3).map((style, i) => (
                          <Badge key={i} variant="secondary" className="text-sm">
                            {style.replace('-', ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="text-center mt-16">
        <Button 
          onClick={onStartOver} 
          className="adventure-button text-white text-xl font-bold py-6 px-12 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105"
        >
          <div className="flex items-center gap-3">
            <Heart className="h-6 w-6" />
            ✨ Discover More Adventures ✨
          </div>
        </Button>
        <p className="text-gray-600 mt-4 text-lg">
          Ready to explore different destinations? Let's find your next perfect getaway!
        </p>
      </div>
    </div>
  );
}