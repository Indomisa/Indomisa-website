import { Component } from '@angular/core';
import { ServiceItem } from './model/service-item';
import { SERVICES } from './config/services-config';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-services-preview',
  standalone: true,
  imports: [RouterLink],
templateUrl: './services-preview.component.html',
  styleUrls: ['./services-preview.component.scss']
})
export class ServicesPreviewComponent {
  services: ServiceItem[] = SERVICES;
}