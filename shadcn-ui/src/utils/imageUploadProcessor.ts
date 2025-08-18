// Image Upload Processor for City Images
// Processes uploaded city images and moves them to public/cities directory

import { normalizeCityName } from './cityImageMapper';

export interface UploadedImage {
  originalName: string;
  normalizedName: string;
  cityName: string;
  fileExtension: string;
}

// Extract city name from file name
export const extractCityName = (fileName: string): string => {
  // Remove file extension
  const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '');
  
  // Handle common naming patterns
  return nameWithoutExt
    .replace(/[-_]/g, ' ') // Replace hyphens and underscores with spaces
    .replace(/\b\w/g, l => l.toUpperCase()) // Capitalize first letter of each word
    .trim();
};

// Process uploaded images
export const processUploadedImages = (imageFiles: File[]): UploadedImage[] => {
  return imageFiles.map(file => {
    const cityName = extractCityName(file.name);
    const normalizedName = normalizeCityName(cityName);
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    
    return {
      originalName: file.name,
      normalizedName,
      cityName,
      fileExtension
    };
  });
};

// Generate instructions for manual file placement
export const generateImagePlacementInstructions = (processedImages: UploadedImage[]): string => {
  let instructions = "Please place the following images in the /workspace/shadcn-ui/public/cities/ directory:\n\n";
  
  processedImages.forEach(image => {
    instructions += `• ${image.originalName} → cities/${image.normalizedName}.${image.fileExtension}\n`;
    instructions += `  (City: ${image.cityName})\n\n`;
  });
  
  instructions += "The system will automatically match these images to cities in the travel recommendations.";
  
  return instructions;
};