import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Share2, Copy, Facebook, Link, Heart, Instagram } from 'lucide-react';

// X (formerly Twitter) Icon Component
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

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

  const handleXShare = () => {
    const xUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(xUrl, '_blank', 'width=600,height=400');
  };

  const handleInstagramShare = () => {
    // Check if we're on mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Try multiple Instagram URL schemes
      const instagramUrls = [
        'instagram://camera',
        'instagram://story-camera',
        'instagram://library'
      ];
      
      let appOpened = false;
      
      // Create a hidden iframe to test if the app opens
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      
      // Try the first URL scheme
      iframe.src = instagramUrls[0];
      
      // Set a timer to check if the app opened
      const timer = setTimeout(() => {
        if (!appOpened) {
          // App didn't open, copy text instead
          const instagramText = `${shareText}\n\n${currentUrl}`;
          navigator.clipboard.writeText(instagramText).then(() => {
            alert('인스타그램 링크가 복사되었습니다! 인스타그램에서 스토리나 게시물에 붙여넣기 하세요.');
          }).catch(() => {
            alert('인스타그램 앱을 열 수 없습니다. 수동으로 공유해주세요.');
          });
        }
        document.body.removeChild(iframe);
      }, 500);
      
      // Listen for visibility change to detect if app opened
      const handleVisibilityChange = () => {
        if (document.hidden) {
          appOpened = true;
          clearTimeout(timer);
          document.removeEventListener('visibilitychange', handleVisibilityChange);
          document.body.removeChild(iframe);
        }
      };
      
      document.addEventListener('visibilitychange', handleVisibilityChange);
      
    } else {
      // On desktop, copy text for sharing and open Instagram web
      const instagramText = `${shareText}\n\n${currentUrl}`;
      navigator.clipboard.writeText(instagramText).then(() => {
        alert('링크가 복사되었습니다! 인스타그램에서 붙여넣기 하세요.');
        // Open Instagram web
        window.open('https://www.instagram.com/', '_blank');
      });
    }
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
          <div className="flex items-center gap-2 sm:gap-3">
            <Share2 className="h-5 w-5 sm:h-6 sm:w-6 mobile-icon" />
            <span className="mobile-text-fix">✨ Share Your Adventure ✨</span>
          </div>
        </Button>
      ) : (
        <Card className="pastel-card max-w-md mx-auto">
          <CardContent className="p-6">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                Spread the wanderlust! 🚀
              </h4>
              
              <div className="flex justify-center gap-2 flex-wrap">
                <Button
                  onClick={handleFacebookShare}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center gap-2 text-sm"
                >
                  <Facebook className="h-4 w-4" />
                  Facebook
                </Button>
                
                <Button
                  onClick={handleXShare}
                  className="bg-black hover:bg-gray-800 text-white px-3 py-2 rounded-lg flex items-center gap-2 text-sm"
                >
                  <XIcon className="h-4 w-4" />
                  X
                </Button>

                <Button
                  onClick={handleInstagramShare}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-3 py-2 rounded-lg flex items-center gap-2 text-sm"
                >
                  <Instagram className="h-4 w-4" />
                  Instagram
                </Button>
                
                <Button
                  onClick={handleCopyLink}
                  variant={copied ? "default" : "outline"}
                  className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-all text-sm ${
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