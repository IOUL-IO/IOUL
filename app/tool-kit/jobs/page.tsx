'use client';

import React, { useEffect } from 'react';
import './styles.css';

const JOB_HTML = ``;

export default function Page() {
  useEffect(() => {
    const FWD_MIN = 94, FWD_MAX = 100;
    const REV_MIN = 32.43, REV_MAX = 36;
    const TOP_MIN = 28.5, TOP_MAX = 84;
    const DIST = 60;
    const GAP = 10;
    const DUR = 600;

    const toVw = (px: number) => px / (window.innerWidth / 100);
    const toVh = (px: number) => px / (window.innerHeight / 100);

    function move(els: HTMLDivElement[], distance: number) {
      els.forEach(el => {
        el.style.transition = `transform ${DUR}ms ease`;
        el.style.transform = `translateX(${distance}vw)`;
      });
    }

    let jobStage = 0, freelanceStage = 0, jobShifted = false;
    const jobItems = Array.from(document.querySelectorAll('.job-item')) as HTMLDivElement[];
    const jobLines = Array.from(document.querySelectorAll('.job-line')) as HTMLDivElement[];
    const freelanceItems = Array.from(document.querySelectorAll('.freelance-text')) as HTMLDivElement[];
    const freelanceLines = Array.from(document.querySelectorAll('.freelance-line')) as HTMLDivElement[];

    function toStage1() {
      move(jobItems, -DIST);
      move(jobLines, -DIST);
      jobStage = 1;
      jobShifted = true;
    }

    function toStage2() {
      move(jobItems, -2 * DIST - GAP);
      move(jobLines, -2 * DIST - GAP);
      move(freelanceItems, -DIST);
      move(freelanceLines, -DIST);
      freelanceStage = 1;
    }

    function backToStage1() {
      move(freelanceItems, 0);
      move(freelanceLines, 0);
      freelanceStage = 0;
    }

    function backToStage0() {
      move(jobItems, 0);
      move(jobLines, 0);
      jobStage = 0;
      jobShifted = false;
    }

    function handler(e: MouseEvent) {
      const xVW = toVw(e.clientX);
      const yVH = toVh(e.clientY);
      const inFwd = xVW >= FWD_MIN && xVW <= FWD_MAX && yVH >= TOP_MIN && yVH <= TOP_MAX;
      const inRev = xVW >= REV_MIN && xVW <= REV_MAX && yVH >= TOP_MIN && yVH <= TOP_MAX;

      if (inFwd) {
        if (jobStage === 0) {
          toStage1();
          e.stopPropagation();
        } else if (jobStage === 1 && freelanceStage === 0) {
          toStage2();
          e.stopPropagation();
        }
      } else if (inRev) {
        if (freelanceStage === 1) {
          backToStage1();
          e.stopPropagation();
        } else if (jobStage === 1 && freelanceStage === 0 && jobShifted) {
          backToStage0();
          e.stopPropagation();
        }
      }
    }

    document.addEventListener('mousemove', handler, true);
    return () => {
      document.removeEventListener('mousemove', handler, true);
    };
  }, []);

  return <div dangerouslySetInnerHTML={ __html: JOB_HTML } />;
}
