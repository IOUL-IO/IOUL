'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Execute legacy inline and external scripts while skipping
 * any Next.js runtime/hydration chunks.
 */
function runLegacyScripts() {
  const isNextRuntime = (s: HTMLScriptElement) => {
    if (s.src && s.src.startsWith('/_next/')) return true;
    const txt = s.textContent || '';
    return txt.includes('__next_f') || txt.includes('webpackChunk') || txt.includes('self.__next');
  };

  const scripts = Array.from(document.querySelectorAll('script')).filter(
    (s) => !(s as HTMLScriptElement).dataset.legacyApplied && !isNextRuntime(s as HTMLScriptElement),
  );

  scripts.forEach((el) => {
    const script = el as HTMLScriptElement;
    if (script.src) {
      const copy = document.createElement('script');
      Array.from(script.attributes).forEach((attr) =>
        copy.setAttribute(attr.name, attr.value),
      );
      copy.dataset.legacyApplied = 'true';
      document.body.appendChild(copy);
    } else {
      try {
        // eslint-disable-next-line no-new-func
        new Function(script.textContent || '')();
      } catch (err) {
        console.error('legacy inline script error', err);
      }
      script.dataset.legacyApplied = 'true';
    }
  });

  // Let legacy code that waits for DOMContentLoaded kick in.
  document.dispatchEvent(new Event('DOMContentLoaded', { bubbles: true }));

  // Fallback: if any white mask layers remain after 500 ms, fade them out.
  setTimeout(() => {
    document.querySelectorAll('.layer-one, .layer-two, .layer-three, .layer-four, .layer-five, .layer-six')
      .forEach((el) => {
        (el as HTMLElement).style.transition = 'opacity .5s ease-in-out';
        (el as HTMLElement).style.opacity = '0';
      });
  }, 500);
}

export default function LegacyScripts() {
  const pathname = usePathname();
  useEffect(() => {
    runLegacyScripts();
  }, [pathname]);
  return null;
}