"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * useScrollSpy — Updates URL hash on scroll using IntersectionObserver + History API.
 * - Observes sections by their IDs
 * - Updates the browser URL (no reload) when a section becomes visible
 * - Scrolls to hash on initial mount (supports direct deep links)
 * - Configurable rootMargin and threshold
 */
export function useScrollSpy(sectionIds: string[], offset = "0px 0px -40% 0px") {
  const isUpdatingRef = useRef(false);
  const hasScrolledToHash = useRef(false);

  // Scroll to hash on first load
  useEffect(() => {
    if (hasScrolledToHash.current) return;
    hasScrolledToHash.current = true;

    const hash = window.location.hash.replace("#", "");
    if (!hash || !sectionIds.includes(hash)) return;

    // Small delay to ensure DOM is painted
    const timer = setTimeout(() => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [sectionIds]);

  // IntersectionObserver for scroll spy
  useEffect(() => {
    if (typeof window === "undefined") return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isUpdatingRef.current) return;
        isUpdatingRef.current = true;

        // Find the most visible entry that is intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => {
            const aRatio = a.intersectionRatio;
            const bRatio = b.intersectionRatio;
            return bRatio - aRatio;
          });

        if (visible.length > 0) {
          const id = visible[0].target.id;
          const hash = `#${id}`;
          if (window.location.hash !== hash) {
            window.history.replaceState(null, "", hash);
          }
        }

        setTimeout(() => {
          isUpdatingRef.current = false;
        }, 100);
      },
      {
        rootMargin: offset,
        threshold: [0, 0.1, 0.25, 0.4, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [sectionIds, offset]);
}

/**
 * Smooth-scrolls to an element by ID. Works with the router.
 */
export function useSmoothScrollToHash() {
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return scrollTo;
}
