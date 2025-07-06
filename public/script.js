// Combined legacy scripts



    const pageContent = document.querySelector('.page-content');
    let pageFadedIn = false;
    function fadeInPage() {
      pageContent.style.opacity = '1';
      pageFadedIn = true;
    }
    document.addEventListener('mousemove', function onFirstMouseMove() {
      if (!pageFadedIn) { fadeInPage(); }
      document.removeEventListener('mousemove', onFirstMouseMove);
    });
    const EDGE_MARGIN = 11;
    document.addEventListener('click', (event) => {
      const { clientX: x, clientY: y } = event;
      const { innerWidth: width, innerHeight: height } = window;
      if (!document.fullscreenElement &&
          (x <= EDGE_MARGIN || x >= width - EDGE_MARGIN ||
           y <= EDGE_MARGIN || y >= height - EDGE_MARGIN)) {
        document.documentElement.requestFullscreen();
      }
    });

    let slideState = "none";
    const chatText = document.getElementById('chatText');
    chatText.style.pointerEvents = 'none';
    chatText.style.zIndex = '-1';
    let chatShownOnce = false;
    const hoverArea = document.querySelector('.hover-area');
    document.addEventListener('mousemove', (event) => {
      if (!chatShownOnce && pageFadedIn) {
        const rect = hoverArea.getBoundingClientRect();
        if (event.clientX >= rect.left && event.clientX <= rect.right &&
            event.clientY >= rect.top && event.clientY <= rect.bottom) {
          chatText.style.opacity = '1';
          chatText.style.pointerEvents = 'auto';
          chatText.style.zIndex = '10';
          chatShownOnce = true;
        }
      }
    });
    chatText.addEventListener('click', (event) => {
      event.stopPropagation();
      const chatInput = document.createElement('input');
      chatInput.type = 'text';
      chatInput.classList.add('chat-input');
      chatInput.id = 'chatText';
      chatText.replaceWith(chatInput);
      chatInput.focus();
    });

    let currentMenu = null;
    function quickRemoveSubmenu() {
      const newTexts = document.querySelectorAll('.new-text');
      newTexts.forEach(span => {
        span.style.transition = 'opacity 0.1s ease';
        span.classList.remove('visible');
      });
      setTimeout(() => {
        newTexts.forEach(span => span.remove());
        currentMenu = null;
      }, 100);
      document.getElementById("linkup-center").classList.remove("slide-down");
      document.getElementById("delivery-line").classList.remove("slide-down");
      document.getElementById("internal-unit").classList.remove("slide-down");
    }
    function closeSubmenu() {
      const newTexts = document.querySelectorAll('.new-text');
      newTexts.forEach(span => {
        span.style.transition = 'opacity 0.3s ease';
        span.classList.remove('visible');
      });
      setTimeout(() => {
        newTexts.forEach(span => span.remove());
        currentMenu = null;
      }, 300);
      document.getElementById("linkup-center").classList.remove("slide-down");
      document.getElementById("delivery-line").classList.remove("slide-down");
      document.getElementById("internal-unit").classList.remove("slide-down");
    }
    function forceCloseSubmenuThen(fn) {
      if (currentMenu !== null) {
        quickRemoveSubmenu();
        setTimeout(fn, 100);
      } else {
        fn();
      }
    }

    document.addEventListener('click', (event) => {
      if (event.target.closest('.menu-item') || event.target.closest('.chat-text')) return;
      const vwUnit = window.innerWidth / 100;
      const vhUnit = window.innerHeight / 100;
      const leftMin = 0;
      const leftMax = 6.37 * vwUnit;
      const yMin = 28.5 * vhUnit;
      const yMax = 84 * vhUnit;
      if (event.clientX >= leftMin && event.clientX <= leftMax &&
          event.clientY >= yMin && event.clientY <= yMax) {
        event.stopPropagation();
        forceCloseSubmenuThen(() => {
          if (slideState === "community") {
            document.querySelectorAll('.menu-items .menu-item').forEach(el => {
              if (!el.dataset.originalLeft) { el.dataset.originalLeft = el.style.left; }
              el.style.transition = "left 0.7s ease";
              let currentLeft = parseFloat(el.style.left);
              el.style.left = (currentLeft + 29) + "vw";
            });
            document.querySelectorAll('.community-items-container *:not(.custom-line)').forEach(el => {
              if (!el.dataset.originalLeft) { el.dataset.originalLeft = el.style.left; }
              el.style.transition = "left 0.7s ease";
              let currentLeft = parseFloat(el.style.left);
              el.style.left = (currentLeft + 29) + "vw";
            });
            document.querySelectorAll('.community-items-container .custom-line').forEach(el => {
              if (el.dataset.originalLeft) {
                el.style.transition = "left 0.7s ease";
                el.style.left = el.dataset.originalLeft;
              }
            });
            document.querySelectorAll('.zero-items-container *').forEach(el => {
              if (!el.dataset.originalLeft) { el.dataset.originalLeft = el.style.left; }
              el.style.transition = "left 0.7s ease";
              let currentLeft = parseFloat(el.style.left);
              el.style.left = (currentLeft + 29) + "vw";
            });
            slideState = "menu";
            return;
          } else if (slideState === "menu") {
            document.querySelectorAll('.menu-items .menu-item').forEach(el => {
              el.style.transition = "transform 0.7s ease";
              el.style.transform = "translateX(0)";
            });
            document.querySelector('.menu-items').classList.remove('raised');
            const chatTextEl = document.getElementById('chatText');
            if (chatTextEl) {
              setTimeout(() => {
    if (slideState !== "none") return;
    chatTextEl.style.transition = "opacity 0.7s ease";
                chatTextEl.style.opacity = "1";
              }, 700);
            }
            slideState = "none";
          } else if (slideState === "heading" || slideState === "account") {
            document.querySelectorAll('.heading-container[data-slide-group="heading"]').forEach(box => {
              box.style.transform = \