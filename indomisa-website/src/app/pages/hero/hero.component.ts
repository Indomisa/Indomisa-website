import { Component, inject } from '@angular/core';
import { ParticleFieldComponent } from '../particle-field/particle-field.component';
import { AnalyticsService } from '../../services/analytics.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ParticleFieldComponent, RouterLink],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {

  private analytics = inject(AnalyticsService);

  trackHeroCTA(): void {
    this.analytics.track('hero_cta_click', {
      location: 'Hero',
      button: 'Get Started'
    });

  }
}