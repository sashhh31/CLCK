'use client';

import { useEffect } from 'react';
import { fetchColorSchema } from '@/lib/contentful';

// Helper function to convert hex to RGB
function hexToRgb(hex: string): string {
  // Remove the # if present
  hex = hex.replace('#', '');
  
  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `${r}, ${g}, ${b}`;
}

export default function ColorProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const updateColors = async () => {
      try {
        const colorSchema = await fetchColorSchema();
        
        // Convert hex colors to RGB
        const primaryRgb = hexToRgb(colorSchema.primaryColor);
        const secondaryRgb = hexToRgb(colorSchema.secondaryColor);
        
        // Set the colors on the root element
        const root = document.documentElement;
        root.style.setProperty('--primary-color', primaryRgb);
        root.style.setProperty('--secondary-color', secondaryRgb);
        
        // Log the computed styles to verify
     
      } catch (error) {
        console.error('Error updating colors:', error);
      }
    };

    updateColors();
  }, []);

  return <>{children}</>;
} 