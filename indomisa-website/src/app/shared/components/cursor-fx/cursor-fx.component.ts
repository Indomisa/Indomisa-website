import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/** Site-wide custom cursor: a small dot plus a lagging ring that
 * enlarges over interactive elements. Hidden entirely on touch
 * devices via CSS (see styles.scss `@media (hover: none)`). */
@Component({
  selector: 'app-cursor-fx',
  standalone: true,
  templateUrl: './cursor-fx.component.html',
  styleUrl: './cursor-fx.component.scss'
})
export class CursorFxComponent implements AfterViewInit, OnDestroy {
  @ViewChild('dot', { static: true }) dotRef!: ElementRef<HTMLDivElement>;
  @ViewChild('ring', { static: true }) ringRef!: ElementRef<HTMLDivElement>;

  private readonly isBrowser: boolean;
  private mouseX = 0;
  private mouseY = 0;
  private ringX = 0;
  private ringY = 0;
  private rafId: number | null = null;
  private observer: MutationObserver | null = null;

  private readonly onMouseMove = (e: MouseEvent) => {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
    const dot = this.dotRef.nativeElement;
    dot.style.left = this.mouseX + 'px';
    dot.style.top = this.mouseY + 'px';
  };

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    private readonly ngZone: NgZone
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) {
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('mousemove', this.onMouseMove);
      this.attachHoverListeners();
      this.animateRing();

      // Re-scan for newly rendered interactive elements (route changes,
      // *ngFor content, etc.) rather than only wiring up what existed
      // at component-init time.
      this.observer = new MutationObserver(() => this.attachHoverListeners());
      this.observer.observe(document.body, { childList: true, subtree: true });
    });
  }

  ngOnDestroy(): void {
    if (!this.isBrowser) {
      return;
    }
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
    }
    window.removeEventListener('mousemove', this.onMouseMove);
    this.observer?.disconnect();
  }

  private attachHoverListeners(): void {
    const ring = this.ringRef.nativeElement;
    document.querySelectorAll('a, button').forEach((el) => {
      if ((el as HTMLElement).dataset['cursorBound']) {
        return;
      }
      (el as HTMLElement).dataset['cursorBound'] = 'true';
      el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
    });
  }

  private animateRing = (): void => {
    this.ringX += (this.mouseX - this.ringX) * 0.18;
    this.ringY += (this.mouseY - this.ringY) * 0.18;
    const ring = this.ringRef.nativeElement;
    ring.style.left = this.ringX + 'px';
    ring.style.top = this.ringY + 'px';
    this.rafId = requestAnimationFrame(this.animateRing);
  };
}
