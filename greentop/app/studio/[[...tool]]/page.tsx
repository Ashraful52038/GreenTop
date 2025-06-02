'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import config from '@/sanity.config';

// ✅ Fix: Ensure we're importing `NextStudio`, not `default`
const NextStudio = dynamic(() => import('next-sanity/studio').then((mod) => mod.NextStudio), { ssr: false });

export default function StudioPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Optionally render a loading state
  }

  return <NextStudio config={config} />;
}