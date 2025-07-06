
'use client';

import { useEffect } from 'react';

export default function runSlideAnimations() {
  useEffect(() => {
    const itemsGroup = document.querySelector('.items-group');
    const centersGroup = document.querySelector('.centers-group');
    const itemTexts = document.querySelectorAll('.item-texts');
    const centerTexts = document.querySelectorAll('.center-texts');
    const trigger = document.querySelector('.slide-trigger');

    const slideInItems = () => {
      itemsGroup?.classList.add('slide-in-items');
      centersGroup?.classList.add('slide-in-centers');
      itemTexts.forEach(text => text.style.visibility = 'visible');
      centerTexts.forEach(text => text.style.visibility = 'visible');
    };

    const slideOutItems = () => {
      itemsGroup?.classList.remove('slide-in-items');
      itemsGroup?.classList.add('slide-items-under');
      centersGroup?.classList.remove('slide-in-centers');
    };

    slideInItems();

    trigger?.addEventListener('click', () => {
      if (itemsGroup?.classList.contains('slide-in-items')) {
        slideOutItems();
      } else {
        slideInItems();
      }
    });
  }, []);
}
