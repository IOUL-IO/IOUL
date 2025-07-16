"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react';

import Head from 'next/head';


const IOULPage: React.FC = () => {
  // util-line toggle state
  const [utilState, setUtilState] = useState(0);
  const showMail = utilState === 1;
  const showCalendar = utilState === 2;
  const showLines = utilState !== 2;
  const handleUtilLineClick = useCallback(() => setUtilState(s => (s + 1) % 3), []);
  useEffect(() => { document.title = 'IOUL'; }, []);

  const [currentMenu, setCurrentMenu] = useState<string | null>(null);
  const [slideState, setSlideState] = useState("none");
  const [pageFadedIn, setPageFadedIn] = useState(false);
  const chatTextRef = useRef<HTMLSpanElement | null>(null);
  const hoverAreaRef = useRef<HTMLDivElement | null>(null);
  const pageContentRef = useRef<HTMLDivElement | null>(null);
  
  const [state, setState] = useState(0); // 0 = baseline (lines visible, others hidden)
  const [showMail, setShowMail] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showLines, setShowLines] = useState(true);

  const EDGE_MARGIN = 11;

  const targetsRef = useRef<(HTMLElement | null)[]>([]); // Reference to target elements

  const [itemStage, setItemStage] = useState(0);  // 0 = hidden, 1 = visible (left column), 2 = shifted left / clipped
  const [centerStage, setCenterStage] = useState(0);  // 0 = hidden, 1 = visible (center column)
  const [animating, setAnimating] = useState(false);

  const itemElsRef = useRef<NodeListOf<HTMLElement> | null>(null);
  const centerElsRef = useRef<NodeListOf<HTMLElement> | null>(null);

  const FWD_MIN = 94, FWD_MAX = 100;   // forward trigger (right edge)
  const REV_MIN = 32.43, REV_MAX = 36;  // reverse trigger (left edge)
  const TOP_MIN = 28.5, TOP_MAX = 84;   // vertical bounds
  const DIST = 60;
  const GAP = 10;                   // horizontal shift in vw
  const DUR = 600;                  // transition duration in ms
  const STAGGER = 0;                // delay between outgoing and incoming groups in ms

  // Helper unit conversions
  const vw = () => window.innerWidth / 100;
  const vh = () => window.innerHeight / 100;
  const toVw = (px: number) => px / vw();
  const toVh = (px: number) => px / vh();


  const updateVisibility = () => {
    const textEls = Array.from(document.querySelectorAll<HTMLElement>('.item-text'));
    const lineEls = Array.from(document.querySelectorAll<HTMLElement>('.item-line'));
    const targets = textEls.concat(lineEls);
    targets.forEach(el => {
      const rect = el.getBoundingClientRect();
      const l = toVw(rect.left);
      const t = toVh(rect.top);
      const hide = l < 28.86 && t >= 28.5 && t <= 84;
      el.style.opacity = hide ? '0' : '';
      el.style.pointerEvents = hide ? 'none' : '';
    });
  };

  useEffect(() => {
    // Set base positions and update visibility on resize
    window.addEventListener('resize', updateVisibility);
    updateVisibility(); // Initial visibility update

    return () => {
      window.removeEventListener('resize', updateVisibility); // Clean up resize event listener
    };
  }, []);
  // Util-line click toggle: cycle mail → calendar → none
  useEffect(() => {
    const utilLineEl = document.querySelector<HTMLElement>('.line.util-line');
    let count = 0;
    const onClick = () => {
      count = (count + 1) % 3;
      document.documentElement.setAttribute('data-util', count.toString());
    };
    utilLineEl?.addEventListener('click', onClick);
    // Initialize state
    document.documentElement.setAttribute('data-util', '0');
    return () => {
      utilLineEl?.removeEventListener('click', onClick);
    };
  }, []);

  
    // Update view based on the current state
  const updateView = () => {
    if (state === 0) {
      setShowMail(false);
      setShowCalendar(false);
      setShowLines(true);
    } else if (state === 1) {
      setShowMail(true);
      setShowCalendar(false);
      setShowLines(true);
    } else if (state === 2) {
      setShowMail(false);
      setShowCalendar(true);
      setShowLines(false);
    }
  };

  // Trigger update when state changes
  useEffect(() => {
    updateView();
  }, [state]);

  // Sync showMail, showCalendar, showLines with util state
  useEffect(() => {
    setShowMail(state === 1);
    setShowCalendar(state === 2);
    setShowLines(state !== 2);
  }, [state]);

  // Handle the click on util lines
  const handleUtilLineClick = useCallback(() => {
    setState(prev => (prev + 1) % 3);
  }, []);
  // Sync data-util attribute for CSS toggles
  useEffect(() => {
    document.documentElement.setAttribute('data-util', state.toString());
  }, [state]);

  // Sync showMail, showCalendar, showLines with util state
  useEffect(() => {
    setShowMail(state === 1);
    setShowCalendar(state === 2);
    setShowLines(state !== 2);
  }, [state]);


  const quickRemoveSubmenu = () => {
    const newTexts = document.querySelectorAll<HTMLSpanElement>('.new-text');
    newTexts.forEach((span) => {
      span.style.transition = 'opacity 0.1s ease';
      span.classList.remove('visible');
    });
    setTimeout(() => {
      newTexts.forEach((span) => span.remove());
    }, 100);
  };

  // Function that ensures submenu is closed before executing a callback function
  const forceCloseSubmenuThen = (fn: Function) => {
    if (slideState !== "none") {
      quickRemoveSubmenu();
      setTimeout(() => fn(), 100);  // Ensures submenu is closed before executing callback
    } else {
      fn();  // If no submenu, just execute the function directly
    }
  };

    // Handle the sliding of sibling menu items
  const slideDownSiblings = (clickedId: string) => {
    const menuItems = Array.from(document.querySelectorAll('.menu-items .menu-item')) as HTMLElement[];
    const clickedIndex = menuItems.findIndex(el => el.id === clickedId);
    
    menuItems.forEach((el, i) => {
      if (i > clickedIndex) {
        el.classList.remove("menu-slide", "slide-down");
        el.style.transform = "";
        el.style.transition = "";
        void el.offsetHeight; // Trigger reflow for animation
        el.classList.add("menu-slide");
      }
    });

    requestAnimationFrame(() => {
      menuItems.forEach((el, i) => {
        if (i > clickedIndex) {
          el.classList.add("slide-down");
        }
      });
    });
  };

  // Add new text as a submenu item
  const addNewText = (text: string, topVH: number, leftVW: number) => {
    if (slideState !== "menu") return;

    const span = document.createElement("span");
    span.className = "custom-text new-text";
    span.style.top = `${topVH}vh`;
    span.style.left = `${leftVW}vw`;
    span.textContent = text;
    document.querySelector(".other-content")?.appendChild(span);
    
    setTimeout(() => {
      span.classList.add("visible");
    }, 10);
  };

  // Open specific menus
  const openOnlineAssets = () => {
    slideDownSiblings("online-assets");
    setTimeout(() => {
      addNewText("- cMS", 40.1, 6.4);
      addNewText("- LMS", 44.1, 6.4);
    }, 700);
  };

  const openLinkupCenter = () => {
    slideDownSiblings("linkup-center");
    setTimeout(() => {
      addNewText("- cOM", 47.2, 6.4);
      addNewText("- JOB", 51.2, 6.4);
      addNewText("- HR", 55.2, 6.4);
    }, 700);
  };

  const openDeliveryLine = () => {
    slideDownSiblings("delivery-line");
    setTimeout(() => {
      addNewText("- cRM", 54.3, 6.4);
      addNewText("- OPS", 58.3, 6.4);
    }, 700);
  };

  const openInternalUnit = () => {
    slideDownSiblings("internal-unit");
    setTimeout(() => {
      addNewText("- 1nV", 61.4, 6.4);
      addNewText("- FMS", 65.4, 6.4);
      addNewText("- 1T", 69.4, 6.4);
    }, 700);
  };

  // Handle the click event for each menu item
  const handleMenuClick = (menuId: string, openFunction: () => void) => {
    if (currentMenu === menuId) {
      closeSubmenu();
    } else {
      if (currentMenu) {
        closeSubmenu();
        setTimeout(() => {
          openFunction();
          setCurrentMenu(menuId);
        }, 300);
      } else {
        openFunction();
        setCurrentMenu(menuId);
      }
    }
  };

  // Close the submenu
  const closeSubmenu = () => {
    const newTexts = document.querySelectorAll<HTMLSpanElement>('.new-text');
    newTexts.forEach((span) => {
      span.style.transition = 'opacity 0.3s ease';
      span.classList.remove('visible');
    });

    setTimeout(() => {
      newTexts.forEach((span) => span.remove());
    }, 300);
  };

   const [isScrolling, setIsScrolling] = useState(false);
   const [isFirstScroll, setIsFirstScroll] = useState(true);
   const [isSecondScroll, setIsSecondScroll] = useState(false);

   const numbers1to16Ref = useRef<NodeListOf<HTMLElement> | null>(null);
   const numbers17to31Ref = useRef<NodeListOf<HTMLElement> | null>(null);
   const dashed1to16Ref = useRef<NodeListOf<HTMLElement> | null>(null);
   const dashed17to31Ref = useRef<NodeListOf<HTMLElement> | null>(null);

  // Effect to handle component mount and query DOM elements
