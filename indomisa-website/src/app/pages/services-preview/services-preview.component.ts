import { Component } from '@angular/core';
import { ServiceItem } from './model/service-item';
import { SERVICES } from './config/services-config';
import { RouterLink } from '@angular/router';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { padIndex } from '../../shared/util/pad-index';

@Component({
  selector: 'app-services-preview',
  standalone: true,
  imports: [RouterLink, RevealOnScrollDirective],
  templateUrl: './services-preview.component.html',
  styleUrls: ['./services-preview.component.scss']
})
export class ServicesPreviewComponent {
  services: ServiceItem[] = SERVICES;
  padIndex = padIndex;
}