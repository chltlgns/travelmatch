import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserTravelProfile } from '@/types/travel';
import { Heart, Compass, Star, MapPin, Palette, User } from 'lucide-react';

interface TravelStyleAnalysisProps {
  profile: UserTravelProfile;
}

export function TravelStyleAnalysis({ profile }: TravelStyleAnalysisProps) {
  return (
    <Card className="pastel-card travel-card shadow-2xl slide-in-up mb-12">
      <CardHeader className="text-center pb-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full">
            <User className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Your Travel Personality
          </CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-8 px-8 pb-8">
        {/* Main Travel Personality */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-100 to-pink-100 px-8 py-4 rounded-2xl">
            <Compass className="h-8 w-8 text-purple-600" />
            <h2 className="text-3xl font-bold text-purple-800">
              {profile.travelPersonality}
            </h2>
          </div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {profile.description}
          </p>
        </div>

        {/* Travel Characteristics */}
        <div className="bg-gradient-to-r from-sky-50 to-blue-50 p-6 rounded-2xl">
          <h3 className="text-xl sm:text-2xl font-bold mb-4 flex items-center justify-center gap-3 text-blue-800 text-center">
            <Palette className="h-6 w-6 flex-shrink-0" />
            ✨ Your Travel Characteristics
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {profile.characteristics.map((characteristic, index) => (
              <Badge 
                key={index} 
                className="bg-gradient-to-r from-sky-500 to-blue-500 text-white px-4 py-2 text-base font-medium hover:shadow-lg transition-all"
              >
                {characteristic}
              </Badge>
            ))}
          </div>
        </div>

        {/* Travel Styles */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-2xl">
          <h3 className="text-xl sm:text-2xl font-bold mb-4 flex items-center justify-center gap-3 text-emerald-800 text-center">
            <Star className="h-6 w-6 flex-shrink-0" />
            🎯 Your Perfect Travel Styles
          </h3>
          <div className="space-y-4 text-center">
            <div className="flex flex-col items-center gap-2">
              <Badge className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 text-lg font-semibold">
                Primary: {profile.primaryStyle.charAt(0).toUpperCase() + profile.primaryStyle.slice(1)}
              </Badge>
              <span className="text-emerald-700 font-medium">This is your main travel motivation!</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-emerald-700 font-medium">Also great for you:</span>
              <div className="flex flex-wrap gap-2 justify-center">
                {profile.secondaryStyles.map((style, index) => (
                  <Badge 
                    key={index}
                    variant="outline"
                    className="border-emerald-300 text-emerald-700 px-3 py-1 capitalize"
                  >
                    {style}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Preferred Regions */}
        {profile.preferredRegions.length > 0 && (
          <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 text-orange-800">
              <MapPin className="h-6 w-6" />
              🌍 Regions That Match Your Style
            </h3>
            <div className="flex flex-wrap gap-3">
              {profile.preferredRegions.map((region, index) => (
                <Badge 
                  key={index}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 text-base font-medium hover:shadow-lg transition-all"
                >
                  {region}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Preferences Summary */}
        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-6 rounded-2xl">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 text-yellow-800">
            <Heart className="h-6 w-6" />
            💫 Your Travel Preferences
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl mb-2">💰</div>
              <div className="font-semibold text-yellow-800">Budget Style</div>
              <div className="text-yellow-700 capitalize">{profile.budgetRange.replace('_', ' ')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🌡️</div>
              <div className="font-semibold text-yellow-800">Climate Love</div>
              <div className="text-yellow-700 capitalize">{profile.climatePreference.replace('_', ' ')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">📅</div>
              <div className="font-semibold text-yellow-800">Best Season</div>
              <div className="text-yellow-700 capitalize">{profile.seasonPreference}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}