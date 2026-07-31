import { Component } from '@angular/core';
import { Differentiator } from './model/differentiator';
import { DIFFERENTIATOR_CONFIG } from './config/differentiator-config';
import { RouterLink } from '@angular/router';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { padIndex } from '../../shared/util/pad-index';

@Component({
  selector: 'app-differentiator-section',
  standalone: true,
  imports: [RouterLink, RevealOnScrollDirective],
  templateUrl: './differentiator-section.component.html',
  styleUrls: ['./differentiator-section.component.scss']
})
export class DifferentiatorSectionComponent {
  differentiators: Differentiator[] = DIFFERENTIATOR_CONFIG;
  padIndex = padIndex;
}