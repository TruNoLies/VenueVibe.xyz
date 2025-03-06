export interface VenueCategory {
  id: string;
  name: string;
  description: string;
  features: string[];
}

export interface VenueDirectory {
  id: string;
  name: string;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  category: string;
  capacity: number;
  features: string[];
  amenities: string[];
  technicalSpecs: {
    sound: string[];
    lighting: string[];
    stage: {
      width: number;
      depth: number;
      height: number;
    };
  };
  accessibility: string[];
  contact: {
    phone?: string;
    email?: string;
    website?: string;
  };
  images: string[];
}