'use client';

import dynamic from 'next/dynamic';

// Import ColorTest with dynamic import
const ColorTest = dynamic(() => import('./ColorTest'), { ssr: false });

export default function ColorTestWrapper() {
  return <ColorTest />;
} 