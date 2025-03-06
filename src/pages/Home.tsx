import React, { useState, useEffect } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { VenueMap } from '../components/maps/VenueMap';
import { LocationSearch } from '../components/maps/LocationSearch';
import { VenueCard } from '../components/features/VenueCard';
import { searchVenues } from '../lib/venues/search';
import { useGeolocation } from '../hooks/useGeolocation';
import toast from 'react-hot-toast';

export default function Home() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { coordinates, error: locationError } = useGeolocation();

  useEffect(() => {
    loadVenues();
  }, [searchQuery, coordinates]);

  async function loadVenues() {
    try {
      setLoading(true);
      const results = await searchVenues(searchQuery, {}, coordinates);
      setVenues(results);
    } catch (error) {
      toast.error('Failed to load venues');
    } finally {
      setLoading(false);
    }
  }

  function handleLocationSelect(location) {
    // Update search with selected location
    setSearchQuery(location.address);
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <PageHeader
        title="Music Venues"
        description="Discover and review venues from an artist's perspective"
        backTo="/"
        backLabel="Back to Home"
      />

      <div className="grid gap-8">
        <div className="space-y-4">
          <LocationSearch onLocationSelect={handleLocationSelect} />
          <VenueMap venues={venues} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neon-primary" />
            </div>
          ) : venues.length > 0 ? (
            venues.map(venue => (
              <VenueCard
                key={venue.id}
                {...venue}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-400">
              No venues found matching your search
            </div>
          )}
        </div>
      </div>
    </div>
  );
}