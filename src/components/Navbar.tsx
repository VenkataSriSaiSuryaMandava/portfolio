"use client";

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi';
import { useTheme } from '@/components/ThemeProvider';
import { useScrollSpy } from '@/hooks/useScrollSpy';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'basic', label: 'Info' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'certifications', label: 'Licenses & Certifications' },
  { id: 'publications', label: 'Publications' },
  { id: 'education', label: 'Education' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const ids = useMemo(() => NAV_ITEMS.map((n) => n.id), []);
  const activeId = useScrollSpy(ids, 120);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Close on hash change
  useEffect(() => {
    const handler = () => setOpen(false);
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-3 rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-950/55 backdrop-blur-xl shadow-sm">
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            {/* Left: clean brand (no name, no noisy icon) */}
            <Link
              href="#hero"
              className="font-semibold tracking-tight text-gray-900 dark:text-gray-50 hover:text-primary transition-colors"
              aria-label="Back to top"
            >
              Portfolio
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
              {NAV_ITEMS.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`px-3 py-2 rounded-full text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100/70 dark:hover:bg-gray-900/40'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            {/* Right controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-gray-200/60 dark:border-gray-800/60 bg-white/50 dark:bg-black/20 hover:bg-white/80 dark:hover:bg-black/40 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <FiSun /> : <FiMoon />}
              </button>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-full border border-gray-200/60 dark:border-gray-800/60 bg-white/50 dark:bg-black/20 hover:bg-white/80 dark:hover:bg-black/40 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                aria-label={open ? 'Close menu' : 'Open menu'}
              >
                {open ? <FiX /> : <FiMenu />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {open ? (
            <div className="lg:hidden border-t border-gray-200/60 dark:border-gray-800/60 px-3 py-3">
              <nav className="grid gap-1" aria-label="Mobile">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100/70 dark:hover:bg-gray-900/40'
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
