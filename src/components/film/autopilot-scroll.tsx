"use client";

import { useEffect, useRef } from "react";

export function AutopilotScroll() {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isScrollingRef = useRef<boolean>(false);
  const rafRef = useRef<number | null>(null);
  const lastActivityRef = useRef<number>(Date.now());

  useEffect(() => {
    // 1.25px per frame = ~75px per second, perfect pace for automatic cinematic scrolling
    const SCROLL_SPEED = 1.25;
    const INACTIVITY_DELAY = 3000; // 3 seconds

    const startAutoScroll = () => {
      if (isScrollingRef.current) return;
      isScrollingRef.current = true;
      
      const scrollStep = () => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (window.scrollY >= maxScroll - 2) {
          stopAutoScroll();
          return;
        }

        // Perform the fractional scroll
        window.scrollBy(0, SCROLL_SPEED);
        rafRef.current = requestAnimationFrame(scrollStep);
      };

      rafRef.current = requestAnimationFrame(scrollStep);
    };

    const stopAutoScroll = () => {
      isScrollingRef.current = false;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const resetInactivityTimer = () => {
      lastActivityRef.current = Date.now();
      stopAutoScroll();

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (window.scrollY < maxScroll - 5) {
          startAutoScroll();
        }
      }, INACTIVITY_DELAY);
    };

    // Events that indicate user activity
    const activityEvents = [
      "mousemove",
      "mousedown",
      "wheel",
      "DOMMouseScroll",
      "mousewheel",
      "keyup",
      "keydown",
      "touchstart",
      "touchmove",
      "scroll",
    ];

    let lastReset = 0;
    const handleActivity = (e: Event) => {
      // If the scroll event was triggered by the auto-scroller, ignore it
      if (e.type === "scroll" && isScrollingRef.current) {
        const delta = Date.now() - lastActivityRef.current;
        if (delta > INACTIVITY_DELAY) {
          return;
        }
      }

      const now = Date.now();
      // Throttle activity checks to every 50ms for performance
      if (now - lastReset > 50) {
        lastReset = now;
        resetInactivityTimer();
      }
    };

    activityEvents.forEach((event) => {
      window.addEventListener(event, handleActivity, { passive: true });
    });

    resetInactivityTimer();

    return () => {
      stopAutoScroll();
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      activityEvents.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, []);

  return null;
}
