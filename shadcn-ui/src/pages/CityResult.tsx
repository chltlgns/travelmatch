import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SEOHead } from '@/components/SEOHead';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Star, Calendar, DollarSign, Thermometer, Plane, Heart, ArrowLeft, Camera, Sparkles } from 'lucide-react';
import { getCityImageSync } from '@/utils/cityImageMapper';

// City data with detailed information
const cityData = {
  paris: {
    name: { en: 'Paris', ko: '파리' },
    country: { en: 'France', ko: '프랑스' },
    rating: 4.8,
    culturalRegion: { en: 'Western European', ko: '서유럽' },
    bestSeason: { en: 'April-June, September-October', ko: '4-6월, 9-10월' },
    budgetRange: { en: 'expensive', ko: '비싼 편' },
    climate: { en: 'temperate oceanic', ko: '온대 해양성' },
    keyAttractions: {
      en: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame', 'Champs-Élysées', 'Montmartre'],
      ko: ['에펠탑', '루브르 박물관', '노트르담', '샹젤리제', '몽마르트']
    },
    lifestyleCharacteristics: {
      en: ['romantic', 'artistic', 'cultural', 'fashionable', 'historic'],
      ko: ['로맨틱', '예술적', '문화적', '패셔너블', '역사적']
    },
    travelStyles: {
      en: ['cultural', 'romantic', 'luxury', 'foodie'],
      ko: ['문화 여행', '로맨틱', '럭셔리', '미식']
    },
    description: {
      en: 'The City of Light captivates with its timeless elegance, world-class museums, and romantic atmosphere. Perfect for art lovers, history enthusiasts, and those seeking sophisticated urban experiences.',
      ko: '빛의 도시는 영원한 우아함, 세계적 수준의 박물관, 로맨틱한 분위기로 매혹합니다. 예술 애호가, 역사 애호가, 세련된 도시 경험을 원하는 이들에게 완벽합니다.'
    }
  },
  london: {
    name: { en: 'London', ko: '런던' },
    country: { en: 'United Kingdom', ko: '영국' },
    rating: 4.7,
    culturalRegion: { en: 'Western European', ko: '서유럽' },
    bestSeason: { en: 'May-September', ko: '5-9월' },
    budgetRange: { en: 'expensive', ko: '비싼 편' },
    climate: { en: 'temperate oceanic', ko: '온대 해양성' },
    keyAttractions: {
      en: ['Big Ben', 'Tower Bridge', 'British Museum', 'Buckingham Palace', 'London Eye'],
      ko: ['빅벤', '타워 브리지', '대영박물관', '버킹엄 궁전', '런던 아이']
    },
    lifestyleCharacteristics: {
      en: ['historic', 'multicultural', 'royal', 'literary', 'modern'],
      ko: ['역사적', '다문화', '왕실', '문학적', '현대적']
    },
    travelStyles: {
      en: ['cultural', 'urban', 'historical', 'luxury'],
      ko: ['문화 여행', '도시', '역사', '럭셔리']
    },
    description: {
      en: 'A perfect blend of tradition and modernity, London offers royal heritage, world-class theaters, and diverse neighborhoods. Ideal for culture enthusiasts and urban explorers.',
      ko: '전통과 현대의 완벽한 조화를 이루는 런던은 왕실 유산, 세계적 수준의 극장, 다양한 동네를 제공합니다. 문화 애호가와 도시 탐험가에게 이상적입니다.'
    }
  },
  newyork: {
    name: { en: 'New York', ko: '뉴욕' },
    country: { en: 'United States', ko: '미국' },
    rating: 4.6,
    culturalRegion: { en: 'North American', ko: '북미' },
    bestSeason: { en: 'April-June, September-November', ko: '4-6월, 9-11월' },
    budgetRange: { en: 'expensive', ko: '비싼 편' },
    climate: { en: 'humid subtropical', ko: '습윤 아열대' },
    keyAttractions: {
      en: ['Statue of Liberty', 'Central Park', 'Times Square', 'Empire State Building', 'Brooklyn Bridge'],
      ko: ['자유의 여신상', '센트럴 파크', '타임스퀘어', '엠파이어 스테이트 빌딩', '브루클린 브리지']
    },
    lifestyleCharacteristics: {
      en: ['energetic', 'diverse', 'fast-paced', 'ambitious', 'cultural'],
      ko: ['에너지 넘치는', '다양한', '빠른 속도', '야심찬', '문화적']
    },
    travelStyles: {
      en: ['urban', 'cultural', 'nightlife', 'foodie'],
      ko: ['도시', '문화 여행', '나이트라이프', '미식']
    },
    description: {
      en: 'The city that never sleeps offers endless possibilities with its iconic skyline, Broadway shows, and melting pot culture. Perfect for ambitious travelers seeking urban energy.',
      ko: '잠들지 않는 도시는 상징적인 스카이라인, 브로드웨이 쇼, 용광로 같은 문화로 무한한 가능성을 제공합니다. 도시적 에너지를 추구하는 야심찬 여행자에게 완벽합니다.'
    }
  },
  seoul: {
    name: { en: 'Seoul', ko: '서울' },
    country: { en: 'South Korea', ko: '대한민국' },
    rating: 4.5,
    culturalRegion: { en: 'East Asian', ko: '동아시아' },
    bestSeason: { en: 'March-May, September-November', ko: '3-5월, 9-11월' },
    budgetRange: { en: 'moderate', ko: '보통' },
    climate: { en: 'humid continental', ko: '습윤 대륙성' },
    keyAttractions: {
      en: ['Gyeongbokgung Palace', 'Bukchon Hanok Village', 'Myeongdong', 'Hongdae', 'N Seoul Tower'],
      ko: ['경복궁', '북촌 한옥마을', '명동', '홍대', 'N서울타워']
    },
    lifestyleCharacteristics: {
      en: ['modern', 'tech-savvy', 'vibrant', 'traditional', 'trendy'],
      ko: ['현대적', '기술 친화적', '활기찬', '전통적', '트렌디']
    },
    travelStyles: {
      en: ['urban', 'cultural', 'foodie', 'nightlife'],
      ko: ['도시', '문화 여행', '미식', '나이트라이프']
    },
    description: {
      en: 'A dynamic metropolis where ancient traditions meet cutting-edge technology. Perfect for tech enthusiasts, K-culture fans, and food lovers.',
      ko: '고대 전통과 최첨단 기술이 만나는 역동적인 대도시입니다. 기술 애호가, K-문화 팬, 음식 애호가에게 완벽합니다.'
    }
  },
  kyoto: {
    name: { en: 'Kyoto', ko: '교토' },
    country: { en: 'Japan', ko: '일본' },
    rating: 4.8,
    culturalRegion: { en: 'East Asian', ko: '동아시아' },
    bestSeason: { en: 'March-May, October-November', ko: '3-5월, 10-11월' },
    budgetRange: { en: 'moderate to expensive', ko: '보통에서 비싼 편' },
    climate: { en: 'humid subtropical', ko: '습윤 아열대' },
    keyAttractions: {
      en: ['Fushimi Inari Shrine', 'Kiyomizu-dera', 'Arashiyama Bamboo Grove', 'Gion District', 'Golden Pavilion'],
      ko: ['후시미 이나리 신사', '기요미즈데라', '아라시야마 대나무 숲', '기온 거리', '금각사']
    },
    lifestyleCharacteristics: {
      en: ['serene', 'traditional', 'spiritual', 'artistic', 'peaceful'],
      ko: ['고요한', '전통적', '영적', '예술적', '평화로운']
    },
    travelStyles: {
      en: ['cultural', 'wellness', 'historical', 'nature'],
      ko: ['문화 여행', '웰니스', '역사', '자연']
    },
    description: {
      en: 'The former imperial capital preserves Japan\'s cultural heart with thousands of temples, traditional gardens, and geisha districts. Ideal for cultural immersion and spiritual reflection.',
      ko: '옛 제국의 수도는 수천 개의 사원, 전통 정원, 게이샤 거리로 일본의 문화적 심장을 보존합니다. 문화적 몰입과 영적 성찰에 이상적입니다.'
    }
  },
  dubai: {
    name: { en: 'Dubai', ko: '두바이' },
    country: { en: 'United Arab Emirates', ko: '아랍에미리트' },
    rating: 4.6,
    culturalRegion: { en: 'Middle Eastern', ko: '중동' },
    bestSeason: { en: 'November-March', ko: '11-3월' },
    budgetRange: { en: 'expensive', ko: '비싼 편' },
    climate: { en: 'desert', ko: '사막' },
    keyAttractions: {
      en: ['Burj Khalifa', 'Palm Jumeirah', 'Dubai Mall', 'Burj Al Arab', 'Desert Safari'],
      ko: ['부르즈 할리파', '팜 주메이라', '두바이 몰', '부르즈 알 아랍', '사막 사파리']
    },
    lifestyleCharacteristics: {
      en: ['luxurious', 'modern', 'cosmopolitan', 'futuristic', 'opulent'],
      ko: ['럭셔리', '현대적', '국제적', '미래적', '화려한']
    },
    travelStyles: {
      en: ['luxury', 'urban', 'adventure', 'shopping'],
      ko: ['럭셔리', '도시', '모험', '쇼핑']
    },
    description: {
      en: 'A gleaming metropolis in the desert offering ultra-modern architecture, luxury shopping, and unique desert experiences. Perfect for luxury seekers and architecture enthusiasts.',
      ko: '사막의 빛나는 대도시로 초현대적 건축, 럭셔리 쇼핑, 독특한 사막 경험을 제공합니다. 럭셔리를 추구하는 이들과 건축 애호가에게 완벽합니다.'
    }
  },
  bangkok: {
    name: { en: 'Bangkok', ko: '방콕' },
    country: { en: 'Thailand', ko: '태국' },
    rating: 4.4,
    culturalRegion: { en: 'Southeast Asian', ko: '동남아시아' },
    bestSeason: { en: 'November-February', ko: '11-2월' },
    budgetRange: { en: 'budget-friendly', ko: '저렴한 편' },
    climate: { en: 'tropical', ko: '열대' },
    keyAttractions: {
      en: ['Grand Palace', 'Wat Arun', 'Chatuchak Market', 'Floating Markets', 'Khao San Road'],
      ko: ['왕궁', '왓 아룬', '짜뚜짝 시장', '수상 시장', '카오산 로드']
    },
    lifestyleCharacteristics: {
      en: ['vibrant', 'exotic', 'bustling', 'spiritual', 'affordable'],
      ko: ['활기찬', '이국적', '번화한', '영적', '저렴한']
    },
    travelStyles: {
      en: ['budget', 'cultural', 'foodie', 'adventure'],
      ko: ['저예산', '문화 여행', '미식', '모험']
    },
    description: {
      en: 'A sensory explosion of temples, street food, and bustling markets. Perfect for budget travelers, food enthusiasts, and cultural explorers seeking authentic Southeast Asian experiences.',
      ko: '사원, 길거리 음식, 번화한 시장의 감각적 폭발입니다. 저예산 여행자, 음식 애호가, 진정한 동남아시아 경험을 추구하는 문화 탐험가에게 완벽합니다.'
    }
  },
  rome: {
    name: { en: 'Rome', ko: '로마' },
    country: { en: 'Italy', ko: '이탈리아' },
    rating: 4.7,
    culturalRegion: { en: 'Southern European', ko: '남유럽' },
    bestSeason: { en: 'April-June, September-October', ko: '4-6월, 9-10월' },
    budgetRange: { en: 'moderate to expensive', ko: '보통에서 비싼 편' },
    climate: { en: 'Mediterranean', ko: '지중해성' },
    keyAttractions: {
      en: ['Colosseum', 'Vatican City', 'Trevi Fountain', 'Roman Forum', 'Pantheon'],
      ko: ['콜로세움', '바티칸 시국', '트레비 분수', '로마 포럼', '판테온']
    },
    lifestyleCharacteristics: {
      en: ['historic', 'romantic', 'artistic', 'culinary', 'ancient'],
      ko: ['역사적', '로맨틱', '예술적', '요리', '고대']
    },
    travelStyles: {
      en: ['cultural', 'historical', 'romantic', 'foodie'],
      ko: ['문화 여행', '역사', '로맨틱', '미식']
    },
    description: {
      en: 'The Eternal City where ancient history comes alive through magnificent ruins, world-class art, and incredible cuisine. Perfect for history buffs, art lovers, and food enthusiasts.',
      ko: '영원한 도시는 웅장한 유적, 세계적 수준의 예술, 놀라운 요리를 통해 고대 역사가 살아 숨쉽니다. 역사 애호가, 예술 애호가, 음식 애호가에게 완벽합니다.'
    }
  },
  singapore: {
    name: { en: 'Singapore', ko: '싱가포르' },
    country: { en: 'Singapore', ko: '싱가포르' },
    rating: 4.6,
    culturalRegion: { en: 'Southeast Asian', ko: '동남아시아' },
    bestSeason: { en: 'February-April', ko: '2-4월' },
    budgetRange: { en: 'expensive', ko: '비싼 편' },
    climate: { en: 'tropical', ko: '열대' },
    keyAttractions: {
      en: ['Marina Bay Sands', 'Gardens by the Bay', 'Sentosa Island', 'Chinatown', 'Universal Studios'],
      ko: ['마리나 베이 샌즈', '가든스 바이 더 베이', '센토사 섬', '차이나타운', '유니버셜 스튜디오']
    },
    lifestyleCharacteristics: {
      en: ['modern', 'multicultural', 'clean', 'efficient', 'futuristic'],
      ko: ['현대적', '다문화', '깨끗한', '효율적', '미래적']
    },
    travelStyles: {
      en: ['urban', 'luxury', 'foodie', 'family'],
      ko: ['도시', '럭셔리', '미식', '가족']
    },
    description: {
      en: 'A modern city-state blending cultures, cuisines, and cutting-edge architecture. Perfect for urban explorers, food lovers, and families seeking a safe, diverse destination.',
      ko: '문화, 요리, 최첨단 건축이 조화를 이루는 현대적 도시국가입니다. 도시 탐험가, 음식 애호가, 안전하고 다양한 목적지를 찾는 가족에게 완벽합니다.'
    }
  },
  taipei: {
    name: { en: 'Taipei', ko: '타이페이' },
    country: { en: 'Taiwan', ko: '대만' },
    rating: 4.4,
    culturalRegion: { en: 'East Asian', ko: '동아시아' },
    bestSeason: { en: 'October-December, March-May', ko: '10-12월, 3-5월' },
    budgetRange: { en: 'budget-friendly to moderate', ko: '저렴한 편에서 보통' },
    climate: { en: 'humid subtropical', ko: '습윤 아열대' },
    keyAttractions: {
      en: ['Taipei 101', 'Night Markets', 'Shilin Night Market', 'National Palace Museum', 'Yangmingshan'],
      ko: ['타이페이 101', '야시장', '스린 야시장', '국립고궁박물원', '양명산']
    },
    lifestyleCharacteristics: {
      en: ['friendly', 'food-focused', 'night-market culture', 'modern', 'traditional'],
      ko: ['친근한', '음식 중심', '야시장 문화', '현대적', '전통적']
    },
    travelStyles: {
      en: ['foodie', 'budget', 'cultural', 'nightlife'],
      ko: ['미식', '저예산', '문화 여행', '나이트라이프']
    },
    description: {
      en: 'A food lover\'s paradise with incredible night markets, bubble tea culture, and warm hospitality. Perfect for culinary adventurers and budget-conscious travelers.',
      ko: '놀라운 야시장, 버블티 문화, 따뜻한 환대가 있는 음식 애호가의 천국입니다. 요리 모험가와 예산을 고려하는 여행자에게 완벽합니다.'
    }
  }
};

