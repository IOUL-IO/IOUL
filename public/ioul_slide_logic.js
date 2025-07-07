const DURATION = 700;
const DISTANCE = 29; // distance in vw per slide
const maxStage = 2;
let stage = 0;
let sliding = false;

const targets = [
  ...Array.from(document.querySelectorAll('.item-text')),
  ...Array.from(document.querySelectorAll('.item-line')),
  ...Array.from(document.querySelectorAll('.center-text')),
  ...Array.from(document.querySelectorAll('.center-line')),
  ...Array.from(document.querySelectorAll('.account-text')),
  document.querySelector('.account-line')
].filter(Boolean);

// Initialize base positions
targets.forEach(el => {
  const leftPx = parseFloat(getComputedStyle(el).left) || 0;
  const baseVw = (leftPx / window.innerWidth) * 100;
  el.dataset.baseLeftVw = baseVw.toString();
});

function updateVisibility() {
  targets.forEach(el => {
    const rect = el.getBoundingClientRect();
    const leftVw = (rect.left / window.innerWidth) * 100;
    const topVh = (rect.top / window.innerHeight) * 100;
    const HIDE_MIN = 100, HIDE_MAX = 135, TOP_MIN = 28.5, TOP_MAX = 84;
    const hide = leftVw >= HIDE_MIN && leftVw < HIDE_MAX && topVh >= TOP_MIN && topVh <= TOP_MAX;
    el.style.opacity = hide ? '0' : '';
    el.style.pointerEvents = hide ? 'none' : '';
  });
}
updateVisibility();
window.addEventListener('resize', updateVisibility);

function slideOnce() {
  if (sliding || stage >= maxStage) return;
  sliding = true;
  stage++;
  targets.forEach(el => {
    const base = parseFloat(el.dataset.baseLeftVw);
    el.style.transition = `left ${DURATION}ms ease`;
    el.style.left = (base + DISTANCE * stage) + 'vw';
  });
  setTimeout(() => {
    updateVisibility();
    sliding = false;
  }, DURATION);
}

function slideBack() {
  if (sliding || stage <= 0) return;
  sliding = true;
  stage--;
  targets.forEach(el => {
    const base = parseFloat(el.dataset.baseLeftVw);
    el.style.transition = `left ${DURATION}ms ease`;
    el.style.left = (base + DISTANCE * stage) + 'vw';
  });
  setTimeout(() => {
    updateVisibility();
    sliding = false;
  }, DURATION);
}

document.querySelectorAll('.slide-trigger').forEach(el =>
  el.addEventListener('click', e => {
    e.stopPropagation();
    slideOnce();
  })
);
document.querySelectorAll('.slide-trigger-reverse').forEach(el =>
  el.addEventListener('click', e => {
    e.stopPropagation();
    slideBack();
  })
);
