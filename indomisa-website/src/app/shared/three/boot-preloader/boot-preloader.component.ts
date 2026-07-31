import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
  signal
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { fibonacciSphere } from '../utils/fibonacci-sphere';

const ACCENT = 0x7ec8ff;

/**
 * Heavy-weight boot preloader: particles scattered in deep space are
 * pulled toward sphere targets by a damped spring, so the whole
 * formation overshoots and settles with real weighted momentum before
 * the site reveals. Fires once per full page load (mounted once in
 * AppComponent, which Angular never recreates on client-side route
 * navigation). Respects prefers-reduced-motion by skipping straight
 * to the settled/done state.
 */
@Component({
  selector: 'app-boot-preloader',
  standalone: true,
  templateUrl: './boot-preloader.component.html',
  styleUrl: './boot-preloader.component.scss'
})
export class BootPreloaderComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvasRef?: ElementRef<HTMLCanvasElement>;

  protected readonly isBrowser: boolean;
  protected readonly pct = signal(0);
  protected readonly done = signal(false);

  private rafId: number | null = null;
  private resizeHandler: (() => void) | null = null;
  private renderer: import('three').WebGLRenderer | null = null;
  private disposables: Array<{ dispose: () => void }> = [];

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    private readonly ngZone: NgZone
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) {
      return;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      this.pct.set(100);
      setTimeout(() => this.done.set(true), 250);
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      this.run().catch(() => {
        // three.js failed to load or WebGL unavailable — reveal the
        // page rather than trapping the visitor behind a frozen loader.
        this.ngZone.run(() => {
          this.pct.set(100);
          this.done.set(true);
        });
      });
    });
  }

  ngOnDestroy(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
    }
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
    }
    this.disposables.forEach((d) => d.dispose());
    this.renderer?.forceContextLoss();
    this.renderer?.dispose();
  }

  private async run(): Promise<void> {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) {
      return;
    }

    const THREE = await import('three');

    const vw = () => window.innerWidth || document.documentElement.clientWidth || 1;
    const vh = () => window.innerHeight || document.documentElement.clientHeight || 1;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer = renderer;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(vw(), vh());

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, vw() / vh(), 0.1, 100);
    camera.position.set(0, 0, 9);

    const COUNT = 420;
    const targets = fibonacciSphere(COUNT, 2.1);
    const positions = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = 10 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: ACCENT,
      size: 0.09,
      transparent: true,
      opacity: 0.95,
      sizeAttenuation: true
    });
    const points = new THREE.Points(geo, material);
    scene.add(points);
    this.disposables.push(geo, material);

    const stiffness = 0.012;
    const damping = 0.9;
    let shake = 0;
    let settled = false;
    const start = performance.now();
    const estDuration = 2200;

    const resize = () => {
      camera.aspect = vw() / vh();
      camera.updateProjectionMatrix();
      renderer.setSize(vw(), vh());
    };
    this.resizeHandler = resize;
    window.addEventListener('resize', resize);

    const tick = () => {
      this.rafId = requestAnimationFrame(tick);

      let totalSpeed = 0;
      let maxDist = 0;
      for (let i = 0; i < COUNT; i++) {
        const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2;
        const dx = targets[i][0] - positions[ix];
        const dy = targets[i][1] - positions[iy];
        const dz = targets[i][2] - positions[iz];
        velocities[ix] = (velocities[ix] + dx * stiffness) * damping;
        velocities[iy] = (velocities[iy] + dy * stiffness) * damping;
        velocities[iz] = (velocities[iz] + dz * stiffness) * damping;
        positions[ix] += velocities[ix];
        positions[iy] += velocities[iy];
        positions[iz] += velocities[iz];
        totalSpeed += Math.abs(velocities[ix]) + Math.abs(velocities[iy]) + Math.abs(velocities[iz]);
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist > maxDist) maxDist = dist;
      }
      geo.attributes['position'].needsUpdate = true;
      points.rotation.y += 0.0025;

      if (!settled && maxDist < 2.5 && shake === 0) {
        shake = 0.12;
      }
      if (shake > 0.0004) {
        camera.position.x = (Math.random() - 0.5) * shake;
        camera.position.y = (Math.random() - 0.5) * shake;
        shake *= 0.86;
      } else {
        camera.position.x = 0;
        camera.position.y = 0;
        shake = 0;
      }

      const elapsed = performance.now() - start;
      const avgSpeed = totalSpeed / COUNT;
      if (!settled && elapsed > 1200 && avgSpeed < 0.004) {
        settled = true;
      }
      const pct = settled ? 100 : Math.min(96, Math.round((elapsed / estDuration) * 100));
      this.ngZone.run(() => this.pct.set(pct));

      renderer.render(scene, camera);

      if (settled && elapsed > 1400) {
        if (this.rafId !== null) cancelAnimationFrame(this.rafId);
        window.removeEventListener('resize', resize);
        this.ngZone.run(() => this.pct.set(100));
        setTimeout(() => {
          this.ngZone.run(() => this.done.set(true));
          renderer.dispose();
          geo.dispose();
          material.dispose();
        }, 350);
      }
    };
    tick();
  }
}