export default function CityResultPage() {
  const { cityName } = useParams<{ cityName: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  
  if (!cityName || !cityData[cityName as keyof typeof cityData]) {
    return (
      <div className="min-h-screen wanderlust-bg flex items-center justify-center px-4">
        <Card className="w-full max-w-md pastel-card fade-in">
          <CardHeader>
            <CardTitle className="text-center text-coral">City Not Found</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">The requested city page could not be found.</p>
            <Button onClick={() => navigate('/')} className="wanderlust-button">
              Go Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const city = cityData[cityName as keyof typeof cityData];
  const cityImage = getCityImageSync(city.name.en);

  return (
    <>
      <SEOHead 
        title={`${city.name[language]} Travel Guide - ${t('results.title')}`}
        description={city.description[language]}
        canonical={`https://www.travelmatch.xyz/city/${cityName}`}
      />
      
      <div className="min-h-screen wanderlust-bg">
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-12">
          {/* Back Button */}
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-teal hover:text-teal"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('common.startOver')}
            </Button>
          </div>

          {/* City Header */}
          <Card className="overflow-hidden pastel-card travel-card shadow-2xl slide-in-up mb-8">
            <div className="relative destination-image">
              <img 
                src={cityImage}
                alt={`Beautiful scenic view of ${city.name[language]}, ${city.country[language]}`}
                className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover mobile-image"
                loading="eager"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/cities/placeholder.jpg';
                }}
              />
              <div className="absolute top-3 sm:top-4 md:top-6 left-3 sm:left-4 md:left-6">
                <div className="flex items-center gap-1 sm:gap-2 bg-teal text-white px-3 sm:px-4 md:px-6 py-2 sm:py-2 md:py-3 rounded-full shadow-lg">
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 mobile-icon" />
                  <span className="font-bold text-xs sm:text-sm md:text-base lg:text-lg mobile-text-fix">
                    ✨ {t('results.dreamDestinations')} ✨
                  </span>
                </div>
              </div>
            </div>
            
            <CardHeader className="pb-4 sm:pb-6 mobile-spacing">
              <CardTitle className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-2xl sm:text-3xl md:text-4xl font-bold mobile-title">
                <div className="p-2 bg-teal rounded-lg">
                  <MapPin className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white mobile-icon-large" />
                </div>
                <span className="text-teal text-overflow-safe text-center sm:text-left">
                  {city.name[language]}, {city.country[language]}
                </span>
              </CardTitle>
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 md:gap-6 text-base sm:text-lg md:text-xl mt-4">
                <span className="flex items-center gap-2 bg-yellow-100 px-3 sm:px-4 py-2 rounded-full mobile-badge">
                  <Star className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 fill-yellow-500 text-yellow-500 mobile-icon" />
                  <span className="font-semibold text-gray-700 text-sm sm:text-base mobile-text-fix">{city.rating}/5.0</span>
                </span>
                <span className="bg-cream px-3 sm:px-4 py-2 rounded-full font-semibold text-teal text-sm sm:text-base mobile-badge mobile-text-fix">
                  🌍 {city.culturalRegion[language]}
                </span>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4 sm:space-y-6 md:space-y-8 px-4 sm:px-6 md:px-8 pb-6 sm:pb-8 mobile-spacing">
              {/* Description */}
              <div className="text-lg text-gray-700 leading-relaxed mobile-text-fix">
                {city.description[language]}
              </div>

              {/* Key Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mobile-grid">
                <div className="bg-cream p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-teal/20">
                  <h4 className="font-bold mb-2 sm:mb-3 flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg mobile-text-fix">
                    <div className="p-2 bg-teal rounded-lg">
                      <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-white mobile-icon" />
                    </div>
                    <span className="text-overflow-safe text-center sm:text-left">{t('city.bestTime')}</span>
                  </h4>
                  <p className="text-gray-700 font-medium text-sm sm:text-base md:text-lg mobile-text-fix text-overflow-safe text-center sm:text-left">
                    {city.bestSeason[language]}
                  </p>
                </div>
                <div className="bg-cream p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-coral/20">
                  <h4 className="font-bold mb-2 sm:mb-3 flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg mobile-text-fix">
                    <div className="p-2 bg-coral rounded-lg">
                      <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-white mobile-icon" />
                    </div>
                    <span className="text-overflow-safe text-center sm:text-left">{t('city.budget')}</span>
                  </h4>
                  <p className="text-gray-700 font-medium text-sm sm:text-base md:text-lg capitalize mobile-text-fix text-overflow-safe text-center sm:text-left">
                    {city.budgetRange[language]}
                  </p>
                </div>
                <div className="bg-cream p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-teal/20">
                  <h4 className="font-bold mb-2 sm:mb-3 flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg mobile-text-fix">
                    <div className="p-2 bg-teal rounded-lg">
                      <Thermometer className="h-4 w-4 sm:h-5 sm:w-5 text-white mobile-icon" />
                    </div>
                    <span className="text-overflow-safe text-center sm:text-left">{t('city.climate')}</span>
                  </h4>
                  <p className="text-gray-700 font-medium text-sm sm:text-base md:text-lg capitalize mobile-text-fix text-overflow-safe text-center sm:text-left">
                    {city.climate[language]}
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <span className="font-semibold text-coral flex items-center gap-2 mb-1 sm:mb-2 text-xs sm:text-sm mobile-text-fix">
                    <Camera className="h-3 w-3 sm:h-4 sm:w-4 mobile-icon" />
                    {t('city.attractions')}
                  </span>
                  <div className="flex flex-wrap gap-1 sm:gap-2 flex-mobile">
                    {city.keyAttractions[language].map((attraction, index) => (
                      <Badge key={index} variant="outline" className="text-xs mobile-badge border-coral text-coral text-overflow-safe">
                        {attraction}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="font-semibold text-teal flex items-center gap-2 mb-1 sm:mb-2 text-xs sm:text-sm mobile-text-fix">
                    <Heart className="h-3 w-3 sm:h-4 sm:w-4 mobile-icon" />
                    {t('city.lifestyle')}
                  </span>
                  <div className="flex flex-wrap gap-1 sm:gap-2 flex-mobile">
                    {city.lifestyleCharacteristics[language].map((characteristic, index) => (
                      <Badge key={index} variant="outline" className="text-xs mobile-badge border-teal text-teal text-overflow-safe">
                        {characteristic}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="font-semibold text-coral flex items-center gap-2 mb-1 sm:mb-2 text-xs sm:text-sm mobile-text-fix">
                    <Plane className="h-3 w-3 sm:h-4 sm:w-4 mobile-icon" />
                    {t('city.travelStyles')}
                  </span>
                  <div className="flex flex-wrap gap-1 sm:gap-2 flex-mobile">
                    {city.travelStyles[language].map((style, index) => (
                      <Badge key={index} variant="secondary" className="text-xs mobile-badge text-overflow-safe">
                        {style}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            <Button 
              onClick={() => navigate('/quiz')} 
              className="adventure-button text-white text-lg sm:text-xl font-bold py-4 sm:py-6 px-8 sm:px-12 rounded-xl sm:rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 mobile-button"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 mobile-icon" />
                <span className="mobile-text-fix">{t('results.discoverMore')}</span>
              </div>
            </Button>
            <p className="text-gray-600 text-base sm:text-lg mobile-text-fix px-4">
              {t('results.nextGetaway')}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
