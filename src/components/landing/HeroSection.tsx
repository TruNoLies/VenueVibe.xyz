import React from 'react';
import { Link } from 'react-router-dom';
import { Music2 } from 'lucide-react';
import { Button } from '../ui/Button';

export function HeroSection() {
  return (
    <div className="relative min-h-[80vh] flex items-center">
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover"
        poster="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80"
      >
        <source
          src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=165&oauth2_token_id=57447761"
          type="video/mp4"
        />
      </video>
      
      <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/70 to-dark/90" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-full bg-dark-100/90 shadow-lg">
              <Music2 className="h-10 w-10 text-neon-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold gradient-text">
              VenueVibe
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Discover and review venues from an artist's perspective. Find the perfect stage for your next performance.
          </p>
          
          <div className="flex gap-4">
            <Link to="/register">
              <Button size="lg" className="shadow-neon hover:shadow-neon-hover">
                Get Started
              </Button>
            </Link>
            <Link to="/venues">
              <Button variant="secondary" size="lg">
                Explore Venues
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}