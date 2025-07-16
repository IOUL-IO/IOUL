*** Begin Patch
*** Update File: page.tsx
@@
   // Refs for interactive elements
   const chatRef = useRef<HTMLSpanElement>(null);
+  const accountRef = useRef<HTMLDivElement>(null);
+  const headingRef = useRef<HTMLDivElement>(null);
+  const menuRef = useRef<HTMLDivElement>(null);
+  const communityRef = useRef<HTMLDivElement>(null);
+  const acctTextRef = useRef<HTMLDivElement>(null);
+  const acctLineRef = useRef<HTMLDivElement>(null);
+  const itemTextRef = useRef<HTMLDivElement>(null);
+  const itemLineRef = useRef<HTMLDivElement>(null);
+  const centerTextRef = useRef<HTMLDivElement>(null);
+  const centerLineRef = useRef<HTMLDivElement>(null);
+
+  // Sliding & fading interactions
+  const [slideState, setSlideState] = useState<'none'|'heading'|'menu'|'community'|'acctText'|'item1'|'center'>('none');
+  useEffect(() => {
+    const handleClick = (e: MouseEvent) => {
+      const vpw = window.innerWidth/100;
+      const vph = window.innerHeight/100;
+      const x = e.clientX/vpw;
+      const y = e.clientY/vph;
+      if (y < 28.5 || y > 84) return;
+      // 1) Chat -> Account
+      if (slideState === 'none' && x <= 6.37) {
+        chatRef.current!.style.transition = 'opacity 0.2s';
+        chatRef.current!.style.opacity = '0';
+        accountRef.current!.style.transition = 'transform 0.5s';
+        headingRef.current!.style.transition = 'transform 0.5s';
+        accountRef.current!.style.transform = 'translateX(6.41vw)';
+        headingRef.current!.style.transform = 'translateX(6.41vw)';
+        setSlideState('heading');
+        return;
+      }
+      // 2) Heading -> Chat
+      if (slideState === 'heading' && x >= 28.86 && x <= 32.43) {
+        accountRef.current!.style.transform = 'translateX(0)';
+        headingRef.current!.style.transform = 'translateX(0)';
+        setTimeout(() => { chatRef.current!.style.opacity = '1'; }, 500);
+        setSlideState('none');
+        return;
+      }
+      // 3) Chat -> Menu
+      if (slideState === 'none' && x >= 28.86 && x <= 32.43) {
+        chatRef.current!.style.transition = 'opacity 0.2s';
+        chatRef.current!.style.opacity = '0';
+        menuRef.current!.style.transition = 'transform 0.5s';
+        menuRef.current!.style.transform = 'translateX(6.41vw)';
+        setSlideState('menu');
+        return;
+      }
+      // 4) Menu -> Chat
+      if (slideState === 'menu' && x <= 6.37) {
+        menuRef.current!.style.transform = 'translateX(0)';
+        setTimeout(() => { chatRef.current!.style.opacity = '1'; }, 500);
+        setSlideState('none');
+        return;
+      }
+      // 5) Menu -> Community
+      if (slideState === 'menu' && x >= 28.86 && x <= 32.43) {
+        menuRef.current!.style.transition = 'transform 0.5s';
+        menuRef.current!.style.transform = 'translateX(0)'; // shift left further?
+        communityRef.current!.style.transition = 'transform 0.5s';
+        communityRef.current!.style.transform = 'translateX(6.41vw)';
+        setSlideState('community');
+        return;
+      }
+      // 6) Community -> Menu
+      if (slideState === 'community' && x <= 6.37) {
+        communityRef.current!.style.transform = 'translateX(0)';
+        menuRef.current!.style.transform = 'translateX(6.41vw)';
+        setSlideState('menu');
+        return;
+      }
+      // 7) Chat -> Account Texts
+      if (slideState === 'none' && x >= 32.43 && x <= 36) {
+        acctTextRef.current!.style.transition = 'transform 0.5s';
+        acctLineRef.current!.style.transition = 'transform 0.5s';
+        acctTextRef.current!.style.transform = 'translateX(60vw)';
+        acctLineRef.current!.style.transform = 'translateX(60vw)';
+        setSlideState('acctText');
+        return;
+      }
+      // 8) Account Texts -> Chat
+      if (slideState === 'acctText' && x >= 94) {
+        acctTextRef.current!.style.transform = 'translateX(0)';
+        acctLineRef.current!.style.transform = 'translateX(0)';
+        setSlideState('none');
+        return;
+      }
+      // 9) Chat -> Item First
+      if (slideState === 'none' && x >= 94) {
+        itemTextRef.current!.style.transition = 'transform 0.5s';
+        itemLineRef.current!.style.transition = 'transform 0.5s';
+        itemTextRef.current!.style.transform = 'translateX(-60vw)';
+        itemLineRef.current!.style.transform = 'translateX(-60vw)';
+        setSlideState('item1');
+        return;
+      }
+      // 10) Item First -> Chat
+      if (slideState==='item1' && x<=6.37) {
+        itemTextRef.current!.style.transform='translateX(0)';
+        itemLineRef.current!.style.transform='translateX(0)';
+        setSlideState('none');
+        return;
+      }
+      // 11) Item First -> Center
+      if (slideState==='item1' && x>=94) {
+        itemTextRef.current!.style.transform='translateX(-130vw)';
+        itemLineRef.current!.style.transform='translateX(-130vw)';
+        centerTextRef.current!.style.transition='transform 0.5s';
+        centerLineRef.current!.style.transition='transform 0.5s';
+        centerTextRef.current!.style.transform='translateX(-60vw)';
+        centerLineRef.current!.style.transform='translateX(-60vw)';
+        setSlideState('center');
+        return;
+      }
+      // 12) Center -> Item First
+      if (slideState==='center' && x<=6.37) {
+        centerTextRef.current!.style.transform='translateX(0)';
+        centerLineRef.current!.style.transform='translateX(0)';
+        itemTextRef.current!.style.transform='translateX(-60vw)';
+        itemLineRef.current!.style.transform='translateX(-60vw)';
+        setSlideState('item1');
+        return;
+      }
+    };
+    document.addEventListener('click', handler);
+    return () => document.removeEventListener('click', handler);
+  }, [slideState]);
*** End Patch
