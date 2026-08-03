import { Component, NgZone, OnInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AnalyticsService } from '../../services/analytics.service';
import { RouterLink } from '@angular/router';
import { inject } from '@angular/core';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink, RevealOnScrollDirective],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit, OnDestroy {
  private analytics = inject(AnalyticsService);
  private ngZone = inject(NgZone);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  typewriterText = '';
  private typewriterInterval: any;
  private typewriterTimeout: any;
  private destroyed = false;

  private readonly lines = [
    '$ custom-software --tailored --scalable',
    '> building digital systems',
    'launching with confidence'
  ];
  private currentLineIndex = 0;
  private currentCharIndex = 0;

  ngOnInit(): void {
    // Runs client-side only, and outside the Angular zone: a recursive
    // setTimeout chain inside the zone never lets NgZone go stable,
    // which hangs Angular Universal's SSR render (and prerendering)
    // indefinitely waiting for stability.
    if (!this.isBrowser) {
      return;
    }
    this.ngZone.runOutsideAngular(() => this.startTypewriter());
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    if (this.typewriterInterval) clearTimeout(this.typewriterInterval);
    if (this.typewriterTimeout) clearTimeout(this.typewriterTimeout);
  }

  private startTypewriter(): void {
    const type = () => {
      if (this.destroyed) {
        return;
      }
      const current = this.lines[this.currentLineIndex];
      if (this.currentCharIndex < current.length) {
        this.typewriterText += current[this.currentCharIndex];
        this.currentCharIndex++;
        this.typewriterInterval = setTimeout(type, 50);
      } else {
        this.typewriterTimeout = setTimeout(() => {
          this.typewriterText = '';
          this.currentLineIndex = (this.currentLineIndex + 1) % this.lines.length;
          this.currentCharIndex = 0;
          type();
        }, 2000);
      }
      this.ngZone.run(() => {});
    };
    type();
  }

  trackHeroCTA(): void {
    this.analytics.track('hero_cta_click', {
      location: 'Hero',
      button: 'Get Started'
    });
  }
}