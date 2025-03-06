export interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

export function updateMetaTags({
  title,
  description,
  image,
  url
}: SEOProps) {
  // Update title
  document.title = `${title} | VenueVibe`;
  
  // Update meta tags
  const metaTags = {
    description,
    'og:title': title,
    'og:description': description,
    'twitter:title': title,
    'twitter:description': description,
  };
  
  if (image) {
    metaTags['og:image'] = image;
    metaTags['twitter:image'] = image;
  }
  
  if (url) {
    metaTags['og:url'] = url;
  }
  
  Object.entries(metaTags).forEach(([name, content]) => {
    let element = document.querySelector(`meta[property="${name}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute('property', name);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  });
}