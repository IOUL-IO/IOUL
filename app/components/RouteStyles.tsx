'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Injects the route‑scoped stylesheet + a base stylesheet exactly once.
 */
export default function RouteStyles() {
  const pathname = usePathname();

  useEffect(() => {
    // always make sure base stylesheet is present
    const ensureBase = () => {
      const baseId = 'base-css';
      if (!document.getElementById(baseId)) {
        const link = document.createElement('link');
        link.id = baseId;
        link.rel = 'stylesheet';
        link.href = '/IOUL-login/styles.css';
        document.head.appendChild(link);
      }
    };

    ensureBase();

    const relPath = pathname === '/' ? '' : pathname;
    const href = `/IOUL-login${relPath}/styles.css`;

    const id = 'route-css';
    let link = document.getElementById(id) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    if (link.href !== new URL(href, window.location.origin).href) {
      link.href = href;
    }
  }, [pathname]);

  return null;
}
