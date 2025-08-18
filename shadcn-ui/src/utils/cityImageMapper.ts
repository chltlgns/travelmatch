// City Image Mapping System
// Handles local city images with fallback to placeholder

interface CityImageMap {
  [key: string]: string;
}

// Normalize city names for consistent matching
export const normalizeCityName = (cityName: string): string => {
  return cityName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '') // Remove all non-alphanumeric characters
    .trim();
};

// Generate possible image file names for a city
export const generateImageVariations = (cityName: string): string[] => {
  const normalized = normalizeCityName(cityName);
  const withSpaces = cityName.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
  const withHyphens = withSpaces.replace(/\s+/g, '-');
  const withUnderscores = withSpaces.replace(/\s+/g, '_');
  
  return [
    normalized,
    withHyphens,
    withUnderscores,
    withSpaces.replace(/\s+/g, ''),
    cityName.toLowerCase()
  ];
};

// Common image extensions to check
const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'];

// Check if image exists in public/cities directory
export const findCityImage = async (cityName: string): Promise<string | null> => {
  const variations = generateImageVariations(cityName);
  
  for (const variation of variations) {
    for (const ext of IMAGE_EXTENSIONS) {
      const imagePath = `/cities/${variation}.${ext}`;
      
      // Check if image exists by trying to load it
      try {
        const response = await fetch(imagePath, { method: 'HEAD' });
        if (response.ok) {
          return imagePath;
        }
      } catch (error) {
        // Continue to next variation
        continue;
      }
    }
  }
  
  return null;
};

// Get city image with fallback
export const getCityImage = async (cityName: string): Promise<string> => {
  const localImage = await findCityImage(cityName);
  
  if (localImage) {
    return localImage;
  }
  
  // Fallback to a generic travel placeholder
  return '/images/Travel.jpg';
};

// Batch process city images for results
export const getCityImages = async (cities: string[]): Promise<CityImageMap> => {
  const imageMap: CityImageMap = {};
  
  for (const city of cities) {
    imageMap[city] = await getCityImage(city);
  }
  
  return imageMap;
};

// Manual mapping for cities with different names in data vs files
const cityNameMapping: { [key: string]: string } = {
  'Santorini (Thira)': 'Santorini',
  'New York City': 'New York',
  'Bali (Denpasar)': 'Bali'
};

// Alternative synchronous version for immediate use
export const getCityImageSync = (cityName: string): string => {
  // Check for manual mappings first
  const mappedName = cityNameMapping[cityName] || cityName;
  
  // Return the mapped image path
  return `/cities/${mappedName}.jpg`;
};