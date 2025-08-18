import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Share2, Copy, Facebook, Twitter, Link, Heart } from 'lucide-react';

export function ShareButton() {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentUrl = window.location.href;
  const shareText = "✈️ I just discovered my perfect travel destinations with TravelMatch! Find yours now and start planning your dream adventure! 🌍✨";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className="text-center space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Heart className="h-6 w-6 text-red-500" />
          <h3 className="text-2xl font-bold text-gray-800">Love Your Results?</h3>
        </div>
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          Share TravelMatch with friends and help them discover their perfect destinations too! 🌟
        </p>
      </div>

      {!showShareOptions ? (
        <Button
          onClick={() => setShowShareOptions(true)}
          className="wanderlust-button text-white text-xl font-bold py-4 px-8 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105"
        >
          <div className="flex items-center gap-3">
            <Share2 className="h-6 w-6" />
            ✨ Share Your Adventure ✨
          </div>
        </Button>
      ) : (
        <Card className="pastel-card max-w-md mx-auto">
          <CardContent className="p-6">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                Spread the wanderlust! 🚀
              </h4>
              
              <div className="flex justify-center gap-3">
                <Button
                  onClick={handleFacebookShare}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <Facebook className="h-4 w-4" />
                  Facebook
                </Button>
                
                <Button
                  onClick={handleTwitterShare}
                  className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <Twitter className="h-4 w-4" />
                  Twitter
                </Button>
                
                <Button
                  onClick={handleCopyLink}
                  variant={copied ? "default" : "outline"}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                    copied ? "bg-green-500 hover:bg-green-600 text-white" : ""
                  }`}
                >
                  {copied ? (
                    <>
                      <Heart className="h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy Link
                    </>
                  )}
                </Button>
              </div>
              
              <div className="text-sm text-gray-500 pt-2">
                Help your friends find their dream destinations! 🌍
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}