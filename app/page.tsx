'use client';

import { useEffect, useRef } from 'react';

/**
 * Login page component converted to fully‑typed TSX.
 * The DOM structure, class names, and click behaviour
 * mirror the original legacy HTML/JS exactly.
 */
export default function Page() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const utilLine = root.querySelector<HTMLDivElement>('.util-line');
    const loginText = root.querySelector<HTMLDivElement>('.login-text');
    const loginLines = root.querySelectorAll<HTMLDivElement>('.login-line');
    const openText = root.querySelector<HTMLDivElement>('.open-text');
    const helpText = root.querySelector<HTMLDivElement>('.help-text');

    const handleClick = () => {
      // replicate original slide‑out/in classes
      loginText?.classList.add('slide-out');
      loginLines.forEach((l) => l.classList.add('slide-out'));
      openText?.classList.add('slide-in');
      helpText?.classList.add('slide-in');
    };

    utilLine?.addEventListener('click', handleClick);

    return () => {
      utilLine?.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div ref={rootRef} className="login-wrapper">
      {/* top line */}
      <div className="login-line login-line--top" />
      {/* centre label */}
      <div className="login-text">LOGIN</div>
      {/* bottom line */}
      <div className="login-line login-line--bottom" />
      {/* invisible 1‑pixel util trigger */}
      <div
        className="util-line"
        role="button"
        aria-label="Utility trigger"
        tabIndex={0}
      />
      {/* elements that slide in after util‑line click */}
      <div className="open-text hidden">OPEN</div>
      <div className="help-text hidden">HELP</div>
    </div>
  );
}
