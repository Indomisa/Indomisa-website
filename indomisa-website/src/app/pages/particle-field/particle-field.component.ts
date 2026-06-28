import { Component } from '@angular/core';

interface Particle {
  size: number;
  top: number;
  left: number;
  delay: number;
  duration: number;
}

@Component({
  selector: 'app-particle-field',
  standalone: true,
  templateUrl: './particle-field.component.html',
  styleUrls: ['./particle-field.component.scss']
})
export class ParticleFieldComponent {
  particles: Particle[] = Array.from({ length: 24 }, () => ({
    size: Math.random() * 4 + 2,
    top: Math.random() * 100,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 8 + 8
  }));
}