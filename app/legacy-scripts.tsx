'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Executes all legacy <script> tags exactly once per page.
 *  – Inline scripts are evaluated via new Function.
 *  – External scripts are cloned and appended so the browser fetches & executes them.
 * After execution we dispatch a synthetic DOMContentLoaded to satisfy old code.
 */
function runLegacyScripts() {
  const scripts = Array.from(document.querySelectorAll('script'))
    .filter((s) => !(s as HTMLScriptElement).dataset.legacyDone);

  scripts.forEach((oldEl) => {
    const el = oldEl as HTMLScriptElement;
    if (el.src) {
      // External script
      const newEl = document.createElement('script');
      Array.from(el.attributes).forEach((attr) =>
        newEl.setAttribute(attr.name, attr.value),
      );
      newEl.dataset.legacyDone = 'true';
      document.body.appendChild(newEl);
    } else {
      try {
        // eslint-disable-next-line no-new-func
        new Function(el.textContent || '')();
      } catch (err) {
        console.error('Legacy inline script error:', err);
      }
      el.dataset.legacyDone = 'true';
    }
  });

  document.dispatchEvent(new Event('DOMContentLoaded', { bubbles: true }));
}

export default function LegacyScripts() {
  const pathname = usePathname();

  useEffect(() => {
    runLegacyScripts();
  }, [pathname]);

  return null;
}