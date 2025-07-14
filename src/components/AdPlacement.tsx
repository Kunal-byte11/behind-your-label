import React from 'react';
import { AdBanner } from './AdBanner';

interface AdPlacementProps {
  position: 'header' | 'sidebar' | 'footer' | 'between-results' | 'modal';
  className?: string;
}

export const AdPlacement: React.FC<AdPlacementProps> = ({ position, className = '' }) => {
  const getAdConfig = () => {
    switch (position) {
      case 'header':
        return {
          adSlot: '1234567890', // Replace with your actual ad slot ID
          adFormat: 'horizontal' as const,
          style: { display: 'block', width: '100%', height: '90px' },
          className: 'w-full max-w-4xl mx-auto'
        };
      
      case 'sidebar':
        return {
          adSlot: '1234567891', // Replace with your actual ad slot ID
          adFormat: 'vertical' as const,
          style: { display: 'block', width: '300px', height: '250px' },
          className: 'hidden lg:block'
        };
      
      case 'footer':
        return {
          adSlot: '1234567892', // Replace with your actual ad slot ID
          adFormat: 'horizontal' as const,
          style: { display: 'block', width: '100%', height: '90px' },
          className: 'w-full max-w-4xl mx-auto'
        };
      
      case 'between-results':
        return {
          adSlot: '1234567893', // Replace with your actual ad slot ID
          adFormat: 'rectangle' as const,
          style: { display: 'block', width: '100%', height: '250px' },
          className: 'w-full max-w-md mx-auto my-4'
        };
      
      case 'modal':
        return {
          adSlot: '1234567894', // Replace with your actual ad slot ID
          adFormat: 'rectangle' as const,
          style: { display: 'block', width: '300px', height: '250px' },
          className: 'mx-auto'
        };
      
      default:
        return {
          adSlot: '1234567890',
          adFormat: 'auto' as const,
          style: { display: 'block' },
          className: ''
        };
    }
  };

  const config = getAdConfig();

  return (
    <div className={`ad-placement ad-${position} ${className}`}>
      <AdBanner
        adSlot={config.adSlot}
        adFormat={config.adFormat}
        style={config.style}
        className={config.className}
      />
    </div>
  );
};