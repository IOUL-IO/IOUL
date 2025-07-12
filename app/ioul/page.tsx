"use client";

import React, { useEffect } from 'react';
const PageScripts: React.FC = () => {
  useEffect(() => {
    // ===== Fade-in on first mouse move =====
    const pageContent = document.querySelector<HTMLElement>('.page-content');
    let pageFadedIn = false;
    const fadeInPage = () => {
      if (pageContent) {
        pageContent.style.opacity = '1';
        pageFadedIn = true;
      }
    };
    const onFirstMouseMove = () => {
      if (!pageFadedIn) fadeInPage();
      document.removeEventListener('mousemove', onFirstMouseMove);
    };
    document.addEventListener('mousemove', onFirstMouseMove);

    // ===== Fullscreen toggle on edge click =====
    const EDGE_MARGIN = 11;
    const onEdgeClick = (event: MouseEvent) => {
      const { clientX: x, clientY: y } = event;
      const { innerWidth: width, innerHeight: height } = window;
      if (
        !document.fullscreenElement &&
        (x <= EDGE_MARGIN ||
         x >= width - EDGE_MARGIN ||
         y <= EDGE_MARGIN ||
         y >= height - EDGE_MARGIN)
      ) {
        document.documentElement.requestFullscreen?.();
      }
    };
    document.addEventListener('click', onEdgeClick);

    // ===== Chat reveal & activation =====
    let slideState: 'none' | 'community' | 'menu' | 'heading' | 'account' = 'none';
    const chatText = document.getElementById('chatText') as HTMLElement | null;
    if (chatText) {
      chatText.style.pointerEvents = 'none';
      chatText.style.zIndex = '-1';
    }
    let chatShownOnce = false;
    const hoverArea = document.querySelector<HTMLElement>('.hover-area');
    const onChatHover = (event: MouseEvent) => {
      if (!chatShownOnce && pageFadedIn && hoverArea && chatText) {
        const rect = hoverArea.getBoundingClientRect();
        if (
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom
        ) {
          chatText.style.opacity = '1';
          chatText.style.pointerEvents = 'auto';
          chatText.style.zIndex = '10';
          chatShownOnce = true;
        }
      }
    };
    document.addEventListener('mousemove', onChatHover);
    const onChatClick = (event: MouseEvent) => {
      event.stopPropagation();
      if (!chatText) return;
      const chatInput = document.createElement('input');
      chatInput.type = 'text';
      chatInput.classList.add('chat-input');
      chatInput.id = 'chatText';
      chatText.replaceWith(chatInput);
      chatInput.focus();
    };
    chatText?.addEventListener('click', onChatClick);

    // ===== Submenu helpers =====
    let currentMenu: string | null = null;
    const quickRemoveSubmenu = () => {
      document.querySelectorAll<HTMLElement>('.new-text').forEach(span => {
        span.style.transition = 'opacity 0.1s ease';
        span.classList.remove('visible');
      });
      setTimeout(() => {
        document.querySelectorAll<HTMLElement>('.new-text').forEach(span => span.remove());
        currentMenu = null;
      }, 100);
      ['linkup-center','delivery-line','internal-unit'].forEach(id => {
        document.getElementById(id)?.classList.remove('slide-down');
      });
    };
    const closeSubmenu = () => {
      document.querySelectorAll<HTMLElement>('.new-text').forEach(span => {
        span.style.transition = 'opacity 0.3s ease';
        span.classList.remove('visible');
      });
      setTimeout(() => {
        document.querySelectorAll<HTMLElement>('.new-text').forEach(span => span.remove());
        currentMenu = null;
      }, 300);
      ['linkup-center','delivery-line','internal-unit'].forEach(id => {
        document.getElementById(id)?.classList.remove('slide-down');
      });
    };
    const forceCloseSubmenuThen = (fn: () => void) => {
      if (currentMenu !== null) {
        quickRemoveSubmenu();
        setTimeout(fn, 100);
      } else {
        fn();
      }
    };

    // ===== Click outside handlers for sliding logic =====
    const onGlobalClick1 = (event: MouseEvent) => {
      if (event.target instanceof Element &&
          (event.target.closest('.menu-item') ||
           event.target.closest('.chat-text'))
      ) return;
      const vw = window.innerWidth / 100;
      const vh = window.innerHeight / 100;
      const leftMin = 0, leftMax = 6.37 * vw, yMin = 28.5 * vh, yMax = 84 * vh;
      if (
        event.clientX >= leftMin &&
        event.clientX <= leftMax &&
        event.clientY >= yMin &&
        event.clientY <= yMax
      ) {
        event.stopPropagation();
        forceCloseSubmenuThen(() => {
          if (slideState === 'community') {
            document.querySelectorAll<HTMLElement>('.menu-items .menu-item').forEach(el => {
              if (!el.dataset.originalLeft) el.dataset.originalLeft = el.style.left;
              el.style.transition = 'left 0.7s ease';
              el.style.left =`${parseFloat(el.style.left) + 29}vw`;
            });
            document.querySelectorAll<HTMLElement>(
              '.community-items-container *:not(.custom-line)'
            ).forEach(el => {
              if (!el.dataset.originalLeft) el.dataset.originalLeft = el.style.left;
              el.style.transition = 'left 0.7s ease';
              el.style.left =`${parseFloat(el.style.left) + 29}vw`;
            });
            document.querySelectorAll<HTMLElement>('.community-items-container .custom-line').forEach(el => {
              if (el.dataset.originalLeft) {
                el.style.transition = 'left 0.7s ease';
                el.style.left = el.dataset.originalLeft!;
              }
            });
            document.querySelectorAll<HTMLElement>('.zero-items-container *').forEach(el => {
              if (!el.dataset.originalLeft) el.dataset.originalLeft = el.style.left;
              el.style.transition = 'left 0.7s ease';
              el.style.left =`${parseFloat(el.style.left) + 29}vw`;
            });
            slideState = 'menu';
            return;
          } else if (slideState === 'menu') {
            document.querySelectorAll<HTMLElement>('.menu-items .menu-item').forEach(el => {
              el.style.transition = 'transform 0.7s ease';
              el.style.transform = 'translateX(0)';
            });
            document.querySelector('.menu-items')?.classList.remove('raised');
            const ct = document.getElementById('chatText');
            if (ct) {
              setTimeout(() => {
                if (slideState !== 'none') return;
                ct.style.transition = 'opacity 0.7s ease';
                ct.style.opacity = '1';
              }, 700);
            }
            slideState = 'none';
          } else if (['heading','account'].includes(slideState)) {
            document
              .querySelectorAll<HTMLElement>('[data-slide-group="heading"]')
              .forEach(el => { el.style.transform = `translateX(${el.dataset.offset}vw)`; });
            document
              .querySelectorAll<HTMLElement>('[data-slide-group="account"]')
              .forEach(el => { el.style.transform = `translateX(${el.dataset.offset}vw)`; });
            document.querySelectorAll<HTMLElement>('.other-content > .custom-text:not(.menu-item)')
              .forEach(el => { if (el.dataset.originalLeft) el.style.left = el.dataset.originalLeft; });
            document.querySelectorAll<HTMLElement>('.other-content > .custom-line')
              .forEach(el => {
                if (el.dataset.originalLeft) {
                  el.style.transition = 'left 0.7s ease';
                  el.style.left = el.dataset.originalLeft!;
                }
              });
            const ct = document.getElementById('chatText');
            if (ct) {
              setTimeout(() => {
                if (slideState !== 'none') return;
                ct.style.transition = 'opacity 0.7s ease';
                ct.style.opacity = '1';
              }, 700);
            }
            slideState = 'none';
          } else if (slideState === 'none') {
            const ct = document.getElementById('chatText');
            if (ct) {
              ct.style.transition = 'opacity 0.1s ease';
              ct.style.opacity = '0';
              setTimeout(() => {
                document.querySelectorAll<HTMLElement>('.other-content > .custom-text:not(.menu-item)')
                  .forEach(el => {
                    if (!el.dataset.originalLeft) el.dataset.originalLeft = el.style.left;
                    el.style.transition = 'left 0.7s ease';
                    el.style.left =`${parseFloat(el.dataset.originalLeft!)+49}vw`;
                  });
                document.querySelectorAll<HTMLElement>('.other-content > .custom-line')
                  .forEach(el => {
                    if (!el.dataset.originalLeft) el.dataset.originalLeft = el.style.left;
                    el.style.transition = 'left 0.7s ease';
                    el.style.left =`${parseFloat(el.dataset.originalLeft!)+49}vw`;
                  });
                document.querySelectorAll<HTMLElement>('[data-slide-group="heading"]')
                  .forEach(el => el.style.transform = 'translateX(0)');
                document.querySelectorAll<HTMLElement>('[data-slide-group="account"]')
                  .forEach(el => el.style.transform = 'translateX(0)');
              }, 110);
            }
            slideState = 'heading';
          }
        });
      }
    };
    document.addEventListener('click', onGlobalClick1, true);

    const onGlobalClick2 = (event: MouseEvent) => {
      if (
        event.target instanceof Element &&
        (event.target.closest('.menu-item') ||
         event.target.closest('.chat-text') ||
         event.target.closest('.chat-input'))
      ) return;
      const vw = window.innerWidth / 100;
      const vh = window.innerHeight / 100;
      const leftMin = 28.86 * vw, leftMax = 32.43 * vw;
      const yMin = 28.5 * vh, yMax = 84 * vh;
      if (
        event.clientX >= leftMin &&
        event.clientX <= leftMax &&
        event.clientY >= yMin &&
        event.clientY <= yMax
      ) {
        event.stopPropagation();
        forceCloseSubmenuThen(() => {
          if (slideState === 'menu') {
            document.querySelectorAll<HTMLElement>('.menu-items .menu-item').forEach(el => {
              if (!el.dataset.originalLeft) el.dataset.originalLeft = el.style.left;
              el.style.transition = 'left 0.7s ease';
              el.style.left =`${parseFloat(el.style.left) - 29}vw`;
            });
            document.querySelectorAll<HTMLElement>('.community-items-container *').forEach(el => {
              if (!el.dataset.originalLeft) el.dataset.originalLeft = el.style.left;
              el.style.transition = 'left 0.7s ease';
              el.style.left =`${parseFloat(el.style.left) - 29}vw`;
            });
            document.querySelectorAll<HTMLElement>('.zero-items-container *').forEach(el => {
              if (!el.dataset.originalLeft) el.dataset.originalLeft = el.style.left;
              el.style.transition = 'left 0.7s ease';
              el.style.left =`${parseFloat(el.style.left) - 29}vw`;
            });
            slideState = 'community';
          } else if (['heading','account'].includes(slideState)) {
            document
              .querySelectorAll<HTMLElement>('[data-slide-group="heading"]')
              .forEach(el => { el.style.transform = `translateX(${el.dataset.offset}vw)`; });
            document
              .querySelectorAll<HTMLElement>('[data-slide-group="account"]')
              .forEach(el => { el.style.transform = `translateX(${el.dataset.offset}vw)`; });
            document.querySelectorAll<HTMLElement>('.other-content > .custom-text:not(.menu-item)')
              .forEach(el => { if (el.dataset.originalLeft) el.style.left = el.dataset.originalLeft; });
            document.querySelectorAll<HTMLElement>('.other-content > .custom-line')
              .forEach(el => {
                if (el.dataset.originalLeft) {
                  el.style.transition = 'left 0.7s ease';
                  el.style.left = el.dataset.originalLeft!;
                }
              });
            const ct = document.getElementById('chatText');
            if (ct) {
              setTimeout(() => {
                if (slideState !== 'none') return;
                ct.style.transition = 'opacity 0.7s ease';
                ct.style.opacity = '1';
              }, 700);
            }
            slideState = 'none';
          } else if (slideState === 'none') {
            const ct = document.getElementById('chatText');
            if (ct) {
              ct.style.transition = 'opacity 0.1s ease';
              ct.style.opacity = '0';
              setTimeout(() => {
                document.querySelectorAll<HTMLElement>('.menu-items .menu-item').forEach(el => {
                  if (!el.dataset.originalLeft) el.dataset.originalLeft = el.style.left;
                  el.style.transition = 'transform 0.7s ease';
                  el.style.transform = 'translateX(-22.59vw)';
                });
                setTimeout(() => document.querySelector('.menu-items')?.classList.add('raised'), 700);
              }, 110);
            }
            slideState = 'menu';
          }
        });
      }
    };
    document.addEventListener('click', onGlobalClick2, true);

    // ===== Calendar scroll behavior =====
    let isScrolling = false;
    let scrollTimeout: number;
    let isSecondScroll = false;

    const nums1to16 = Array.from(document.querySelectorAll<HTMLElement>(
      '.grid-number.num1, .grid-number.num2, .grid-number.num3, .grid-number.num4, .grid-number.num5, .grid-number.num6, .grid-number.num7, .grid-number.num8, .grid-number.num9, .grid-number.num10, .grid-number.num11, .grid-number.num12, .grid-number.num13, .grid-number.num14, .grid-number.num15, .grid-number.num16'
    ));
    const nums17to31 = Array.from(document.querySelectorAll<HTMLElement>(
      '.grid-number.num17, .grid-number.num18, .grid-number.num19, .grid-number.num20, .grid-number.num21, .grid-number.num22, .grid-number.num23, .grid-number.num24, .grid-number.num25, .grid-number.num26, .grid-number.num27, .grid-number.num28, .grid-number.num29, .grid-number.num30, .grid-number.num31'
    ));
    const dash1to16 = Array.from(document.querySelectorAll<HTMLElement>(
      '.grid-dashed.dashed01, .grid-dashed.dashed02, .grid-dashed.dashed03, .grid-dashed.dashed04, .grid-dashed.dashed05, .grid-dashed.dashed06, .grid-dashed.dashed07, .grid-dashed.dashed08, .grid-dashed.dashed09, .grid-dashed.dashed10, .grid-dashed.dashed11, .grid-dashed.dashed12, .grid-dashed.dashed13, .grid-dashed.dashed14, .grid-dashed.dashed15, .grid-dashed.dashed16'
    ));
    const dash17to31 = Array.from(document.querySelectorAll<HTMLElement>(
      '.grid-dashed.dashed17, .grid-dashed.dashed18, .grid-dashed.dashed19, .grid-dashed.dashed20, .grid-dashed.dashed21, .grid-dashed.dashed22, .grid-dashed.dashed23, .grid-dashed.dashed24, .grid-dashed.dashed25, .grid-dashed.dashed26, .grid-dashed.dashed27, .grid-dashed.dashed28, .grid-dashed.dashed29, .grid-dashed.dashed30, .grid-dashed.dashed31'
    ));

    // create scroll area
    const scrollArea = document.createElement('div');
    Object.assign(scrollArea.style, {
      position: 'absolute',
      top: '28.5vh',
      left: '36vw',
      width: '58vw',
      height: '55.5vh',
      zIndex: '5',
      pointerEvents: 'auto',
      cursor: 'default'
    });
    document.querySelector('.other-content')?.appendChild(scrollArea);

    let mailShownOnce = false;
    scrollArea.addEventListener('mousemove', () => {
      if (!mailShownOnce) {
        document.querySelectorAll<HTMLElement>('.mail-text, .mail-line')
          .forEach(el => el.style.opacity = '1');
        mailShownOnce = true;
      }
    });

    scrollArea.addEventListener('wheel', (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling) return;
      isScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => { isScrolling = false; }, 700);

      const allEls = [...nums1to16, ...nums17to31, ...dash1to16, ...dash17to31];
      requestAnimationFrame(() => {
        allEls.forEach(el => el.style.transition = 'transform 0.7s ease');
        requestAnimationFrame(() => {
          if (e.deltaY > 0) {
            if (!isSecondScroll) {
              allEls.forEach(el => el.style.transform = 'translateY(-55.5vh)');
              isSecondScroll = true;
            } else {
              allEls.forEach(el => el.style.transform = 'translateY(-111vh)');
              isSecondScroll = false;
            }
          } else {
            const current = allEls[0]?.style.transform || '';
            const match = current.match(/translateY\((-?[\d.]+)vh\)/);
            const y = match ? parseFloat(match[1]) : 0;
            if (y === -111) {
              allEls.forEach(el => el.style.transform = 'translateY(-55.5vh)');
              isSecondScroll = true;
            } else if (y === -55.5) {
              allEls.forEach(el => el.style.transform = 'translateY(0)');
              isSecondScroll = false;
            }
          }
        });
      });
    }, { passive: false });

    // ===== Slide-down submenu & new-text helpers =====
    const slideDownSiblings = (clickedId: string) => {
      const items = Array.from(document.querySelectorAll<HTMLElement>('.menu-items .menu-item'));
      const idx = items.findIndex(el => el.id === clickedId);
      items.slice(idx+1).forEach(el => {
        el.classList.remove('menu-slide','slide-down');
        el.style.transform = '';
        el.style.transition = '';
        void el.offsetHeight;
        el.classList.add('menu-slide');
      });
      requestAnimationFrame(() => {
        items.slice(idx+1).forEach(el => el.classList.add('slide-down'));
      });
    };
    const addNewText = (text: string, topVH: number, leftVW: number) => {
      if (slideState !== 'menu') return;
      const span = document.createElement('span');
      span.className = 'custom-text new-text';
      span.style.top =`${topVH}vh`;
      span.style.left =`${leftVW}vw`;
      span.textContent = text;
      document.querySelector('.other-content')?.appendChild(span);
      setTimeout(() => span.classList.add('visible'), 10);
    };
    const openOnlineAssets = () => {
      slideDownSiblings('online-assets');
      setTimeout(() => {
        addNewText('- cMS', 40.1, 6.4);
        addNewText('- LMS', 44.1, 6.4);
      }, 700);
      currentMenu = 'online-assets';
    };
    const openLinkupCenter = () => {
      slideDownSiblings('linkup-center');
      setTimeout(() => {
        addNewText('- cOM', 47.2, 6.4);
        addNewText('- JOB', 51.2, 6.4);
        addNewText('- HR', 55.2, 6.4);
      }, 700);
      currentMenu = 'linkup-center';
    };
    const openDeliveryLine = () => {
      slideDownSiblings('delivery-line');
      setTimeout(() => {
        addNewText('- cRM', 54.3, 6.4);
        addNewText('- OPS', 58.3, 6.4);
      }, 700);
      currentMenu = 'delivery-line';
    };
    const openInternalUnit = () => {
      slideDownSiblings('internal-unit');
      setTimeout(() => {
        addNewText('- 1nV', 61.4, 6.4);
        addNewText('- FMS', 65.4, 6.4);
        addNewText('- 1T', 69.4, 6.4);
      }, 700);
      currentMenu = 'internal-unit';
    };

    document.getElementById('online-assets')?.addEventListener('click', e => { e.stopPropagation(); currentMenu==='online-assets' ? closeSubmenu() : openOnlineAssets(); });
    document.getElementById('linkup-center')?.addEventListener('click', e => { e.stopPropagation(); currentMenu==='linkup-center' ? closeSubmenu() : openLinkupCenter(); });
    document.getElementById('delivery-line')?.addEventListener('click', e => { e.stopPropagation(); currentMenu==='delivery-line' ? closeSubmenu() : openDeliveryLine(); });
    document.getElementById('internal-unit')?.addEventListener('click', e => { e.stopPropagation(); currentMenu==='internal-unit' ? closeSubmenu() : openInternalUnit(); });

    // ===== util-line toggle (mail/calendar/lines) =====
    const utilLines = Array.from(document.querySelectorAll<HTMLElement>('.util-line'));
    const mailEls = Array.from(document.querySelectorAll<HTMLElement>('.mail-text, .mail-line'));
    const calendarEls = Array.from(document.querySelectorAll<HTMLElement>('.grid-number, .grid-dashed'));
    const specialLines = Array.from(document.querySelectorAll<HTMLElement>('.line.fifth, .line.sixth'));
    mailEls.forEach(el => el.classList.add('hidden'));
    calendarEls.forEach(el => el.classList.add('hidden'));
    specialLines.forEach(el => el.classList.remove('hidden'));

    let stateView = 0;
    const updateView = () => {
      if (stateView === 0) {
        mailEls.forEach(el => { el.classList.add('hidden'); el.style.opacity = '0'; });
        calendarEls.forEach(el => el.classList.add('hidden'));
        specialLines.forEach(el => el.classList.remove('hidden'));
      } else if (stateView === 1) {
        mailEls.forEach(el => { el.classList.remove('hidden'); el.style.opacity = '1'; });
        calendarEls.forEach(el => el.classList.add('hidden'));
        specialLines.forEach(el => el.classList.remove('hidden'));
      } else {
        mailEls.forEach(el => { el.classList.add('hidden'); el.style.opacity = '0'; });
        calendarEls.forEach(el => el.classList.remove('hidden'));
        specialLines.forEach(el => el.classList.add('hidden'));
      }
    };
    utilLines.forEach(line => line.addEventListener('click', () => {
      stateView = (stateView + 1) % 3;
      updateView();
    }));

    // ===== Account-slide logic =====
    const HIDE_MIN   =  6.37, HIDE_MAX   = 28.86;
    const TOP_MIN    = 28.5,  TOP_MAX    = 84;
    const CLICK_MIN  = 32.43, CLICK_MAX  = 36;
    const REVERSE_MIN= 94,    REVERSE_MAX=100;
    const DISTANCE   = 60,    DURATION   = 700;

    const pxToVw = (px: number) => px / (window.innerWidth/100);
    const pxToVh = (px: number) => px / (window.innerHeight/100);

    const targets = Array.from(document.querySelectorAll<HTMLElement>('.account-text'))
      .concat(Array.from(document.querySelectorAll<HTMLElement>('.account-line')));
    targets.forEach(el => {
      if (!el.dataset.baseLeftVw) {
        const leftPx = parseFloat(getComputedStyle(el).left) || 0;
        el.dataset.baseLeftVw = pxToVw(leftPx).toString();
      }
    });

    const updateVisibility = () => {
      targets.forEach(el => {
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
    const slideOnce = () => {
      if (sliding || targets[0].dataset.slid === 'true') return;
      sliding = true;
      targets.forEach(el => {
        el.style.opacity = '';
        el.style.pointerEvents = '';
      });
      targets.forEach(el => {
        const base = parseFloat(el.dataset.baseLeftVw!);
        el.style.transition = `left ${DURATION}ms ease`;
        el.style.left =`${base + DISTANCE}vw`;
        el.dataset.slid = 'true';
      });
      setTimeout(() => { updateVisibility(); sliding = false; }, DURATION);
    };
    const slideBack = () => {
      if (sliding || targets[0].dataset.slid !== 'true') return;
      sliding = true;
      targets.forEach(el => {
        const base = parseFloat(el.dataset.baseLeftVw!);
        el.style.transition = `left ${DURATION}ms ease`;
        el.style.left =`${base}vw`;
        delete el.dataset.slid;
      });
      setTimeout(() => { updateVisibility(); sliding = false; }, DURATION);
    };

    document.addEventListener('click', e => {
      const xVw = pxToVw(e.clientX), yVh = pxToVh(e.clientY);
      if (xVw >= CLICK_MIN && xVw <= CLICK_MAX) {
        slideOnce();
      } else if (xVw >= REVERSE_MIN && xVw <= REVERSE_MAX && yVh >= TOP_MIN && yVh <= TOP_MAX) {
        slideBack();
      }
    });
    Array.from(document.querySelectorAll<HTMLElement>('.slide-trigger, .slide-triggers, .slide-container'))
      .forEach(el => el.addEventListener('click', e => { e.stopPropagation(); slideOnce(); }));
    Array.from(document.querySelectorAll<HTMLElement>('.slide-trigger-reverse'))
      .forEach(el => el.addEventListener('click', e => { e.stopPropagation(); slideBack(); }));

    // ===== Cleanup all listeners on unmount =====
    return () => {
      document.removeEventListener('mousemove', onFirstMouseMove);
      document.removeEventListener('click', onEdgeClick);
      document.removeEventListener('mousemove', onChatHover);
      chatText?.removeEventListener('click', onChatClick);
      document.removeEventListener('click', onGlobalClick1, true);
      document.removeEventListener('click', onGlobalClick2, true);
      document.removeEventListener('resize', updateVisibility);
      utilLines.forEach(line => line.replaceWith(line.cloneNode(true) as HTMLElement));
      // (and any others if you track them separately)
    };
  }, []);

