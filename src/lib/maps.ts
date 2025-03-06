import { supabase } from './supabase';

export interface LocationCoordinates {
  lat: number;
  lng: number;
}

export async function findNearbyVenues(
  coordinates: LocationCoordinates,
  radius: number = 10
) {
  const { data, error } = await supabase.rpc('find_venues_within_radius', {
    p_latitude: coordinates.lat,
    p_longitude: coordinates.lng,
    p_radius: radius
  });

  if (error) throw error;
  return data;
}

export function getDirectionsUrl(address: string, isIOS: boolean = false): string {
  const encodedAddress = encodeURIComponent(address);
  return isIOS
    ? `http://maps.apple.com/?q=${encodedAddress}`
    : `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
}

export function isIOSDevice(): boolean {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}