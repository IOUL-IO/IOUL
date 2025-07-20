"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';

const IOULPage: React.FC = () => {
  const [currentMenu, setCurrentMenu] = useState<string | null>(null);
  const [slideState, setSlideState] = useState("none");
  const [pageFadedIn, setPageFadedIn] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);
  const [chatInitialized, setChatInitialized] = useState(false);
  const chatTextRef = useRef<HTMLSpanElement | null>(null);
  const SLIDE_DURATION = 700; // ms; keep in sync with CSS slide timing
  const hoverAreaRef = useRef<HTMLDivElement | null>(null);

// Disable hover-area clicks once chat has appeared so it no longer blocks util-line
useEffect(() => {
  if (chatInitialized && hoverAreaRef.current) {
    hoverAreaRef.current.style.pointerEvents = "none";
  }
}, [chatInitialized]);
  const pageContentRef = useRef<HTMLDivElement | null>(null);
  
  const [state, setState] = useState(0); // 0 = baseline (lines visible, others hidden)

  const EDGE_MARGIN = 11;

  const targetsRef = useRef<(HTMLElement | null)[]>([]); // Reference to target elements

  const [itemStage, setItemStage] = useState(0);  // 0 = hidden, 1 = visible (left column), 2 = shifted left / clipped
  const [centerStage, setCenterStage] = useState(0);  // 0 = hidden, 1 = visible (center column)
  const [animating, setAnimating] = useState(false);

  const itemElsRef = useRef<NodeListOf<HTMLElement> | null>(null);
  const centerElsRef = useRef<NodeListOf<HTMLElement> | null>(null);
// ─── Cache item & center elements and their baseline positions ────────────────
useEffect(() => {
  itemElsRef.current = document.querySelectorAll('.item-text, .item-line');
  centerElsRef.current = document.querySelectorAll('.center-text, .center-line');

  const toVwLocal = (px: number) => px / (window.innerWidth / 100);

  const allEls: HTMLElement[] = [
    ...Array.from(itemElsRef.current || []),
    ...Array.from(centerElsRef.current || [])
  ];
  allEls.forEach(el => {
    if (!el.dataset.baseLeftVw) {
      const leftPx = parseFloat(getComputedStyle(el).left) || 0;
      el.dataset.baseLeftVw = toVwLocal(leftPx).toString();
    }
  });
}, [itemStage, centerStage]);


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
  }, [itemStage, centerStage]);




    // Cycle util-state 0 → 1 → 2 → 0 on click
  const handleUtilLineClick = useCallback(() => {
    setState(prev => (prev + 1) % 3);
  }, [itemStage, centerStage]);
  
  // Sync the data-util CSS attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-util', state.toString());
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
}, [itemStage, centerStage]);

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
          // fade out chat, slide in account+heading          chatTextRef.current!.style.opacity = "0";
          setTimeout(() => {
            document.querySelectorAll<HTMLElement>('.account-container[data-slide-group="account"]')
              .forEach(box => box.style.transform = "translateX(0)");
            document.querySelectorAll<HTMLElement>('.heading-container[data-slide-group="heading"], .custom-line[data-slide-group="heading"]')
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

          // slide menu-items back toward original by +29vw
          document.querySelectorAll<HTMLElement>('.menu-items .menu-item')
            .forEach(el => {
              el.style.transition = "left 0.7s ease";
              el.style.left = (parseFloat(el.style.left) + 29) + "vw";
            });
          setSlideState("menu");
          break;


        case "menu":
          // slide menu back to heading-position
          document.querySelectorAll<HTMLElement>('.menu-items .menu-item')
            .forEach(el => el.style.left = el.dataset.originalLeft!);
          
const headingBoxes = Array.from(document.querySelectorAll<HTMLElement>('.heading-container[data-slide-group="heading"], .custom-line[data-slide-group="heading"]'));
const headingOut = headingBoxes.some(box => box.style.transform === "translateX(0)");
if (headingOut) {
  setSlideState("heading");
} else {
  setSlideState("none");
}

          break;

        case "heading":
          // slide account+heading back out, fade chat in
          document.querySelectorAll<HTMLElement>('.account-container[data-slide-group="account"]')
            .forEach(box => {
              box.style.transition = "transform 0.7s ease";
              box.style.transform = `translateX(${box.dataset.offset}vw)`;
            });
          document.querySelectorAll<HTMLElement>('.heading-container[data-slide-group="heading"], .custom-line[data-slide-group="heading"]')
            .forEach(box => {
              box.style.transition = "transform 0.7s ease";
              box.style.transform = `translateX(${box.dataset.offset}vw)`;
            });          setSlideState("none");
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
          document.querySelectorAll<HTMLElement>('.heading-container[data-slide-group="heading"], .custom-line[data-slide-group="heading"]')
            .forEach(box => {
              box.style.transition = "transform 0.7s ease";
              box.style.transform = `translateX(${box.dataset.offset}vw)`;
            });          setSlideState("none");
          break;

        case "none":
          // first menu click
          document.querySelectorAll<HTMLElement>('.menu-items .menu-item')
            .forEach(el => {
              el.dataset.originalLeft = el.style.left;
              el.style.transition = "left 0.7s ease";
              el.style.left = "6.41vw";
            });chatTextRef.current!.style.opacity = "0";
setSlideState("menu");

          break;

        case "menu":
          // second menu/community click
          document.querySelectorAll<HTMLElement>('.menu-items .menu-item')
            .forEach(el => {
              el.dataset.originalLeft ||= el.style.left;
              el.style.transition = "left 0.7s ease";
              el.style.left = (parseFloat(el.style.left) - 29) + "vw";
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
    if (!(itemStage === 0 && centerStage === 0)) return;
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
  }, [itemStage, centerStage]);

  // Reusable move function for transitions
  
const move = (els: NodeListOf<HTMLElement> | null, offset: number) => {
  if (!els) return;
  els.forEach((el) => {
    const base = parseFloat((el as HTMLElement).dataset.baseLeftVw ?? '0');
    (el as HTMLElement).style.transition = `left ${DUR}ms ease`;
    (el as HTMLElement).style.left = `${base + offset}vw`;
  });
};


export default IOULPage;
    