import { Component } from '@angular/core';
import { Differentiator } from './model/differentiator';
import { DIFFERENTIATOR_CONFIG } from './config/differentiator-config';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-differentiator-section',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './differentiator-section.component.html',
  styleUrls: ['./differentiator-section.component.scss']
})
export class DifferentiatorSectionComponent {
  differentiators: Differentiator[] = DIFFERENTIATOR_CONFIG;
}