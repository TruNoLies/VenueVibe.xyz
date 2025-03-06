import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  imageUrl: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  link,
  imageUrl
}: FeatureCardProps) {
  return (
    <Link 
      to={link}
      className="block group"
    >
      <div className="card overflow-hidden hover:scale-[1.02] transition-all duration-300">
        <div className="relative h-48">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
          <div className="absolute bottom-4 left-4">
            <div className="p-2 rounded-full bg-dark-100/90 shadow-lg">
              {icon}
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-100 group-hover:text-neon-primary transition-colors">
            {title}
          </h3>
          <p className="text-gray-400 mb-4">{description}</p>
          <div className="flex items-center text-neon-primary">
            <span className="mr-2">Learn More</span>
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-2 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}