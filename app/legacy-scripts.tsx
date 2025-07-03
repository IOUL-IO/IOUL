'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

function runLegacyScripts() {
  const scripts = Array.from(document.querySelectorAll('script'))
    .filter((s) => !(s as HTMLScriptElement).dataset.legacyApplied);

  scripts.forEach((el) => {
    const script = el as HTMLScriptElement;
    if (script.src) {
      const copy = document.createElement('script');
      Array.from(script.attributes).forEach((attr) =>
        copy.setAttribute(attr.name, attr.value)
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

  // trigger old listeners
  document.dispatchEvent(new Event('DOMContentLoaded', { bubbles: true }));
}

export default function LegacyScripts() {
  const pathname = usePathname();
  useEffect(() => {
    runLegacyScripts();
  }, [pathname]);

  return null;
}