"use client";

import { useState, useEffect } from 'react';

/**
 * useTypewriter progressively reveals the provided text at a given speed.  It
 * returns the portion of the string that should currently be displayed.  Once
 * the entire text has been rendered, the interval is cleared.
 *
 * @param text The full text to type out
 * @param speed Delay in milliseconds between each character
 */
export function useTypewriter(text: string, speed = 100) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return displayed;
}