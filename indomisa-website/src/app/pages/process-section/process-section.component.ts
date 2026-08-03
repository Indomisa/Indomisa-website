import { Component, AfterViewInit, OnDestroy, Inject, PLATFORM_ID, ElementRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PROCESS_STEPS } from './config/process-step-config';
import { ProcessStep } from './model/process-step';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-process-section',
  standalone: true,
  imports: [RevealOnScrollDirective],
  templateUrl: './process-section.component.html',
  styleUrls: ['./process-section.component.scss']
})
export class ProcessSectionComponent implements AfterViewInit, OnDestroy {
  readonly steps: ProcessStep[] = PROCESS_STEPS;

  private readonly isBrowser: boolean;
  private readonly onScroll = () => this.updateTimelineProgress();

  // How far (in px) the light has to be from a marker's center before that
  // marker's glow reaches zero — tunes how wide the "shine" falls off.
  private readonly glowRadius = 90;

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    private readonly host: ElementRef<HTMLElement>
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    this.updateTimelineProgress();
    window.addEventListener('scroll', this.onScroll, { passive: true });
  }

  ngOnDestroy(): void {
    if (!this.isBrowser) return;
    window.removeEventListener('scroll', this.onScroll);
  }

  // Drives the timeline's traveling light: an orb slides down the line in
  // sync with scroll, and each step marker's glow ramps up or down based on
  // its live distance to that orb — so the light visibly arrives at, and
  // departs from, each number rather than snapping on and off.
  private updateTimelineProgress(): void {
    const root = this.host.nativeElement;
    const line = root.querySelector<HTMLElement>('.timeline-line');
    const fillEl = root.querySelector<HTMLElement>('.timeline-line-fill');
    const lightEl = root.querySelector<HTMLElement>('.timeline-light');
    if (!line || !fillEl || !lightEl) return;

    const rect = line.getBoundingClientRect();
    const progress = Math.max(
      0,
      Math.min(1, (window.innerHeight - rect.top) / (rect.height + window.innerHeight))
    );
    fillEl.style.transform = `scaleY(${progress})`;

    const lightY = progress * rect.height;
    lightEl.style.top = `${lightY}px`;

    const markers = root.querySelectorAll<HTMLElement>('.step-marker');
    markers.forEach((marker) => {
      const markerRect = marker.getBoundingClientRect();
      const markerY = markerRect.top - rect.top + markerRect.height / 2;
      const distance = Math.abs(lightY - markerY);
      const intensity = Math.max(0, 1 - distance / this.glowRadius);
      marker.style.setProperty('--glow', intensity.toFixed(3));
    });
  }
}