// runs once on mount
useEffect(() => {
  numbers1to16Ref.current = document.querySelectorAll(
    '.grid-number.num1, .grid-number.num2, … , .grid-number.num16'
  );
  numbers17to31Ref.current = document.querySelectorAll(
    '.grid-number.num17, … , .grid-number.num31'
  );
  dashed1to16Ref.current = document.querySelectorAll(
    '.grid-dashed.dashed1, … , .grid-dashed.dashed16'
  );
  dashed17to31Ref.current = document.querySelectorAll(
    '.grid-dashed.dashed17, … , .grid-dashed.dashed31'
  );
}, []);

// re-runs when scrolling flags change
useEffect(() => {
  const scrollArea = document.createElement('div');
  scrollArea.style.position = 'absolute';
  scrollArea.style.top = '28.5vh';
  scrollArea.style.left = '36vw';
  scrollArea.style.width = '58vw';
  scrollArea.style.height = '55.5vh';
  scrollArea.style.zIndex = '5';
  document.querySelector('.other-content')!.appendChild(scrollArea);

  function onWheel(e: WheelEvent) {
    e.preventDefault();
    if (isScrolling) return;
    setIsScrolling(true);
    setTimeout(() => setIsScrolling(false), 700);

    const nums1 = numbers1to16Ref.current || [];
    const nums2 = numbers17to31Ref.current || [];
    const das1 = dashed1to16Ref.current || [];
    const das2 = dashed17to31Ref.current || [];
    const all = [
      ...Array.from(nums1),
      ...Array.from(nums2),
      ...Array.from(das1),
      ...Array.from(das2),
    ];
    all.forEach(el => (el.style.transition = 'transform 0.7s ease'));

    if (e.deltaY > 0) {
      if (!isSecondScroll) {
        all.forEach(el => (el.style.transform = 'translateY(-55.5vh)'));
        setIsSecondScroll(true);
      } else {
        all.forEach(el => (el.style.transform = 'translateY(-111vh)'));
        setIsSecondScroll(false);
      }
    } else {
      const match = all[0]?.style.transform.match(/translateY\(([-\d.]+)vh\)/);
      const y = match ? parseFloat(match[1]) : 0;
      if (y === -111) {
        all.forEach(el => (el.style.transform = 'translateY(-55.5vh)'));
        setIsSecondScroll(true);
      } else if (y === -55.5) {
        all.forEach(el => (el.style.transform = 'translateY(0)'));
        setIsSecondScroll(false);
      }
    }
  }

  scrollArea.addEventListener('wheel', onWheel, { passive: false });
  return () => {
    scrollArea.removeEventListener('wheel', onWheel);
    scrollArea.remove();
  };
}, [isScrolling, isSecondScroll]);


