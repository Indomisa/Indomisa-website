import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'indomisa-theme';

/**
 * Toggles the site between light and dark theme by adding/removing the
 * `dark` class on <html>. All colors are driven by CSS custom properties
 * in styles.scss (see :root vs .dark), so no component needs to know
 * which theme is active — Tailwind's bg-background/text-foreground/etc.
 * classes just pick up whichever value is currently in scope.
 *
 * The choice is persisted to localStorage. On first visit (no stored
 * choice) it falls back to the visitor's OS preference.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private isBrowser: boolean;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  init(): void {
    if (!this.isBrowser) return;
    this.apply(this.getStoredOrPreferredTheme());
  }

  toggle(): void {
    this.apply(this.current() === 'dark' ? 'light' : 'dark');
  }

  current(): ThemeMode {
    return this.document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  }

  private apply(mode: ThemeMode): void {
    this.document.documentElement.classList.toggle('dark', mode === 'dark');
    if (this.isBrowser) {
      localStorage.setItem(STORAGE_KEY, mode);
    }
  }

  private getStoredOrPreferredTheme(): ThemeMode {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    if (stored === 'light' || stored === 'dark') return stored;

    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }
}
