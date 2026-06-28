"use client";

import { useEffect, useRef } from "react";

/**
 * On first page load, scrolls the viewport to the #video section
 * so the film player is the first thing visible.
 */
export function ScrollToFilm() {
  const hasScrolled = useRef(false);

  useEffect(() => {
    if (hasScrolled.current) return;
    hasScrolled.current = true;

    // Small delay so the DOM is fully laid out and hero measured
    const timer = setTimeout(() => {
      const el = document.getElementById("video-player");
      if (!el) return;

      const viewportHeight = window.innerHeight;
      const elementHeight = el.offsetHeight;
      const idealOffset = Math.max(80, (viewportHeight - elementHeight) / 2);
      const targetY = el.getBoundingClientRect().top + window.scrollY - idealOffset;

      // Instant scroll on load (no animation — the user just arrives)
      window.scrollTo({ top: targetY, behavior: "instant" });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return null; // Renderless component
}