// ─── Unified click effect ───────────────────────────────────────────────────
useEffect(() => {
  const handleEdgeClick = (event: MouseEvent) => {
    // ignore clicks on actual menu items or chat-text itself
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.closest('.menu-item') || target.closest('.chat-text')) return;
    const { clientX: x, clientY: y } = event;
    const { innerWidth: width, innerHeight: height } = window;
    const vw = width / 100;
    const vh = height / 100;

    const inLeftZone  = x >= 0          && x <= 6.37  * vw && y >= 28.5 * vh && y <= 84 * vh;
    const inRightZone = x >= 28.86 * vw && x <= 32.43 * vw && y >= 28.5 * vh && y <= 84 * vh;

    if (inLeftZone) {
      // ── Left edge clicks ─────────────────────────
      switch (slideState) {
        case "none":
          // fade out chat, slide in account+heading
          chatTextRef.current?.style.setProperty("transition", "opacity 0.1s ease");
          chatTextRef.current!.style.opacity = "0";
          setTimeout(() => {
            document.querySelectorAll<HTMLElement>('.account-container[data-slide-group="account"]')
              .forEach(box => box.style.transform = "translateX(0)");
            document.querySelectorAll<HTMLElement>('.heading-container[data-slide-group="heading"]')
              .forEach(box => box.style.transform = "translateX(0)");
          }, 110);
          setSlideState("heading");
          break;

        case "community":
          // slide community+zero back to menu-position
          document.querySelectorAll<HTMLElement>('.community-items-container *')
            .forEach(el => el.style.left = el.dataset.originalLeft!);
          document.querySelectorAll<HTMLElement>('.zero-items-container *')
            .forEach(el => el.style.left = el.dataset.originalLeft!);
          setSlideState("menu");
          break;

        case "menu":
          // slide menu back to heading-position
          document.querySelectorAll<HTMLElement>('.menu-items .menu-item')
            .forEach(el => el.style.left = el.dataset.originalLeft!);
          setSlideState("heading");
          break;

        case "heading":
          // slide account+heading back out, fade chat in
          document.querySelectorAll<HTMLElement>('.account-container[data-slide-group="account"]')
            .forEach(box => {
              box.style.transition = "transform 0.7s ease";
              box.style.transform = `translateX(${box.dataset.offset}vw)`;
            });
          document.querySelectorAll<HTMLElement>('.heading-container[data-slide-group="heading"]')
            .forEach(box => {
              box.style.transition = "transform 0.7s ease";
              box.style.transform = `translateX(${box.dataset.offset}vw)`;
            });
          chatTextRef.current?.style.setProperty("transition", "opacity 0.1s ease");
          chatTextRef.current!.style.opacity = "1";
          setSlideState("none");
          break;
      }
    }
    else if (inRightZone) {
      // ── Right edge clicks ────────────────────────
      switch (slideState) {
        case "heading":
          // inverse of first left-click: slide out and fade chat in
          document.querySelectorAll<HTMLElement>('.account-container[data-slide-group="account"]')
            .forEach(box => {
              box.style.transition = "transform 0.7s ease";
              box.style.transform = `translateX(${box.dataset.offset}vw)`;
            });
          document.querySelectorAll<HTMLElement>('.heading-container[data-slide-group="heading"]')
            .forEach(box => {
              box.style.transition = "transform 0.7s ease";
              box.style.transform = `translateX(${box.dataset.offset}vw)`;
            });
          chatTextRef.current?.style.setProperty("transition", "opacity 0.1s ease");
          chatTextRef.current!.style.opacity = "1";
          setSlideState("none");
          break;

        case "none":
          // first menu click
          document.querySelectorAll<HTMLElement>('.menu-items .menu-item')
            .forEach(el => {
              el.dataset.originalLeft = el.style.left;
              el.style.transition = "left 0.7s ease";
              el.style.left = "6.41vw";
            });
          setSlideState("menu");
          break;

        case "menu":
          // second menu/community click
          document.querySelectorAll<HTMLElement>('.menu-items .menu-item')
            .forEach(el => {
              el.style.left = (parseFloat(el.dataset.originalLeft!) - 29) + "vw";
            });
          document.querySelectorAll<HTMLElement>('.community-items-container *')
            .forEach(el => {
              el.dataset.originalLeft ||= el.style.left;
              el.style.transition = "left 0.7s ease";
              el.style.left = (parseFloat(el.style.left) - 29) + "vw";
            });
          document.querySelectorAll<HTMLElement>('.zero-items-container *')
            .forEach(el => {
              el.dataset.originalLeft ||= el.style.left;
              el.style.transition = "left 0.7s ease";
              el.style.left = (parseFloat(el.style.left) - 29) + "vw";
            });
          setSlideState("community");
          break;

        case "community":
          // optional: return from community to none
          document.querySelectorAll<HTMLElement>('.menu-items .menu-item')
            .forEach(el => el.style.left = el.dataset.originalLeft!);
          setSlideState("none");
          break;
      }
    }
  };

  document.addEventListener("click", handleEdgeClick, true);
  return () => {
    document.removeEventListener("click", handleEdgeClick, true);
  };
}, [slideState]);


        useEffect(() => {
    const HIDE_MIN = 6.37, HIDE_MAX = 28.86;
    const TOP_MIN = 28.5, TOP_MAX = 84;
    const CLICK_MIN = 32.43, CLICK_MAX = 36;
    const REVERSE_MIN = 94, REVERSE_MAX = 100;
    const DISTANCE = 60, DURATION = 700;

    // Helper functions for px to vw and vh conversions
    const pxToVw = (px: number) => px / (window.innerWidth / 100);
    const pxToVh = (px: number) => px / (window.innerHeight / 100);

    // Set the base left position (vw) for each target element


    // Gather account text and line elements



    const accountEls = Array.from(document.querySelectorAll<HTMLElement>('.account-text'));



    const accountLine = document.querySelector<HTMLElement>('.account-line');



    if (accountLine) {



      targetsRef.current = [...accountEls, accountLine];



    } else {



      targetsRef.current = accountEls;



    }

    targetsRef.current.forEach(el => {
      if (!el.dataset.baseLeftVw) {
        const leftPx = parseFloat(getComputedStyle(el).left) || 0;
        el.dataset.baseLeftVw = pxToVw(leftPx).toString();
      }
    });

    // Update visibility of targets based on their positions
    const updateVisibility = () => {
      targetsRef.current.forEach(el => {
        const r = el.getBoundingClientRect();
        const l = pxToVw(r.left), t = pxToVh(r.top);
        const hide = l >= HIDE_MIN && l < HIDE_MAX && t >= TOP_MIN && t <= TOP_MAX;
        el.style.opacity = hide ? '0' : '';
        el.style.pointerEvents = hide ? 'none' : '';
      });
    };

    updateVisibility();
    window.addEventListener('resize', updateVisibility);

    let sliding = false;

    // Slide elements once
    const slideOnce = () => {
      if (sliding || targetsRef.current[0]?.dataset.slid === 'true') return;
      sliding = true;

      targetsRef.current.forEach(el => {
        el.style.opacity = '';
        el.style.pointerEvents = '';
      });

      targetsRef.current.forEach(el => {
        const base = parseFloat(el.dataset.baseLeftVw || '0');
        el.style.transition = `left ${DURATION}ms ease`;
        el.style.left = `${base + DISTANCE}vw`;
        el.dataset.slid = 'true';
      });

      setTimeout(() => {
        updateVisibility();
        sliding = false;
      }, DURATION);
    };

    // Slide elements back
    const slideBack = () => {
      if (sliding || targetsRef.current[0]?.dataset.slid !== 'true') return;
      sliding = true;

      targetsRef.current.forEach(el => {
        const base = parseFloat(el.dataset.baseLeftVw || '0');
        el.style.transition = `left ${DURATION}ms ease`;
        el.style.left = `${base}vw`;
        delete el.dataset.slid;
      });

      setTimeout(() => {
        updateVisibility();
        sliding = false;
      }, DURATION);
    };

    // Click listener for the page
    const handleClick = (e: MouseEvent) => {
      const vw = pxToVw(e.clientX), vh = pxToVh(e.clientY);
      if (vw >= CLICK_MIN && vw <= CLICK_MAX) {
        slideOnce();
      } else if (vw >= REVERSE_MIN && vw <= REVERSE_MAX && vh >= TOP_MIN && vh <= TOP_MAX) {
        slideBack();
      }
    };

    document.addEventListener('click', handleClick);

    // Stop propagation for slide actions
    document.querySelectorAll('.slide-trigger, .slide-triggers, .slide-container').forEach(el => {
      el.addEventListener('click', e => {
        e.stopPropagation();
        slideOnce();
      });
    });

    document.querySelectorAll('.slide-trigger-reverse').forEach(el => {
      el.addEventListener('click', e => {
        e.stopPropagation();
        slideBack();
      });
    });

            return () => {
    document.removeEventListener('click', handleClick);
    // (and any other listeners you attached in this effect)
  };
}, [/* slideState, or whatever deps this effect really needs */]);

           useEffect(() => {
    if (itemElsRef.current && centerElsRef.current) {
      Array.from(itemElsRef.current).concat(Array.from(centerElsRef.current)).forEach(el => {
        if (!el.dataset.baseLeftVw) {
          const leftPx = parseFloat(getComputedStyle(el).left) || 0;
          el.dataset.baseLeftVw = toVw(leftPx).toString();
        }
      });
    }
  }, []);

  // Reusable move function for transitions
  const move = (els: NodeListOf<HTMLElement>, offset: number) => {
    els.forEach((el) => {
      const base = parseFloat(el.dataset.baseLeftVw || '0');
      el.style.transition = `left ${DUR}ms ease`;
      el.style.left = `${base + offset}vw`;
    });
  };

  // Stage transitions
  const toStage1 = () => {
    if (animating) return;
    setAnimating(true);
    move(itemElsRef.current, -DIST);
    setTimeout(() => {
      setAnimating(false);
      setItemStage(1);
    }, DUR);
  };

  const toStage2 = () => {
    if (animating) return;
    setAnimating(true);
    move(itemElsRef.current, -2 * DIST - GAP); // items out first
    move(centerElsRef.current, -DIST - GAP); // center follows
    setTimeout(() => {
      setAnimating(false);
      setItemStage(2);
      setCenterStage(1);
    }, DUR + STAGGER);
  };

  const backToStage1 = () => {
    if (animating) return;
    setAnimating(true);
    move(centerElsRef.current, 0); // center leaves first
    move(itemElsRef.current, -DIST); // items return after delay
    setTimeout(() => {
      setAnimating(false);
      setItemStage(1);
      setCenterStage(0);
    }, DUR + STAGGER);
  };

  const backToStage0 = () => {
    if (animating) return;
    setAnimating(true);
    move(itemElsRef.current, 0);
    setTimeout(() => {
      setAnimating(false);
      setItemStage(0);
    }, DUR);
  };

  // Handle the click event for forward and reverse triggers
