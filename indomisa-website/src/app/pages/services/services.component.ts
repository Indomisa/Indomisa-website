import { Component } from '@angular/core';
import { ServiceItem } from './model/service-item';
import { SERVICES } from './config/services-config';



@Component({
  selector: 'app-services',
  standalone: true,
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  services: ServiceItem[] = SERVICES;
}