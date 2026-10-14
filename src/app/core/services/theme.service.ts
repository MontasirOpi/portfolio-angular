import { Injectable, signal, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly theme = signal<'light' | 'dark'>('light');
  constructor() {
    const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('opi-theme') : null;
    const prefersDark = typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)').matches : false;
    const initial = saved === 'dark' || saved === 'light' ? saved : (prefersDark ? 'dark' : 'light');
    this.theme.set(initial);
    effect(() => {
      const t = this.theme();
      document.documentElement.setAttribute('data-theme', t);
      try { localStorage.setItem('opi-theme', t); } catch {}
    });
  }
  toggle(): void { this.theme.update(v => v === 'light' ? 'dark' : 'light'); }
  isDark(): boolean { return this.theme() === 'dark'; }
}
