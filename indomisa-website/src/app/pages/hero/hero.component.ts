import { Component } from '@angular/core';
import { ParticleFieldComponent } from '../particle-field/particle-field.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ParticleFieldComponent],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {}