import React from 'react';
import { useSEO } from '../../hooks/useSEO';
import { useAnalytics } from '../../hooks/useAnalytics';

interface PageContainerProps {
  children: React.ReactNode;
  title: string;
  description: string;
  image?: string;
}

export function PageContainer({
  children,
  title,
  description,
  image
}: PageContainerProps) {
  useSEO({ title, description, image });
  useAnalytics();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}