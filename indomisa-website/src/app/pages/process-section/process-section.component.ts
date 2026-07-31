import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
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
export class ProcessSectionComponent implements AfterViewInit {
  readonly steps: ProcessStep[] = PROCESS_STEPS;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    this.updateTimelineFill();
    window.addEventListener('scroll', () => this.updateTimelineFill());
  }

  private updateTimelineFill(): void {
    const fillEl = document.getElementById('timelineFill');
    if (!fillEl) return;

    const timeline = fillEl.parentElement;
    if (!timeline) return;

    const rect = timeline.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (rect.height + window.innerHeight)));
    fillEl.style.height = `${progress * 100}%`;
  }
}