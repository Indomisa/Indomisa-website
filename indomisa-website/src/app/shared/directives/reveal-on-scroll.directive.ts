import {
  AfterViewInit,
  Directive,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  PLATFORM_ID,
  Renderer2
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Fades an element up into place the first time it scrolls into view.
 * No-ops on the server so content stays visible for crawlers/no-JS
 * clients, and never re-triggers once revealed (no scroll-jacking).
 *
 * Usage: <div appReveal [appRevealDelay]="$index * 80">...</div>
 */
@Directive({
  selector: '[appReveal]',
  standalone: true
})
export class RevealOnScrollDirective implements AfterViewInit, OnDestroy {
  @Input() appRevealDelay = 0;
  @Input() appRevealThreshold = 0.15;

  private observer: IntersectionObserver | null = null;
  private readonly isBrowser: boolean;

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) {
      return;
    }

    const element = this.el.nativeElement;
    this.renderer.addClass(element, 'reveal');
    if (this.appRevealDelay > 0) {
      this.renderer.setStyle(element, 'transition-delay', `${this.appRevealDelay}ms`);
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.renderer.addClass(element, 'in-view');
            this.observer?.unobserve(element);
          }
        }
      },
      { threshold: this.appRevealThreshold }
    );
    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
