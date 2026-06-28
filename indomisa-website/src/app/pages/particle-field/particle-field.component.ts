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

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

@Component({
  selector: 'app-particle-field',
  standalone: true,
  templateUrl: './particle-field.component.html',
  styleUrls: ['./particle-field.component.scss']
})
export class ParticleFieldComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D | null = null;
  private particles: Particle[] = [];
  private animationFrameId: number | null = null;

  private readonly particleCount = 85;
  private readonly maxDistance = 120;
  private readonly isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    private ngZone: NgZone
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) {
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      const canvas = this.canvasRef.nativeElement;
      const context = canvas.getContext('2d');

      if (!context) {
        return;
      }

      this.ctx = context;

      this.resizeCanvas();
      this.createParticles();
      this.animate();

      window.addEventListener('resize', this.handleResize);
    });
  }

  ngOnDestroy(): void {
    if (!this.isBrowser) {
      return;
    }

    if (this.animationFrameId !== null) {
      window.cancelAnimationFrame(this.animationFrameId);
    }

    window.removeEventListener('resize', this.handleResize);
  }

  private handleResize = (): void => {
    this.resizeCanvas();
    this.createParticles();
  };

  private resizeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const parent = canvas.parentElement;

    if (!parent) {
      return;
    }

    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
  }

  private createParticles(): void {
    const canvas = this.canvasRef.nativeElement;

    this.particles = Array.from({ length: this.particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      radius: Math.random() * 1.6 + 0.8,
      opacity: Math.random() * 0.45 + 0.25
    }));
  }

  private animate = (): void => {
    if (!this.ctx) {
      return;
    }

    const canvas = this.canvasRef.nativeElement;

    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.drawBackgroundGlow();
    this.updateParticles(canvas);
    this.drawConnections();
    this.drawParticles();

    this.animationFrameId = window.requestAnimationFrame(this.animate);
  };

  private drawBackgroundGlow(): void {
    if (!this.ctx) {
      return;
    }

    const canvas = this.canvasRef.nativeElement;

    const gradient = this.ctx.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      0,
      canvas.width / 2,
      canvas.height / 2,
      canvas.width * 0.55
    );

    gradient.addColorStop(0, 'rgba(120, 80, 255, 0.16)');
    gradient.addColorStop(0.45, 'rgba(120, 80, 255, 0.05)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  private updateParticles(canvas: HTMLCanvasElement): void {
    for (const particle of this.particles) {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > canvas.width) {
        particle.vx *= -1;
      }

      if (particle.y < 0 || particle.y > canvas.height) {
        particle.vy *= -1;
      }
    }
  }

  private drawConnections(): void {
    if (!this.ctx) {
      return;
    }

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const a = this.particles[i];
        const b = this.particles[j];

        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.maxDistance) {
          const opacity = (1 - distance / this.maxDistance) * 0.22;

          this.ctx.beginPath();
          this.ctx.moveTo(a.x, a.y);
          this.ctx.lineTo(b.x, b.y);
          this.ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
          this.ctx.lineWidth = 0.7;
          this.ctx.stroke();
        }
      }
    }
  }

  private drawParticles(): void {
    if (!this.ctx) {
      return;
    }

    for (const particle of this.particles) {
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(139, 92, 246, ${particle.opacity})`;
      this.ctx.shadowColor = 'rgba(139, 92, 246, 0.9)';
      this.ctx.shadowBlur = 8;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    }
  }
}