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

const ACCENT = 0x7ec8ff;
const ACCENT_2 = 0xb98bff;

/**
 * Persistent sparse starfield drifting behind the entire app — mounted
 * once in AppComponent (a sibling of <router-outlet>), so it survives
 * every route change without remounting or leaking WebGL contexts.
 */
@Component({
  selector: 'app-ambient-starfield',
  standalone: true,
  templateUrl: './ambient-starfield.component.html',
  styleUrl: './ambient-starfield.component.scss'
})
export class AmbientStarfieldComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvasRef?: ElementRef<HTMLCanvasElement>;

  protected readonly isBrowser: boolean;

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
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    this.ngZone.runOutsideAngular(() => {
      this.run().catch(() => {
        // Silently skip the ambient effect if three.js/WebGL is unavailable.
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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(vw(), vh());

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, vw() / vh(), 0.1, 60);
    camera.position.z = 10;

    const COUNT = 220;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const colorA = new THREE.Color(ACCENT);
    const colorB = new THREE.Color(ACCENT_2);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = -Math.random() * 25 - 2;
      const c = Math.random() > 0.5 ? colorA : colorB;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const material = new THREE.PointsMaterial({
      size: 0.08,
      transparent: true,
      opacity: 0.5,
      vertexColors: true,
      sizeAttenuation: true
    });
    const field = new THREE.Points(geo, material);
    scene.add(field);
    this.disposables.push(geo, material);

    const resize = () => {
      camera.aspect = vw() / vh();
      camera.updateProjectionMatrix();
      renderer.setSize(vw(), vh());
    };
    this.resizeHandler = resize;
    window.addEventListener('resize', resize);

    const tick = (t: number) => {
      this.rafId = requestAnimationFrame(tick);
      if (document.hidden) return;
      field.rotation.y = t * 0.00002 + window.scrollY * 0.00006;
      field.rotation.x = Math.sin(t * 0.00005) * 0.05;
      renderer.render(scene, camera);
    };
    this.rafId = requestAnimationFrame(tick);
  }
}
