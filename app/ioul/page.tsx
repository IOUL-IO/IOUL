"use client";

import React, { useEffect, useRef } from "react";

const IOULPage: React.FC = () => {
  const accountRef = useRef<HTMLElement>(null);
  const itemColumnRef = useRef<HTMLElement>(null);
  const centreColumnRef = useRef<HTMLElement>(null);

  // Infinite state: 0=account,1=items,2=centre
  let stage = 0;
  const DIST = 60; // vw shift for items
  const NEXT = 36; // vw slot

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const xVw = (e.clientX / window.innerWidth) * 100;
      const yVh = (e.clientY / window.innerHeight) * 100;
      const inFwd = xVw >= 94 && xVw <= 100 && yVh >= 28.5 && yVh <= 84;
      const inRev = xVw >= 0 && xVw <= 36 && yVh >= 28.5 && yVh <= 84;

      if (inFwd) {
        if (stage === 0 && itemColumnRef.current) {
          itemColumnRef.current.style.left = \`\${NEXT}vw\`;
          stage = 1;
        } else if (stage === 1 && itemColumnRef.current && centreColumnRef.current) {
          itemColumnRef.current.style.left = \`\${NEXT - DIST}vw\`;
          centreColumnRef.current.style.left = \`\${NEXT}vw\`;
          stage = 2;
        }
      } else if (inRev) {
        if (stage === 2 && itemColumnRef.current && centreColumnRef.current) {
          centreColumnRef.current.style.left = \`\${100 - NEXT}vw\`;
          itemColumnRef.current.style.left = \`\${NEXT}vw\`;
          stage = 1;
        } else if (stage === 1 && itemColumnRef.current && accountRef.current) {
          itemColumnRef.current.style.left = \`\${100 - NEXT}vw\`;
          // accountRef slides in with its own logic
          stage = 0;
        }
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <main>
      <section className="account-column" ref={accountRef}>
        {/* Your account items here */}
      </section>

      <div className="clip-wrapper items-wrapper">
        <section className="item-column" ref={itemColumnRef}>
          {/* Your item texts/lines here */}
        </section>
      </div>

      <div className="clip-wrapper centre-wrapper">
        <section className="centre-column" ref={centreColumnRef}>
          {/* Your centre texts/lines here */}
        </section>
      </div>
    </main>
  );
};

export default IOULPage;
