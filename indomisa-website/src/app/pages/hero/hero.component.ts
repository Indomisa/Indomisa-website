import { Component, NgZone, OnInit, OnDestroy } from '@angular/core';
import { HeroSphereComponent } from '../../shared/three/hero-sphere/hero-sphere.component';
import { AnalyticsService } from '../../services/analytics.service';
import { RouterLink } from '@angular/router';
import { inject } from '@angular/core';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [HeroSphereComponent, RouterLink, RevealOnScrollDirective],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit, OnDestroy {
  private analytics = inject(AnalyticsService);
  private ngZone = inject(NgZone);

  typewriterText = '';
  private typewriterInterval: any;
  private typewriterTimeout: any;

  private readonly lines = [
    '$ custom-software --tailored --scalable',
    '> building digital systems',
    'launching with confidence'
  ];
  private currentLineIndex = 0;
  private currentCharIndex = 0;

  ngOnInit(): void {
    this.startTypewriter();
  }

  ngOnDestroy(): void {
    if (this.typewriterInterval) clearTimeout(this.typewriterInterval);
    if (this.typewriterTimeout) clearTimeout(this.typewriterTimeout);
  }

  private startTypewriter(): void {
    const type = () => {
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