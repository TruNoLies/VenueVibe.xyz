export function getDirectionsUrl(
  destination: { lat: number; lng: number } | string,
  origin?: { lat: number; lng: number }
): string {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  
  if (typeof destination === 'string') {
    const encodedAddress = encodeURIComponent(destination);
    return isIOS
      ? `http://maps.apple.com/?q=${encodedAddress}`
      : `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  }

  if (origin) {
    return isIOS
      ? `http://maps.apple.com/?saddr=${origin.lat},${origin.lng}&daddr=${destination.lat},${destination.lng}`
      : `https://www.google.com/maps/dir/?api=1&origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}`;
  }

  return isIOS
    ? `http://maps.apple.com/?q=${destination.lat},${destination.lng}`
    : `https://www.google.com/maps/search/?api=1&query=${destination.lat},${destination.lng}`;
}