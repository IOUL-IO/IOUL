'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Injects a page‑scoped stylesheet located at /IOUL-login/<route>/styles.css,
 * plus once-per-app base stylesheet at /IOUL-login/styles.css (optional).
 */
export default function RouteStyles() {
  const pathname = usePathname();

  useEffect(() => {
    // Base CSS (reset, fonts, variables) — optional but recommended
    const baseHref = '/IOUL-login/styles.css';
    const baseId = 'ioul-base-css';
    if (!document.getElementById(baseId)) {
      const baseLink = document.createElement('link');
      baseLink.id = baseId;
      baseLink.rel = 'stylesheet';
      baseLink.href = baseHref;
      document.head.appendChild(baseLink);
    }

    // Route‑specific CSS
    const relPath = pathname === '/' ? '' : pathname;
    const pageHref = `/IOUL-login${relPath}/styles.css`;

    const pageId = 'ioul-page-css';
    let pageLink = document.getElementById(pageId) as HTMLLinkElement | null;
    if (!pageLink) {
      pageLink = document.createElement('link');
      pageLink.id = pageId;
      pageLink.rel = 'stylesheet';
      document.head.appendChild(pageLink);
    }
    if (pageLink.href !== new URL(pageHref, window.location.origin).href) {
      pageLink.href = pageHref;
    }
  }, [pathname]);

  return null;
}
