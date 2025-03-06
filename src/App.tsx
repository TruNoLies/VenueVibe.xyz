import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { MapProvider } from './components/maps/MapProvider';
import { ThemeProvider } from './contexts/ThemeContext';
import { ErrorBoundary } from './components/layout/ErrorBoundary';
import Navbar from './components/Navbar';
import { Footer } from './components/layout/Footer';
import Landing from './pages/Landing';
import Home from './pages/Home';
import VenueDetails from './pages/VenueDetails';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Reviews from './pages/Reviews';
import Feedback from './pages/Feedback';
import Messages from './pages/Messages';
import { AuthProvider } from './contexts/AuthContext';

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <ThemeProvider>
          <AuthProvider>
            <MapProvider>
              <div className="min-h-screen flex flex-col bg-white dark:bg-dark text-gray-900 dark:text-gray-100 transition-colors duration-200">
                <Navbar />
                <main className="flex-grow container mx-auto px-4 py-8">
                  <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/venues" element={<Home />} />
                    <Route path="/venues/:id" element={<VenueDetails />} />
                    <Route path="/reviews" element={<Reviews />} />
                    <Route path="/feedback" element={<Feedback />} />
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/messages/:id" element={<Messages />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                  </Routes>
                </main>
                <Footer />
                <Toaster 
                  position="top-right"
                  toastOptions={{
                    className: 'dark:bg-dark-100 dark:text-gray-100',
                    style: {
                      background: 'var(--background)',
                      color: 'var(--foreground)',
                      border: '1px solid var(--border)',
                    },
                  }}
                />
              </div>
            </MapProvider>
          </AuthProvider>
        </ThemeProvider>
      </Router>
    </ErrorBoundary>
  );
};

export default App;