useEffect(() => {
  function handleClick(e: MouseEvent) {
    const vw = (px: number) => px / (window.innerWidth / 100);
    const vh = (px: number) => px / (window.innerHeight / 100);
    const xVw = vw(e.clientX);
    const yVh = vh(e.clientY);
    const inFwd = xVw >= FWD_MIN && xVw <= FWD_MAX && yVh >= TOP_MIN && yVh <= TOP_MAX;
    const inRev = xVw >= REV_MIN && xVw <= REV_MAX && yVh >= TOP_MIN && yVh <= TOP_MAX;

    if (inFwd) {
      if (itemStage === 0) {
        toStage1();
      } else if (itemStage === 1 && centerStage === 0) {
        toStage2();
      }
    } else if (inRev) {
      if (centerStage === 1) {
        backToStage1();
      } else if (itemStage === 1 && centerStage === 0) {
        backToStage0();
      }
    }
  }

  document.addEventListener('click', handleClick, true);
  return () => {
    document.removeEventListener('click', handleClick, true);
  };
}, [slideState, itemStage, centerStage]);


  return (
    <div className="non-fullscreen" translate="no">
      <p style={{ display: 'none' }} lang="en">This page is already in English. No translation is needed.</p>

      <div className="layer-one" />
      <div className="layer-two" />
      <div className="layer-three" />

      <div className="page-content">
        <div className="menu-items">
          <span className="custom-text menu-item" style={{ top: '36.1vh', left: '29vw' }} id="online-assets">OnL1nE ASSETS:</span>
          <span className="custom-text menu-item" style={{ top: '43.2vh', left: '29vw' }} id="linkup-center">L1nKUP cEnTER:</span>
          <span className="custom-text menu-item" style={{ top: '50.3vh', left: '29vw' }} id="delivery-line">DEL1VERY L1nE:</span>
          <span className="custom-text menu-item" style={{ top: '57.4vh', left: '29vw' }} id="internal-unit">1nTERnAL Un1T:</span>
        </div>

        <div className="layer-four" />

        <div className="community-items-container" style={{ position: 'absolute', zIndex: 1 }}>
          <span style={{ position: 'absolute', top: '35.4vh', left: '35.41vw', zIndex: 1, fontFamily: "'Distill Expanded', sans-serif", color: '#111111', letterSpacing: '0.28vw', fontSize: '0.47rem', textShadow: '0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171', transition: 'left 0.7s ease', lineHeight: 1.6, overflow: 'visible' }}>cOMMUn1T1ES</span>
          <span style={{ position: 'absolute', top: '41.6vh', left: '35.41vw', zIndex: 1, fontFamily: "'Distill Expanded', sans-serif", color: '#111111', letterSpacing: '0.28vw', fontSize: '0.47rem', textShadow: '0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171', transition: 'left 0.7s ease', lineHeight: 1.6, overflow: 'visible' }}>OUR L1BRARY</span>
          <span style={{ position: 'absolute', top: '53vh', left: '35.41vw', zIndex: 1, fontFamily: "'Distill Expanded', sans-serif", color: '#111111', letterSpacing: '0.28vw', fontSize: '0.47rem', textShadow: '0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171', transition: 'left 0.7s ease', lineHeight: 1.6, overflow: 'visible' }}>ADD-On SHOP</span>
          <span style={{ position: 'absolute', top: '59.2vh', left: '35.41vw', zIndex: 1, fontFamily: "'Distill Expanded', sans-serif", color: '#111111', letterSpacing: '0.28vw', fontSize: '0.47rem', textShadow: '0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171', transition: 'left 0.7s ease', lineHeight: 1.6, overflow: 'visible' }}>1OUL cEnTER</span>
          <div className="custom-line" style={{ position: 'absolute', top: '47.8vh', left: '35.41vw', width: '22.48vw', height: '1px', backgroundColor: 'rgba(230,230,230,0.28)', transition: 'left 0.7s ease, transform 0.7s ease', zIndex: 1 }} />
        </div>

        <div className="zero-items-container" style={{ position: 'absolute', zIndex: 1 }}>
          <span className="right-flow" style={{ position: 'absolute', top: '35.4vh', left: '57.4vw', zIndex: 1, fontFamily: "'Distill Expanded', sans-serif", color: '#111111', letterSpacing: '0.28vw', fontSize: '0.47rem', textShadow: '0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171', transition: 'left 0.7s ease', lineHeight: 1.6, overflow: 'visible' }}>0</span>
          <span className="right-flow" style={{ position: 'absolute', top: '41.6vh', left: '57.4vw', zIndex: 1, fontFamily: "'Distill Expanded', sans-serif", color: '#111111', letterSpacing: '0.28vw', fontSize: '0.47rem', textShadow: '0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171', transition: 'left 0.7s ease', lineHeight: 1.6, overflow: 'visible' }}>0</span>
          <span className="right-flow" style={{ position: 'absolute', top: '53vh', left: '57.4vw', zIndex: 1, fontFamily: "'Distill Expanded', sans-serif", color: '#111111', letterSpacing: '0.28vw', fontSize: '0.47rem', textShadow: '0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171', transition: 'left 0.7s ease', lineHeight: 1.6, overflow: 'visible' }}>0</span>
          <span className="right-flow" style={{ position: 'absolute', top: '59.2vh', left: '57.4vw', zIndex: 1, fontFamily: "'Distill Expanded', sans-serif", color: '#111111', letterSpacing: '0.28vw', fontSize: '0.47rem', textShadow: '0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171', transition: 'left 0.7s ease', lineHeight: 1.6, overflow: 'visible' }}>0</span>
        </div>

        <div className="other-content">
          <div className="line original" />
          <div className="line second" />
          <div className="line util-line" onClick={handleUtilLineClick}  onClick={handleUtilLineClick}/>
          <div className="line third" />
          <div className="line fourth" />
          <div className="line fifth" />
          <div className="line mail-line" style={{ position: 'absolute', top: '47.8vh', left: '36vw', width: '57.8vw', height: '1px', backgroundColor: 'rgba(230,230,230,0.28)', opacity: 0, transition: 'opacity 0.3s ease', zIndex: 1 }} />
          <div className="line sixth" />
        </div>

        <div className="slide-container">
          <span className="account-text" style={{position:'absolute',top:'35.4vh',left:'-24.00vw'}}>AccOUnT nAME</span>
          <span className="account-text" style={{position:'absolute',top:'35.4vh',left:'26.00vw'}}>L1nK UP</span>
          <span className="account-text right-flow" style={{position:'absolute',top:'35.4vh',left:'33.19vw'}}>0</span>
          <span className="account-text" style={{position:'absolute',top:'77vh',left:'-24.00vw',color:'#111111'}}>. . .</span>
        <div className="line account-line" style={{position:'absolute',top:'41.6vh',left:'-24.00vw',width:'57.8vw',height:'1px',backgroundColor:'rgba(230,230,230,0.28)',zIndex:1}} />
        </div>
        
        <div className="item-line item-line-one" style={{position:'absolute',top:'47.8vh',left:'96vw',width:'36vw'}} />
        <div className="item-line item-line-two" style={{position:'absolute',top:'47.8vh',left:'139vw',width:'14.8vw'}} />
        
        <div className="center-line center-line-one" style={{position:'absolute',top:'47.8vh',left:'106.0vw',width:'36vw'}} />
        <div className="center-line center-line-two" style={{position:'absolute',top:'47.8vh',left:'149.0vw',width:'14.8vw'}} />


        <span className="center-text" style={{position:'absolute',top:'35.4vh',left:'106.0vw'}}>UPDATES</span>
        <span className="center-text" style={{position:'absolute',top:'41.6vh',left:'106.0vw'}}>cATALOg</span>

        <span className="center-text right-flow" style={{position:'absolute',top:'35.4vh',left:'119.0vw'}}>0</span>
        <span className="center-text right-flow" style={{position:'absolute',top:'41.6vh',left:'119.0vw'}}>0</span>

        <span className="center-text" style={{position:'absolute',top:'35.4vh',left:'128.0vw'}}>T1cKETS</span>
        <span className="center-text" style={{position:'absolute',top:'41.6vh',left:'128.0vw'}}>cOnTAcT</span>

        <span className="center-text right-flow" style={{position:'absolute',top:'35.4vh',left:'141.0vw'}}>0</span>
        <span className="center-text right-flow" style={{position:'absolute',top:'41.6vh',left:'141.0vw'}}>0</span>

        <span className="center-text" style={{position:'absolute',top:'35.4vh',left:'149.0vw'}}>gET APP</span>
        <span className="center-text" style={{position:'absolute',top:'41.6vh',left:'149.0vw'}}>AP1-LOg</span>

        <span className="center-text right-flow" style={{position:'absolute',top:'35.4vh',left:'163.4vw'}}>0</span>
        <span className="center-text right-flow" style={{position:'absolute',top:'41.6vh',left:'163.4vw'}}>0</span>

        <span className="center-text" style={{position:'absolute',top:'53vh',left:'149.0vw'}}>LOg 0.01</span>
        <span className="center-text" style={{position:'absolute',top:'59.2vh',left:'149.0vw'}}>LOg 0.02</span>
        <span className="center-text" style={{position:'absolute',top:'65.4vh',left:'149.0vw'}}>LOg 0.03</span>
        <span className="center-text" style={{position:'absolute',top:'71.6vh',left:'149.0vw'}}>LOg 0.04</span>

        <span className="center-text right-flow" style={{position:'absolute',top:'53vh',left:'163.4vw'}}>0</span>
        <span className="center-text right-flow" style={{position:'absolute',top:'59.2vh',left:'163.4vw'}}>0</span>
        <span className="center-text right-flow" style={{position:'absolute',top:'65.4vh',left:'163.4vw'}}>0</span>
        <span className="center-text right-flow" style={{position:'absolute',top:'71.6vh',left:'163.4vw'}}>0</span>

        <span className="center-text" style={{position:'absolute',top:'53vh',left:'106.0vw'}}>LATEST</span>
        <span className="center-text" style={{position:'absolute',top:'59.2vh',left:'106.0vw'}}>V1RALS</span>

        <span className="center-text right-flow" style={{position:'absolute',top:'53vh',left:'119.0vw'}}>0</span>
        <span className="center-text right-flow" style={{position:'absolute',top:'59.2vh',left:'119.0vw'}}>0</span>

        <span className="center-text" style={{position:'absolute',top:'53vh',left:'128.0vw'}}>cAREERS</span>
        <span className="center-text" style={{position:'absolute',top:'59.2vh',left:'128.0vw'}}>ARcH1VE</span>

        <span className="center-text right-flow" style={{position:'absolute',top:'53vh',left:'141.0vw'}}>0</span>
        <span className="center-text right-flow" style={{position:'absolute',top:'59.2vh',left:'141.0vw'}}>0</span>


        <span className="item-text" style={{position:'absolute',top:'35.4vh',left:'96vw'}}>1ncOME</span>
        <span className="item-text" style={{position:'absolute',top:'41.6vh',left:'96vw'}}>cL1EnT</span>

        <span className="item-text right-flow" style={{position:'absolute',top:'35.4vh',left:'109vw'}}>0</span>
        <span className="item-text right-flow" style={{position:'absolute',top:'41.6vh',left:'109vw'}}>0</span>

        <span className="item-text" style={{position:'absolute',top:'35.4vh',left:'118vw'}}>T1cKETS</span>
        <span className="item-text" style={{position:'absolute',top:'41.6vh',left:'118vw'}}>1nQU1RY</span>

        <span className="item-text right-flow" style={{position:'absolute',top:'35.4vh',left:'131vw'}}>0</span>
        <span className="item-text right-flow" style={{position:'absolute',top:'41.6vh',left:'131vw'}}>0</span>

        <span className="item-text" style={{position:'absolute',top:'35.4vh',left:'139vw'}}>OnL1nE</span>
        <span className="item-text" style={{position:'absolute',top:'41.6vh',left:'139vw'}}>JO1nED</span>

        <span className="item-text right-flow" style={{position:'absolute',top:'35.4vh',left:'153.4vw'}}>0</span>
        <span className="item-text right-flow" style={{position:'absolute',top:'41.6vh',left:'153.4vw'}}>0</span>

        <span className="item-text" style={{position:'absolute',top:'53vh',left:'139vw'}}>JOBLOg</span>
        <span className="item-text" style={{position:'absolute',top:'59.2vh',left:'139vw'}}>H1R1ngS</span>
        <span className="item-text" style={{position:'absolute',top:'65.4vh',left:'139vw'}}>ORDERS</span>
        <span className="item-text" style={{position:'absolute',top:'71.6vh',left:'139vw'}}>1nV1TES</span>

        <span className="item-text right-flow" style={{position:'absolute',top:'53vh',left:'153.4vw'}}>0</span>
        <span className="item-text right-flow" style={{position:'absolute',top:'59.2vh',left:'153.4vw'}}>0</span>
        <span className="item-text right-flow" style={{position:'absolute',top:'65.4vh',left:'153.4vw'}}>0</span>
        <span className="item-text right-flow" style={{position:'absolute',top:'71.6vh',left:'153.4vw'}}>0</span>

        <span className="item-text" style={{position:'absolute',top:'53vh',left:'96vw'}}>cL1cKS</span>
        <span className="item-text" style={{position:'absolute',top:'59.2vh',left:'96vw'}}>LEADS</span>

        <span className="item-text right-flow" style={{position:'absolute',top:'53vh',left:'109vw'}}>0</span>
        <span className="item-text right-flow" style={{position:'absolute',top:'59.2vh',left:'109vw'}}>0</span>

        <span className="item-text" style={{position:'absolute',top:'53vh',left:'118vw'}}>AD cTR</span>
        <span className="item-text" style={{position:'absolute',top:'59.2vh',left:'118vw'}}>AD cPc</span>

        <span className="item-text right-flow" style={{position:'absolute',top:'53vh',left:'131vw'}}>0</span>
        <span className="item-text right-flow" style={{position:'absolute',top:'59.2vh',left:'131vw'}}>0</span>


        <div className="hover-area" />
        <span className="chat-text" id="chatText">cHAT . . .</span>
        <span className="mail-text" style={{position:'absolute',top:'35.4vh',left:'36vw',zIndex:1,fontFamily:"'Distill Expanded',sans-serif",color:'#111111',letterSpacing:'0.28vw',fontSize:'0.47rem',textShadow:'0.001rem 0.001rem 0 #717171,-0.001rem -0.001rem 0 #717171',opacity:0,transition:'opacity 0.3s ease'}}>TO:</span>
        <span className="mail-text" style={{position:'absolute',top:'41.6vh',left:'36vw',zIndex:1,fontFamily:"'Distill Expanded',sans-serif",color:'#111111',letterSpacing:'0.28vw',fontSize:'0.47rem',textShadow:'0.001rem 0.001rem 0 #717171,-0.001rem -0.001rem 0 #717171',opacity:0,transition:'opacity 0.3s ease'}}>SUBJEcT:</span>
        <span className="mail-text" style={{position:'absolute',top:'35.4vh',left:'89vw',zIndex:1,fontFamily:"'Distill Expanded',sans-serif",color:'#111111',letterSpacing:'0.28vw',fontSize:'0.47rem',textShadow:'0.001rem 0.001rem 0 #717171,-0.001rem -0.001rem 0 #717171',opacity:0,transition:'opacity 0.3s ease'}}>cc</span>
        <span className="mail-text" style={{position:'absolute',top:'35.4vh',left:'91.9vw',zIndex:1,fontFamily:"'Distill Expanded',sans-serif",color:'#111111',letterSpacing:'0.28vw',fontSize:'0.47rem',textShadow:'0.001rem 0.001rem 0 #717171,-0.001rem -0.001rem 0 #717171',opacity:0,transition:'opacity 0.3s ease'}}>Bcc</span>
        <span className="mail-text" style={{position:'absolute',top:'41.6vh',left:'91.1vw',zIndex:1,fontFamily:"'Distill Expanded',sans-serif",color:'#111111',letterSpacing:'0.28vw',fontSize:'0.47rem',textShadow:'0.001rem 0.001rem 0 #717171,-0.001rem -0.001rem 0 #717171',opacity:0,transition:'opacity 0.3s ease'}}>SEnD</span>


        <span className="grid-number num1">1</span>
        <span className="grid-number num2">2</span>
        <span className="grid-number num3">3</span>
        <span className="grid-number num4">4</span>
        <span className="grid-number num5">5</span>
        <span className="grid-number num6">6</span>
        <span className="grid-number num7">7</span>
        <span className="grid-number num8">8</span>
        <span className="grid-number num9">9</span>
        <span className="grid-number num10">10</span>
        <span className="grid-number num11">11</span>
        <span className="grid-number num12">12</span>
        <span className="grid-number num13">13</span>
        <span className="grid-number num14">14</span>
        <span className="grid-number num15">15</span>
        <span className="grid-number num16">16</span>
        
        <span className="grid-number num17">17</span>
        <span className="grid-number num18">18</span>
        <span className="grid-number num19">19</span>
        <span className="grid-number num20">20</span>
        <span className="grid-number num21">21</span>
        <span className="grid-number num22">22</span>
        <span className="grid-number num23">23</span>
        <span className="grid-number num24">24</span>
        <span className="grid-number num25">25</span>
        <span className="grid-number num26">26</span>
        <span className="grid-number num27">27</span>
        <span className="grid-number num28">28</span>
        <span className="grid-number num29">29</span>
        <span className="grid-number num30">30</span>
        <span className="grid-number num31">31</span>

        <span className="grid-dashed dashed01" />
        <span className="grid-dashed dashed02" />
        <span className="grid-dashed dashed03" />
        <span className="grid-dashed dashed04" />
        <span className="grid-dashed dashed05" />
        <span className="grid-dashed dashed06" />
        <span className="grid-dashed dashed07" />
        <span className="grid-dashed dashed08" />
        <span className="grid-dashed dashed09" />
        <span className="grid-dashed dashed10" />
        <span className="grid-dashed dashed11" />
        <span className="grid-dashed dashed12" />
        <span className="grid-dashed dashed13" />
        <span className="grid-dashed dashed14" />
        <span className="grid-dashed dashed15" />
        <span className="grid-dashed dashed16" />
        
        <span className="grid-dashed dashed17" />
        <span className="grid-dashed dashed18" />
        <span className="grid-dashed dashed19" />
        <span className="grid-dashed dashed20" />
        <span className="grid-dashed dashed21" />
        <span className="grid-dashed dashed22" />
        <span className="grid-dashed dashed23" />
        <span className="grid-dashed dashed24" />
        <span className="grid-dashed dashed25" />
        <span className="grid-dashed dashed26" />
        <span className="grid-dashed dashed27" />
        <span className="grid-dashed dashed28" />
        <span className="grid-dashed dashed29" />
        <span className="grid-dashed dashed30" />
        <span className="grid-dashed dashed31" />

        <div className="heading-container" style={{top:'35.4vh',left:'6.41vw',transform:'translateX(-49vw)'}} data-offset="-49" data-slide-group="heading">
          <span className="custom-text heading-flow">AccOUnT</span>
        </div>
        <div className="heading-container" style={{top:'41.6vh',left:'6.41vw',transform:'translateX(-49vw)'}} data-offset="-49" data-slide-group="heading">
          <span className="custom-text heading-flow">AcT1V1TY</span>
        </div>
        <div className="heading-container" style={{top:'53vh',left:'6.41vw',transform:'translateX(-49vw)'}} data-offset="-49" data-slide-group="heading">
          <span className="custom-text heading-flow">cHATLOg</span>
        </div>
        <div className="heading-container" style={{top:'59.2vh',left:'6.41vw',transform:'translateX(-49vw)'}} data-offset="-49" data-slide-group="heading">
          <span className="custom-text heading-flow">cLAnLOg</span>
        </div>

        <div className="account-container" style={{top:'35.4vh',left:'29.11vw',transform:'translateX(-49vw)'}} data-offset="-49" data-slide-group="account">
          <span className="custom-text right-flow" style={{position:'absolute',right:0}}>0</span>
        </div>
        <div className="account-container" style={{top:'41.6vh',left:'29.11vw',transform:'translateX(-49vw)'}} data-offset="-49" data-slide-group="account">
          <span className="custom-text right-flow" style={{position:'absolute',right:0}}>0</span>
        </div>   
        <div className="account-container" style={{top:'53vh',left:'29.11vw',transform:'translateX(-49vw)'}} data-offset="-49" data-slide-group="account">
          <span className="custom-text right-flow" style={{position:'absolute',right:0}}>0</span>
        </div>
        <div className="account-container" style={{top:'59.2vh',left:'29.11vw',transform:'translateX(-49vw)'}} data-offset="-49" data-slide-group="account">
          <span className="custom-text right-flow" style={{position:'absolute',right:0}}>0</span>
        </div>

        <div className="custom-line" style={{ left: '-42.59vw' }} />

        <div className="layer-five" />
        <div className="layer-six" />
        
        <div className="slide-triggers">
          <div className="slide-trigger" />
          <div className="slide-trigger-reverse" />
        </div>
    </div>
    </div>
  );
};

export default IOULPage;
    
