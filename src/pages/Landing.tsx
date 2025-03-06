import React from 'react';
import { Music2, Star, MapPin, Users, MessageSquare } from 'lucide-react';
import { FeatureCard } from '../components/landing/FeatureCard';
import { HeroSection } from '../components/landing/HeroSection';
import { MediaSection } from '../components/landing/MediaSection';
import { VENUE_IMAGES } from '../lib/constants';

export default function Landing() {
  const features = [
    {
      icon: <Music2 className="h-8 w-8 text-neon-primary" />,
      title: "Venue Discovery",
      description: "Find the perfect venues for your performances",
      link: "/venues",
      imageUrl: VENUE_IMAGES.concert[0]
    },
    {
      icon: <Star className="h-8 w-8 text-neon-secondary" />,
      title: "Artist Reviews",
      description: "Read and write authentic venue reviews",
      link: "/reviews",
      imageUrl: VENUE_IMAGES.intimate[0]
    },
    {
      icon: <MapPin className="h-8 w-8 text-neon-accent" />,
      title: "Location Search",
      description: "Explore venues in your area",
      link: "/venues",
      imageUrl: VENUE_IMAGES.outdoor[0]
    },
    {
      icon: <Users className="h-8 w-8 text-purple-400" />,
      title: "Artist Community",
      description: "Connect with other performing artists",
      link: "/venues",
      imageUrl: VENUE_IMAGES.concert[1]
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-pink-400" />,
      title: "Venue Feedback",
      description: "Share your venue experiences",
      link: "/feedback",
      imageUrl: VENUE_IMAGES.intimate[1]
    }
  ];

  return (
    <div className="min-h-screen">
      <HeroSection />
      
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-neon-primary to-neon-secondary bg-clip-text text-transparent">
          Explore Our Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      <MediaSection />
    </div>
  );
}