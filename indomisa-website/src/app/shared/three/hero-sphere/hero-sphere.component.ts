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
import { fibonacciSphere } from '../utils/fibonacci-sphere';

const ACCENT = 0x7ec8ff;
const ACCENT_2 = 0xb98bff;

/**
 * Mouse-reactive rotating particle sphere for the Home hero. Created
 * and destroyed on every Home route enter/leave, so disposal here is
 * rigorous — cancel the rAF loop, disconnect observers, dispose
 * geometry/material/renderer, and release the WebGL context, so
 * repeated navigation never leaks contexts (browsers cap out around
 * 8-16 live ones).
 */
@Component({
  selector: 'app-hero-sphere',
  standalone: true,
  templateUrl: './hero-sphere.component.html',
  styleUrl: './hero-sphere.component.scss'
})
export class HeroSphereComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvasRef?: ElementRef<HTMLCanvasElement>;

  protected readonly isBrowser: boolean;

  private rafId: number | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private intersectionObserver: IntersectionObserver | null = null;
  private mouseMoveHandler: ((e: MouseEvent) => void) | null = null;
  private renderer: import('three').WebGLRenderer | null = null;
  private disposables: Array<{ dispose: () => void }> = [];
  private visible = true;
  private destroyed = false;

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    private readonly ngZone: NgZone,
    private readonly hostEl: ElementRef<HTMLElement>
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) {
      return;
    }
    this.ngZone.runOutsideAngular(() => {
      this.run().catch(() => {
        // Silently skip — the reserved hero-image-slot still holds its
        // layout space via its own CSS background/aspect-ratio.
      });
    });
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
    }
    if (this.mouseMoveHandler) {
      this.hostEl.nativeElement.removeEventListener('mousemove', this.mouseMoveHandler);
    }
    this.resizeObserver?.disconnect();
    this.intersectionObserver?.disconnect();
    this.disposables.forEach((d) => d.dispose());
    this.renderer?.forceContextLoss();
    this.renderer?.dispose();
  }

  private async run(): Promise<void> {
    const canvas = this.canvasRef?.nativeElement;
    const host = this.hostEl.nativeElement;
    if (!canvas || !host) {
      return;
    }

    const THREE = await import('three');
    if (this.destroyed) {
      return;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer = renderer;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 5;

    const COUNT = 260;
    const targets = fibonacciSphere(COUNT, 1.5);
    const positions = new Float32Array(COUNT * 3);
    targets.forEach((p, i) => {
      positions[i * 3] = p[0];
      positions[i * 3 + 1] = p[1];
      positions[i * 3 + 2] = p[2];
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: ACCENT,
      size: 0.06,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true
    });
    const sphere = new THREE.Points(geo, material);
    scene.add(sphere);
    this.disposables.push(geo, material);

    const haloCount = 45;
    const haloPositions = new Float32Array(haloCount * 3);
    for (let i = 0; i < haloCount; i++) {
      const r = 2.1 + Math.random() * 0.7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      haloPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      haloPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      haloPositions[i * 3 + 2] = r * Math.cos(phi);
    }
    const haloGeo = new THREE.BufferGeometry();
    haloGeo.setAttribute('position', new THREE.BufferAttribute(haloPositions, 3));
    const haloMaterial = new THREE.PointsMaterial({
      color: ACCENT_2,
      size: 0.04,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true
    });
    const halo = new THREE.Points(haloGeo, haloMaterial);
    scene.add(halo);
    this.disposables.push(haloGeo, haloMaterial);

    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      const rect = host.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    this.mouseMoveHandler = onMouseMove;
    host.addEventListener('mousemove', onMouseMove);

    const resize = () => {
      const rect = host.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
      renderer.setSize(rect.width, rect.height);
    };
    this.resizeObserver = new ResizeObserver(resize);
    this.resizeObserver.observe(host);
    resize();

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        this.visible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0 }
    );
    this.intersectionObserver.observe(host);

    if (reduceMotion) {
      renderer.render(scene, camera);
      return;
    }

    const tick = () => {
      this.rafId = requestAnimationFrame(tick);
      if (!this.visible || document.hidden) return;
      sphere.rotation.y += 0.0022 + mouseX * 0.0015;
      halo.rotation.y -= 0.0008;
      const targetX = mouseY * 0.3;
      sphere.rotation.x += (targetX - sphere.rotation.x) * 0.03;
      renderer.render(scene, camera);
    };
    tick();
  }
}
