import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export function SocialLinks() {
  const socialLinks = [
    { 
      icon: <Facebook className="h-5 w-5" />, 
      href: 'https://facebook.com/venuevibe',
      label: 'Facebook'
    },
    { 
      icon: <Twitter className="h-5 w-5" />, 
      href: 'https://twitter.com/venuevibe',
      label: 'Twitter'
    },
    { 
      icon: <Instagram className="h-5 w-5" />, 
      href: 'https://instagram.com/venuevibe',
      label: 'Instagram'
    },
    { 
      icon: <Youtube className="h-5 w-5" />, 
      href: 'https://youtube.com/venuevibe',
      label: 'YouTube'
    },
  ];

  return (
    <div className="flex space-x-4">
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 dark:text-gray-400 hover:text-neon-primary dark:hover:text-neon-primary transition-colors"
          aria-label={link.label}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}