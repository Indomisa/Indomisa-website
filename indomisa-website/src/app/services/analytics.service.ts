import { Injectable } from '@angular/core';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  track(
    event: string,
    parameters: Record<string, unknown> = {}
  ): void {

    if (typeof window.gtag !== 'function') {
      return;
    }

    window.gtag('event', event, parameters);

  }

}