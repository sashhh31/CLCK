'use client';

import { useEffect, useState } from 'react';

export default function ColorTest() {
  const [colors, setColors] = useState({
    primaryColor: '',
    secondaryColor: ''
  });

  useEffect(() => {
    // Function to get computed CSS variables
    const getComputedColors = () => {
      const computedStyle = getComputedStyle(document.documentElement);
      const primaryColor = computedStyle.getPropertyValue('--primary-color').trim();
      const secondaryColor = computedStyle.getPropertyValue('--secondary-color').trim();
      
      setColors({
        primaryColor,
        secondaryColor
      });
    };

    // Get colors initially
    getComputedColors();

    // Set up an observer to check for CSS variable changes
    const observer = new MutationObserver(getComputedColors);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="p-4 border rounded shadow-sm">
      <h3 className="text-lg font-bold mb-2">Current Color Values</h3>
      <div className="mb-2">
        <span className="font-semibold">Primary Color (RGB): </span>
        <span>{colors.primaryColor}</span>
        <div 
          className="w-20 h-8 mt-1 bg-primary border" 
          title={`rgb(${colors.primaryColor})`}
        ></div>
      </div>
      <div>
        <span className="font-semibold">Secondary Color (RGB): </span>
        <span>{colors.secondaryColor}</span>
        <div 
          className="w-20 h-8 mt-1 bg-secondary border" 
          title={`rgb(${colors.secondaryColor})`}
        ></div>
      </div>
    </div>
  );
} 