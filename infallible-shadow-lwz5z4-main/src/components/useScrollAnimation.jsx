// hooks/useScrollAnimation.js
import { useEffect } from 'react';

export const useScrollAnimation = (selector = '.project-card') => {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15 // Trigger when 15% of element is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          // Optional: Stop observing after animation
          // observer.unobserve(entry.target);
        } else {
          // Optional: Remove class when out of view to re-animate
          // entry.target.classList.remove('in-view');
        }
      });
    }, observerOptions);

    // Observe all project cards
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, [selector]);
};