import { VenueDirectory } from './types';
import { VENUE_IMAGES } from '../constants';

export const venueDirectory: VenueDirectory[] = [
  {
    id: 'carnegie-hall',
    name: 'Carnegie Hall',
    location: {
      address: '881 7th Avenue',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      coordinates: {
        lat: 40.7652,
        lng: -73.9799
      }
    },
    category: 'concert-hall',
    capacity: 2804,
    features: ['World-class acoustics', 'Multiple performance spaces', 'Historic venue'],
    amenities: ['Green room', 'Practice rooms', 'Recording facilities'],
    technicalSpecs: {
      sound: ['Professional sound system', 'In-house audio engineer'],
      lighting: ['Full stage lighting', 'Spotlight system'],
      stage: {
        width: 85,
        depth: 65,
        height: 40
      }
    },
    accessibility: ['Wheelchair accessible', 'Assisted listening devices'],
    contact: {
      phone: '+1-212-247-7800',
      website: 'https://www.carnegiehall.org'
    },
    images: [VENUE_IMAGES.concert[0]]
  },
  {
    id: 'blue-note',
    name: 'Blue Note Jazz Club',
    location: {
      address: '131 W 3rd St',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      coordinates: {
        lat: 40.7307,
        lng: -74.0007
      }
    },
    category: 'jazz-club',
    capacity: 200,
    features: ['Intimate jazz setting', 'Superior acoustics', 'Historic venue'],
    amenities: ['Full service bar', 'Dining available', 'Green room'],
    technicalSpecs: {
      sound: ['Jazz-optimized sound system', 'Professional monitors'],
      lighting: ['Mood lighting', 'Stage spots'],
      stage: {
        width: 20,
        depth: 15,
        height: 12
      }
    },
    accessibility: ['Wheelchair accessible'],
    contact: {
      phone: '+1-212-475-8592',
      website: 'https://www.bluenotejazz.com'
    },
    images: [VENUE_IMAGES.intimate[0]]
  }
  // Add more venues as needed
];