import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
}

export function SEOHead({
  title = "TravelMatch - Find Your Perfect Travel Destination",
  description = "Discover your ideal travel destination with TravelMatch! Take our personalized quiz to find destinations that match your travel style, budget, and preferences. Start your perfect adventure today!",
  canonical,
  ogTitle,
  ogDescription,
  ogUrl
}: SEOHeadProps) {
  const location = useLocation();
  
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
    
    // Update canonical URL
    const canonicalUrl = canonical || `https://www.travelmatch.xyz${location.pathname}`;
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);
    
    // Update Open Graph tags
    const updateMetaProperty = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };
    
    updateMetaProperty('og:title', ogTitle || title);
    updateMetaProperty('og:description', ogDescription || description);
    updateMetaProperty('og:url', ogUrl || canonicalUrl);
    updateMetaProperty('twitter:title', ogTitle || title);
    updateMetaProperty('twitter:description', ogDescription || description);
    updateMetaProperty('twitter:url', ogUrl || canonicalUrl);
    
  }, [title, description, canonical, ogTitle, ogDescription, ogUrl, location.pathname]);
  
  return null; // This component doesn't render anything
}
