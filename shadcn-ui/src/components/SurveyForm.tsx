import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { UserPreferences } from '@/types/travel';
import { Thermometer, DollarSign, Calendar, MapPin, Heart, Sparkles, Camera, Mountain } from 'lucide-react';

interface SurveyFormProps {
  onSubmit: (preferences: UserPreferences) => void;
  availableStyles: string[];
  availableRegions: string[];
  availableBudgets: string[];
}

export function SurveyForm({ onSubmit, availableStyles, availableRegions, availableBudgets }: SurveyFormProps) {
  const [preferences, setPreferences] = useState<UserPreferences>({
    travelStyles: [],
    culturalRegions: [],
    budgetRange: '',
    preferredActivities: [],
    climatePreference: '',
    seasonPreference: ''
  });

  const handleStyleChange = (style: string, checked: boolean) => {
    setPreferences(prev => ({
      ...prev,
      travelStyles: checked 
        ? [...prev.travelStyles, style]
        : prev.travelStyles.filter(s => s !== style)
    }));
  };

  const handleRegionChange = (region: string, checked: boolean) => {
    setPreferences(prev => ({
      ...prev,
      culturalRegions: checked 
        ? [...prev.culturalRegions, region]
        : prev.culturalRegions.filter(r => r !== region)
    }));
  };

  const handleActivityChange = (activity: string, checked: boolean) => {
    setPreferences(prev => ({
      ...prev,
      preferredActivities: checked 
        ? [...prev.preferredActivities, activity]
        : prev.preferredActivities.filter(a => a !== activity)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(preferences);
  };

  const activities = [
    'Museums & Art Galleries',
    'Historical Sites',
    'Beach Activities',
    'Adventure Sports',
    'Fine Dining',
    'Shopping',
    'Nightlife',
    'Nature & Wildlife',
    'Photography',
    'Architecture Tours'
  ];

  const climates = ['tropical', 'temperate', 'Mediterranean', 'desert', 'continental'];
  const seasons = ['spring', 'summer', 'autumn', 'winter', 'year-round'];

  return (
    <Card className="w-full max-w-5xl mx-auto pastel-card travel-card shadow-2xl">
      <CardHeader className="text-center pb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-sky-600 via-purple-600 to-coral-500 bg-clip-text text-transparent">
            What's Your Travel Style?
          </CardTitle>
        </div>
        <CardDescription className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          🌟 Tell us about your dream adventure and we'll find destinations that match your wanderlust! ✈️
        </CardDescription>
      </CardHeader>
      <CardContent className="px-8 pb-8">
        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Travel Styles */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-pink-400 to-red-400 rounded-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <Label className="text-2xl font-bold text-gray-800">✨ What excites you most about traveling?</Label>
            </div>
            <p className="text-gray-600 ml-11">Choose all the travel styles that make your heart race with excitement!</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-11">
              {availableStyles.slice(0, 18).map((style) => (
                <div key={style} className="group">
                  <div className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                    preferences.travelStyles.includes(style) 
                      ? 'border-sky-400 bg-sky-50 shadow-lg transform scale-105' 
                      : 'border-gray-200 bg-white hover:border-sky-300 hover:shadow-md hover:scale-102'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id={`style-${style}`}
                        checked={preferences.travelStyles.includes(style)}
                        onCheckedChange={(checked) => handleStyleChange(style, checked as boolean)}
                        className="data-[state=checked]:bg-sky-500 data-[state=checked]:border-sky-500"
                      />
                      <Label 
                        htmlFor={`style-${style}`} 
                        className="text-base font-medium capitalize cursor-pointer text-gray-700 group-hover:text-sky-600"
                      >
                        {style.replace('-', ' ')}
                      </Label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cultural Regions */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-lg">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <Label className="text-2xl font-bold text-gray-800">🌍 Which cultures call to your soul?</Label>
            </div>
            <p className="text-gray-600 ml-11">Select the cultural regions that spark your curiosity and wanderlust!</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-11">
              {availableRegions.map((region) => (
                <div key={region} className="group">
                  <div className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                    preferences.culturalRegions.includes(region) 
                      ? 'border-emerald-400 bg-emerald-50 shadow-lg transform scale-105' 
                      : 'border-gray-200 bg-white hover:border-emerald-300 hover:shadow-md hover:scale-102'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id={`region-${region}`}
                        checked={preferences.culturalRegions.includes(region)}
                        onCheckedChange={(checked) => handleRegionChange(region, checked as boolean)}
                        className="data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                      />
                      <Label 
                        htmlFor={`region-${region}`} 
                        className="text-base font-medium cursor-pointer text-gray-700 group-hover:text-emerald-600"
                      >
                        {region}
                      </Label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Budget Range */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <Label className="text-2xl font-bold text-gray-800">💰 What's your adventure budget?</Label>
            </div>
            <p className="text-gray-600 ml-11">Choose the budget range that works best for your dream getaway!</p>
            <div className="ml-11">
              <RadioGroup
                value={preferences.budgetRange}
                onValueChange={(value) => setPreferences(prev => ({ ...prev, budgetRange: value }))}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {availableBudgets.map((budget) => (
                  <div key={budget} className="group">
                    <div className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                      preferences.budgetRange === budget 
                        ? 'border-yellow-400 bg-yellow-50 shadow-lg' 
                        : 'border-gray-200 bg-white hover:border-yellow-300 hover:shadow-md'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem 
                          value={budget} 
                          id={`budget-${budget}`}
                          className="data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
                        />
                        <Label 
                          htmlFor={`budget-${budget}`} 
                          className="text-base font-medium capitalize cursor-pointer text-gray-700 group-hover:text-yellow-600"
                        >
                          {budget}
                        </Label>
                      </div>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>

          {/* Preferred Activities */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg">
                <Camera className="h-6 w-6 text-white" />
              </div>
              <Label className="text-2xl font-bold text-gray-800">📸 What makes your heart sing while traveling?</Label>
            </div>
            <p className="text-gray-600 ml-11">Pick all the activities that would make your trip absolutely unforgettable!</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-11">
              {activities.map((activity) => (
                <div key={activity} className="group">
                  <div className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                    preferences.preferredActivities.includes(activity) 
                      ? 'border-purple-400 bg-purple-50 shadow-lg transform scale-105' 
                      : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-md hover:scale-102'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id={`activity-${activity}`}
                        checked={preferences.preferredActivities.includes(activity)}
                        onCheckedChange={(checked) => handleActivityChange(activity, checked as boolean)}
                        className="data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                      />
                      <Label 
                        htmlFor={`activity-${activity}`} 
                        className="text-base font-medium cursor-pointer text-gray-700 group-hover:text-purple-600"
                      >
                        {activity}
                      </Label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Climate Preference */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg">
                <Thermometer className="h-6 w-6 text-white" />
              </div>
              <Label className="text-2xl font-bold text-gray-800">🌡️ What weather makes you feel alive?</Label>
            </div>
            <p className="text-gray-600 ml-11">Choose the climate that matches your ideal travel experience!</p>
            <div className="ml-11">
              <RadioGroup
                value={preferences.climatePreference}
                onValueChange={(value) => setPreferences(prev => ({ ...prev, climatePreference: value }))}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {climates.map((climate) => (
                  <div key={climate} className="group">
                    <div className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                      preferences.climatePreference === climate 
                        ? 'border-orange-400 bg-orange-50 shadow-lg' 
                        : 'border-gray-200 bg-white hover:border-orange-300 hover:shadow-md'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem 
                          value={climate} 
                          id={`climate-${climate}`}
                          className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                        />
                        <Label 
                          htmlFor={`climate-${climate}`} 
                          className="text-base font-medium capitalize cursor-pointer text-gray-700 group-hover:text-orange-600"
                        >
                          {climate}
                        </Label>
                      </div>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>

          {/* Season Preference */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-teal-400 to-blue-400 rounded-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <Label className="text-2xl font-bold text-gray-800">🗓️ When does your wanderlust peak?</Label>
            </div>
            <p className="text-gray-600 ml-11">Pick your favorite season to travel and make memories!</p>
            <div className="ml-11">
              <RadioGroup
                value={preferences.seasonPreference}
                onValueChange={(value) => setPreferences(prev => ({ ...prev, seasonPreference: value }))}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                {seasons.map((season) => (
                  <div key={season} className="group">
                    <div className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                      preferences.seasonPreference === season 
                        ? 'border-teal-400 bg-teal-50 shadow-lg' 
                        : 'border-gray-200 bg-white hover:border-teal-300 hover:shadow-md'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem 
                          value={season} 
                          id={`season-${season}`}
                          className="data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500"
                        />
                        <Label 
                          htmlFor={`season-${season}`} 
                          className="text-base font-medium capitalize cursor-pointer text-gray-700 group-hover:text-teal-600"
                        >
                          {season}
                        </Label>
                      </div>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>

          <div className="text-center pt-8">
            <Button 
              type="submit" 
              className="wanderlust-button text-white text-xl font-bold py-6 px-12 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={
                preferences.travelStyles.length === 0 || 
                !preferences.budgetRange || 
                preferences.preferredActivities.length === 0
              }
            >
              <div className="flex items-center gap-3">
                <Mountain className="h-6 w-6" />
                ✈️ Find My Dream Destination! 🌟
              </div>
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              {preferences.travelStyles.length === 0 || !preferences.budgetRange || preferences.preferredActivities.length === 0
                ? "Please complete all required fields to discover your perfect destination!"
                : "Ready to discover amazing places tailored just for you!"
              }
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}