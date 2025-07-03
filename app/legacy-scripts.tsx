'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function LegacyScripts() {
  const pathname = usePathname();

  useEffect(() => {
    const scriptTags: HTMLScriptElement[] = Array.from(
      document.querySelectorAll('script')
    );
    scriptTags.forEach((tag) => {
      if (tag.src || tag.dataset.executed === 'true') return;
      const code = tag.textContent || '';
      if (!code.trim()) return;
      try {
        new Function(code)();
        tag.dataset.executed = 'true';
      } catch (err) {
        console.error('Legacy script error', err);
      }
    });

    // Some legacy code waits for DOMContentLoaded
    document.dispatchEvent(
      new Event('DOMContentLoaded', { bubbles: true, cancelable: true })
    );
  }, [pathname]);

  return null;
}
