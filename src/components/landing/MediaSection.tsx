import React from 'react';
import { VenueCategorySection } from '../venues/VenueCategorySection';

export function MediaSection() {
  return (
    <section className="bg-dark-100 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16 gradient-text">
          Featured Venues
        </h2>
        
        <div className="space-y-20">
          <VenueCategorySection categoryId="concert-hall" />
          <VenueCategorySection categoryId="intimate-venue" />
          <VenueCategorySection categoryId="outdoor-amphitheater" />
        </div>
      </div>
    </section>
  );
}