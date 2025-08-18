import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Copy, Check } from 'lucide-react';
import { processUploadedImages, generateImagePlacementInstructions, type UploadedImage } from '@/utils/imageUploadProcessor';

interface ImageUploadHelperProps {
  onImagesProcessed?: (images: UploadedImage[]) => void;
}

export const ImageUploadHelper: React.FC<ImageUploadHelperProps> = ({ onImagesProcessed }) => {
  const [processedImages, setProcessedImages] = useState<UploadedImage[]>([]);
  const [instructions, setInstructions] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      alert('Please select image files only.');
      return;
    }

    const processed = processUploadedImages(imageFiles);
    const placementInstructions = generateImagePlacementInstructions(processed);
    
    setProcessedImages(processed);
    setInstructions(placementInstructions);
    
    if (onImagesProcessed) {
      onImagesProcessed(processed);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(instructions);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          City Image Upload Helper
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Select city images to process:
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
          />
        </div>

        {processedImages.length > 0 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {processedImages.map((image, index) => (
                <div key={index} className="p-3 border rounded-lg bg-gray-50">
                  <div className="text-sm font-medium text-gray-900">
                    {image.cityName}
                  </div>
                  <div className="text-xs text-gray-500">
                    {image.originalName} → {image.normalizedName}.{image.fileExtension}
                  </div>
                </div>
              ))}
            </div>

            <div className="border rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">File Placement Instructions</h3>
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </div>
              <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono">
                {instructions}
              </pre>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ImageUploadHelper;