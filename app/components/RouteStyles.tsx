'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Dynamically injects a page‑scoped stylesheet so that each route
 * only loads its own /public/IOUL-login/<route>/styles.css file.
 */
export default function RouteStyles() {
  const pathname = usePathname();

  useEffect(() => {
    const relPath = pathname === '/' ? '' : pathname;
    const href = `/IOUL-login${relPath}/styles.css`;

    const id = 'route‑css';
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
