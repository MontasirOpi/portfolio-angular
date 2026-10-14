import { AfterViewInit, Component, OnDestroy, signal } from '@angular/core';

interface SideNavItem {
  id: string;
  label: string;
}

/**
 * Fixed right-edge section rail, inspired by the *behaviour* of
 * editorial sites (e.g. a slim right-hand text nav with a scroll
 * ruler). No third-party text, code, or assets are copied — the
 * labels are this portfolio's own section names.
 *
 * Desktop only (>=1100px). Hidden on tablet/mobile to avoid overlap.
 * Active section is detected with an IntersectionObserver; scroll
 * progress is updated via a requestAnimationFrame-throttled listener.
 */
@Component({
  selector: 'app-side-nav',
  standalone: true,
  template: `
    <aside class="side-nav" aria-label="Section navigation">
      <div class="brand" aria-hidden="true">OPI</div>

      <nav class="labels" aria-label="Jump to section">
        <ul>
          @for (item of items; track item.id) {
            <li>
              <button
                type="button"
                class="label"
                [class.active]="active() === item.id"
                [class.passed]="isPassed(item.id)"
                [attr.aria-label]="'Jump to ' + item.label"
                [attr.aria-current]="active() === item.id ? 'true' : null"
                (click)="jump(item.id)"
              >
                {{ item.label }}
              </button>
            </li>
          }
        </ul>
      </nav>

      <div class="ruler-wrap" aria-hidden="true">
        <div class="ruler">
          <div class="ruler-line"></div>
          @for (tick of ticks; track tick) {
            <div class="tick" [style.top.%]="tick">
              <span class="tick-mark"></span>
              <span class="tick-num">{{ tick }}</span>
            </div>
          }
          <div class="progress-dot" [style.top.%]="progress()"></div>
        </div>
        <div class="progress-label">{{ progress() }}%</div>
      </div>
    </aside>
  `,
  styles: [`
    .side-nav {
      display: none;
      animation: sideFade 0.6s ease both;
    }
    @keyframes sideFade {
      from { opacity: 0.2; }
      to { opacity: 1; }
    }

    @media (min-width: 1100px) {
      .side-nav {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        position: fixed;
        top: 64px;
        right: 0;
        bottom: 0;
        width: 112px;
        padding: 1rem 16px 1rem 10px;
        z-index: 40;
        background: var(--bg);
        border-left: 1px solid var(--border);
      }
      .brand {
        font-family: var(--font-display);
        font-size: 0.62rem;
        font-weight: 700;
        letter-spacing: 0.22em;
        color: var(--text-3);
        text-align: right;
      }
      .labels {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
      .labels ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 0.9rem;
        align-items: flex-end;
        width: 100%;
      }
      .labels li { width: 100%; text-align: right; }
      .label {
        width: 100%;
        padding: 0;
        background: none;
        border: 0;
        cursor: pointer;
        font-family: var(--font-display);
        font-size: 0.62rem;
        font-weight: 500;
        letter-spacing: 0.1em;
        color: var(--text-3);
        text-align: right;
        white-space: nowrap;
        transition: color 250ms ease, font-size 250ms ease, opacity 250ms ease;
      }
      .label:hover { color: var(--text); }
      .label.passed { opacity: 0.6; }
      .label.active {
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        color: var(--text);
        opacity: 1;
      }
      .ruler-wrap {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 0.4rem;
      }
      .ruler {
        position: relative;
        width: 26px;
        height: 190px;
      }
      .ruler-line {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 5px;
        width: 1px;
        background: var(--border-strong);
      }
      .tick {
        position: absolute;
        right: 0;
        display: flex;
        align-items: center;
        gap: 3px;
        transform: translateY(-50%);
      }
      .tick-mark {
        width: 8px;
        height: 1px;
        background: var(--text-3);
      }
      .tick-num {
        font-family: var(--font-mono);
        font-size: 0.52rem;
        color: var(--text-3);
        line-height: 1;
      }
      .progress-dot {
        position: absolute;
        right: 2px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--accent);
        transform: translateY(-50%);
        transition: top 120ms linear;
      }
      .progress-label {
        font-family: var(--font-mono);
        font-size: 0.6rem;
        color: var(--text-2);
        padding-right: 0;
        min-width: 26px;
        text-align: right;
      }
    }

    @media print {
      .side-nav { display: none !important; }
    }
  `],
})
export class SideNavComponent implements AfterViewInit, OnDestroy {
  /** Portfolio's own sections, in page order. */
  readonly items: SideNavItem[] = [
    { id: 'about', label: 'ABOUT' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'ai', label: 'AI' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'experience', label: 'EXPERIENCE' },
    { id: 'contact', label: 'CONTACT' },
  ];

  /** Ruler tick marks (percent). */
  readonly ticks = [0, 25, 50, 75, 100];

  /** Id of the section currently crossing the viewport centre. */
  readonly active = signal<string | null>(null);

  /** Overall page scroll progress, 0–100. */
  readonly progress = signal(0);

  private observer: IntersectionObserver | null = null;
  private rafId = 0;
  private ticking = false;
  private readonly onScroll = () => this.scheduleProgressUpdate();
  private readonly onResize = () => this.scheduleProgressUpdate();

  ngAfterViewInit(): void {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.onResize, { passive: true });
    this.updateProgress();

    if (typeof IntersectionObserver === 'undefined') return;

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.active.set(entry.target.id);
          }
        }
      },
      // Only the section straddling the viewport centre counts as active.
      { root: null, rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );
    for (const item of this.items) {
      const el = document.getElementById(item.id);
      if (el) this.observer.observe(el);
    }
  }

  ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.onScroll);
      window.removeEventListener('resize', this.onResize);
    }
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.observer?.disconnect();
    this.observer = null;
  }

  /** Items above the active one render slightly faded. */
  isPassed(id: string): boolean {
    const current = this.active();
    if (!current) return false;
    const currentIndex = this.items.findIndex((item) => item.id === current);
    const index = this.items.findIndex((item) => item.id === id);
    return index !== -1 && currentIndex !== -1 && index < currentIndex;
  }

  /** Smooth-scroll to a section and mark it active immediately. */
  jump(id: string): void {
    if (typeof document === 'undefined') return;
    const el = document.getElementById(id);
    if (!el) return;
    this.active.set(id);
    const reduced = typeof window !== 'undefined'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  }

  /** Coalesce scroll/resize events into one rAF per frame. */
  private scheduleProgressUpdate(): void {
    if (this.ticking) return;
    this.ticking = true;
    this.rafId = requestAnimationFrame(() => {
      this.ticking = false;
      this.updateProgress();
    });
  }

  /** progress = scrollY / (documentHeight - viewportHeight), clamped 0–100. */
  private updateProgress(): void {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (max <= 0) {
      this.progress.set(0);
      return;
    }
    const pct = Math.round((window.scrollY / max) * 100);
    this.progress.set(Math.min(100, Math.max(0, pct)));
    // At the very bottom the last section is the active one.
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
      this.active.set('contact');
    }
  }
}
