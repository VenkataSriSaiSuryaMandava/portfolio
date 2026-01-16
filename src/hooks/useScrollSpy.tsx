"use client";

import { useEffect, useState } from 'react';

/**
 * useScrollSpy returns the id of the section currently in view.  It listens
 * for scroll events and checks the bounding rectangles of each element
 * corresponding to the provided ids.  The returned id can be used to
 * highlight the active navigation item.
 *
 * @param ids Array of element ids corresponding to page sections
 * @param offset Optional number of pixels to offset the scroll position
 */
export function useScrollSpy(ids: string[], offset = 0) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + offset + 1;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          setActiveId(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    // Run on mount
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ids, offset]);

  return activeId;
}