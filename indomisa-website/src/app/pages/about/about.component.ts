import { Component } from '@angular/core';
import { AboutPoint } from './model/about-point';
import { ABOUT_CONFIG } from './config/about-config';


@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  points: AboutPoint[] = ABOUT_CONFIG;
}