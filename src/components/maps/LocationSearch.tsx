import React, { useState } from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  getDetails
} from 'use-places-autocomplete';
import { Search, MapPin, Navigation } from 'lucide-react';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

interface LocationSearchProps {
  onLocationSelect: (location: {
    lat: number;
    lng: number;
    address: string;
    details?: google.maps.places.PlaceResult;
  }) => void;
  showCurrentLocation?: boolean;
}

export function LocationSearch({ 
  onLocationSelect,
  showCurrentLocation = true
}: LocationSearchProps) {
  const [loading, setLoading] = useState(false);
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      types: ['establishment', 'geocode']
    },
    debounce: 300,
    cacheKey: 'venue-search'
  });

  const handleSelect = async (placeId: string, description: string) => {
    try {
      setLoading(true);
      setValue(description, false);
      clearSuggestions();

      const results = await getGeocode({ placeId });
      const { lat, lng } = await getLatLng(results[0]);
      
      // Get additional place details
      const details = await getDetails({
        placeId,
        fields: ['formatted_address', 'opening_hours', 'formatted_phone_number', 'website']
      });

      onLocationSelect({ lat, lng, address: description, details });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude: lat, longitude: lng } = position.coords;
          
          try {
            const results = await getGeocode({
              location: { lat, lng }
            });
            
            onLocationSelect({
              lat,
              lng,
              address: results[0].formatted_address
            });
          } catch (error) {
            console.error('Error:', error);
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          setLoading(false);
        }
      );
    }
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready || loading}
          placeholder="Search locations..."
          className="pl-10"
          aria-label="Search locations"
        />
        
        {showCurrentLocation && (
          <button
            onClick={getCurrentLocation}
            disabled={loading}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-neon-primary disabled:opacity-50"
            aria-label="Use current location"
          >
            <Navigation className="h-5 w-5" />
          </button>
        )}
      </div>
      
      {status === 'OK' && (
        <Card className="absolute z-10 w-full mt-1">
          <ul className="divide-y divide-dark-200">
            {data.map(({ place_id, description, structured_formatting }) => (
              <li
                key={place_id}
                onClick={() => handleSelect(place_id, description)}
                className="px-4 py-3 hover:bg-dark-200 cursor-pointer"
                role="option"
                aria-selected="false"
              >
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <div className="text-gray-100">
                      {structured_formatting.main_text}
                    </div>
                    <div className="text-sm text-gray-400">
                      {structured_formatting.secondary_text}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}