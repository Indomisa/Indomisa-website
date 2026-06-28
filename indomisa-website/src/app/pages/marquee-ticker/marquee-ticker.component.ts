import { Component } from '@angular/core';
import { MARQUEE_TICKER_CONFIG } from './config/marquee-ticker-config';

@Component({
  selector: 'app-marquee-ticker',
  standalone: true,
  templateUrl: './marquee-ticker.component.html',
  styleUrls: ['./marquee-ticker.component.scss']
})
export class MarqueeTickerComponent {
  items: string[] = MARQUEE_TICKER_CONFIG;
}