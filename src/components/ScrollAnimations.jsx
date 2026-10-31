import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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

const counterSelector = '.stats strong, .team-figures strong, .collection-stats strong';

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

    const watched = new WeakSet();

    function watch() {
      document.querySelectorAll(revealSelector).forEach((element) => {
        if (watched.has(element) || element.dataset.reveal === 'done') return;
        watched.add(element);
        element.dataset.reveal = 'yes';
        element.classList.add('reveal');
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
