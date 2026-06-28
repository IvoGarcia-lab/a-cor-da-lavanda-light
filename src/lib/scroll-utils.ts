let activeScrollFrame: number | null = null;

/**
 * Smoothly scrolls the window to a target Y position using a premium Cubic Ease-Out curve.
 * An Ease-Out curve starts instantly at maximum velocity (snappy, responsive start)
 * and glides smoothly to a slow, majestic, and comfortable stop.
 * 
 * @param targetY The destination Y coordinate
 * @param customDuration Optional custom duration in milliseconds. If omitted, duration scales dynamically.
 */
export function smoothScrollTo(targetY: number, customDuration?: number) {
  // Cancel any ongoing smooth scroll animation to prevent double-scroll conflicts
  if (activeScrollFrame !== null) {
    cancelAnimationFrame(activeScrollFrame);
    activeScrollFrame = null;
  }

  const startY = window.scrollY;
  const difference = targetY - startY;
  
  if (Math.abs(difference) < 5) {
    window.scrollTo(0, targetY);
    return;
  }

  // Cinematic Ease-Out duration: spacious but highly performant (between 2800ms and 4500ms)
  // This avoids prolonged browser rendering cycles while retaining a majestic, unhurried glide.
  const duration = customDuration ?? Math.max(2800, Math.min(4500, 2200 + Math.abs(difference) * 0.4));
  const startTime = performance.now();

  function step(currentTime: number) {
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    
    // Cubic Ease-Out: instantaneous start ("início natural e sem atraso") and long, smooth deceleration
    const ease = 1 - Math.pow(1 - progress, 3);
    
    window.scrollTo(0, startY + difference * ease);

    if (progress < 1) {
      activeScrollFrame = requestAnimationFrame(step);
    } else {
      activeScrollFrame = null;
    }
  }

  activeScrollFrame = requestAnimationFrame(step);
}

/**
 * Intercepts an anchor click event and scrolls smoothly to the target element with ease-out.
 * If center is true, it centers the element vertically in the viewport.
 */
export function handleAnchorClick(
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string,
  offset: number = 160,
  center: boolean = false
) {
  e.preventDefault();
  const targetId = href.replace("#", "");
  
  if (targetId === "top") {
    smoothScrollTo(0);
    window.history.pushState(null, "", "#");
    return;
  }
  
  const el = document.getElementById(targetId);
  if (el) {
    let targetY;
    if (center) {
      const viewportHeight = window.innerHeight;
      const elementHeight = el.offsetHeight;
      // Center vertically in viewport, keeping it below the navbar (at least 80px offset)
      const idealOffset = Math.max(80, (viewportHeight - elementHeight) / 2);
      targetY = el.getBoundingClientRect().top + window.scrollY - idealOffset;
    } else {
      targetY = el.getBoundingClientRect().top + window.scrollY - offset;
    }
    smoothScrollTo(targetY);
    window.history.pushState(null, "", href);
  }
}
