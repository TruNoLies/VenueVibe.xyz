import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Music2, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/Button';
import { ThemeToggle } from './ui/ThemeToggle';

export default function Navbar() {
  const { user, signOut, profile } = useAuth();
  const location = useLocation();

  return (
    <nav className="bg-light-100 dark:bg-dark-100 border-b border-gray-200 dark:border-dark-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Music2 className="h-6 w-6 text-neon-primary" />
            <span className="font-bold text-xl gradient-text">
              VenueVibe
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {user ? (
              <>
                <Link
                  to="/profile"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                    location.pathname === '/profile'
                      ? 'bg-light-200 dark:bg-dark-200 text-neon-primary'
                      : 'text-gray-700 dark:text-gray-300 hover:text-neon-primary'
                  }`}
                >
                  <User className="h-5 w-5" />
                  <span>{profile?.name}</span>
                </Link>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => signOut()}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="secondary" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}