// ------------------------------------------------------------
// ScrollAnimations — simple animations for the whole website.
//
// 1. Fade up: sections and cards fade in and slide up a little the
//    first time they scroll into view.
// 2. Count up: statistic numbers (e.g. "12,400") count up from 0
//    when they scroll into view.
//
// How it works: after every page change we look for the elements
// listed below, give them the "reveal" class, and use an
// IntersectionObserver (a browser tool that tells us when an element
// becomes visible) to start the animation. The styles are in index.css.
// People who turn on "reduce motion" in their device settings see no
// animation.
// ------------------------------------------------------------
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Elements that fade up when they appear.
const revealSelector = [
  '.section-header',
  '.page-header',
  '.artwork-card',
  '.category-tile',
  '.collection-card',
  '.mosaic-card',
  '.collection-tile',
  '.rec-card',
  '.style-card',
  '.step',
  '.mission-card',
  '.team-card',
  '.stats > div',
  '.quick-card',
  '.fav-category',
  '.featured-collection',
  '.chat-preview',
  '.taste-copy',
  '.details-media',
  '.details-info',
  '.contact-form',
  '.results-list-item',
].join(', ');

// Numbers that count up.
const counterSelector = '.stats strong, .team-figures strong, .collection-stats strong';

// Count a number up from 0 to its real value, keeping its format,
// e.g. "12,400" or "100%". Takes about 1.2 seconds.
function countUp(element) {
  const finalText = element.textContent.trim();
  const match = finalText.match(/^(\d[\d,]*)(\D*)$/); // a number, then an optional ending like "%"
  if (!match) return; // not a simple number (e.g. "1830–1919"), leave it alone
  const target = parseInt(match[1].replace(/,/g, ''), 10);
  const ending = match[2];
  const useCommas = match[1].includes(',');
  const duration = 1200;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // starts fast, slows down at the end
    const value = Math.round(target * eased);
    element.textContent = (useCommas ? value.toLocaleString('en-US') : value) + ending;
    if (progress < 1) requestAnimationFrame(step);
    else element.textContent = finalText; // finish on the exact original text
  }
  requestAnimationFrame(step);
}

function ScrollAnimations() {
  const location = useLocation();

  useEffect(() => {
    // Respect the "reduce motion" setting.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target;
          if (element.matches(counterSelector)) {
            element.dataset.counter = 'done';
            countUp(element);
          } else {
            element.classList.add('is-visible');
            // When the fade has finished, remove the animation styles so the
            // element's own hover effects work normally again.
            const delay = parseInt(element.style.transitionDelay) || 0;
            setTimeout(() => {
              element.dataset.reveal = 'done';
              element.classList.remove('reveal', 'is-visible');
              element.style.transitionDelay = '';
            }, 700 + delay);
          }
          observer.unobserve(element); // animate only once
        });
      },
      { threshold: 0.15 }
    );

    // Elements this run is already watching (React may run this setup twice
    // in development, so each run keeps its own list).
    const watched = new WeakSet();

    // Find new elements and start watching them.
    function watch() {
      document.querySelectorAll(revealSelector).forEach((element) => {
        if (watched.has(element) || element.dataset.reveal === 'done') return;
        watched.add(element);
        element.dataset.reveal = 'yes';
        element.classList.add('reveal');
        // Cards in the same row appear one after another (a small delay each).
        const index = Array.from(element.parentElement.children).indexOf(element) % 4;
        element.style.transitionDelay = index * 80 + 'ms';
        observer.observe(element);
      });
      document.querySelectorAll(counterSelector).forEach((element) => {
        if (watched.has(element) || element.dataset.counter === 'done') return;
        watched.add(element);
        observer.observe(element);
      });
    }

    watch();
    // Some content appears later (e.g. "Load more", search results), so
    // check again whenever the page content changes.
    const mutations = new MutationObserver(watch);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, [location.pathname]);

  return null; // this component only adds behaviour, it shows nothing
}

export default ScrollAnimations;
