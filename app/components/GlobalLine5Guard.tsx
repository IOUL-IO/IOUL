'use client';
import { useEffect } from 'react';

/** Ensures .line.fifth and .util-line sit above layer‑five on every page
 *  except where the page explicitly sets data-page="ioul".
 *  Injects an inline <style> tag that is always appended LAST to <head>,
 *  beating every bundled CSS chunk produced by Next.js routing.
 */
export default function GlobalLine5Guard() {
  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.id = 'global-line5-guard';
    styleEl.textContent = `
      :root:not([data-page="ioul"]) .line.fifth,
      :root:not([data-page="ioul"]) .util-line {
        z-index: 540 !important;
        opacity: 1 !important;
        pointer-events: auto !important;
      }
    `;
    document.head.appendChild(styleEl);
    return () => {
      styleEl.remove();
    };
  }, []);

  // nothing to render
  return null;
}