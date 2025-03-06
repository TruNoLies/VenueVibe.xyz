import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Music2 } from 'lucide-react';
import { FooterSection } from './FooterSection';
import { SocialLinks } from './SocialLinks';

export function Footer() {
  const aboutLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Our Mission', href: '/mission' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
  ];

  const resourceLinks = [
    { label: 'Help Center', href: '/help' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Cookie Policy', href: '/cookies' },
  ];

  const contactLinks = [
    { label: 'Contact Us', href: '/contact' },
    { label: 'Support', href: '/support' },
    { label: 'Partnerships', href: '/partnerships' },
    { label: 'Advertise', href: '/advertise' },
  ];

  return (
    <footer className="bg-light-100 dark:bg-dark-100 border-t border-gray-200 dark:border-dark-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Music2 className="h-6 w-6 text-neon-primary" />
              <span className="font-bold text-xl gradient-text">VenueVibe</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400">
              Discover and review venues from an artist's perspective. Find the perfect stage for your next performance.
            </p>
            <SocialLinks />
          </div>

          {/* About Section */}
          <FooterSection title="About" links={aboutLinks} />

          {/* Resources Section */}
          <FooterSection title="Resources" links={resourceLinks} />

          {/* Contact Section */}
          <FooterSection title="Contact" links={contactLinks} />
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-dark-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} VenueVibe. All rights reserved.
            </p>
            <div className="flex space-x-4 text-gray-600 dark:text-gray-400">
              <Link to="/terms" className="hover:text-neon-primary">Terms</Link>
              <Link to="/privacy" className="hover:text-neon-primary">Privacy</Link>
              <Link to="/cookies" className="hover:text-neon-primary">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}