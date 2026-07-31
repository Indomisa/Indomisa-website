import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AboutPoint } from './model/about-point';
import { ABOUT_CONFIG } from './config/about-config';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { padIndex } from '../../shared/util/pad-index';

@Component({
  selector: 'app-about-preview',
  standalone: true,
  imports: [RouterLink, RevealOnScrollDirective],
  templateUrl: './about-preview.component.html',
  styleUrls: ['./about-preview.component.scss']
})
export class AboutPreviewComponent {
  points: AboutPoint[] = ABOUT_CONFIG;
  padIndex = padIndex;
}