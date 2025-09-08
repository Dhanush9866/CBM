import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function RouteScrollTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // If a hash is present, try to scroll to that element
    if (hash) {
      const id = hash.replace('#', '');
      // Use a small timeout to ensure the target exists after route render
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
        // Fallback to top if element not found
        window.scrollTo({ top: 0, behavior: 'auto' });
      }, 0);
      return;
    }

    // Default behavior: scroll to top on pathname changes
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
}


