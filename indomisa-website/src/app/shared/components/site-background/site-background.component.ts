import { Component } from '@angular/core';

/**
 * Static schematic-grid backdrop mounted once in AppComponent (a sibling of
 * <router-outlet>), replacing the old animated particle/starfield field.
 * Pure CSS — no canvas, no WebGL, no per-frame cost.
 */
@Component({
  selector: 'app-site-background',
  standalone: true,
  templateUrl: './site-background.component.html',
  styleUrl: './site-background.component.scss'
})
export class SiteBackgroundComponent {}
