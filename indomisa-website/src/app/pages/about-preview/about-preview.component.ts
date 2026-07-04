import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AboutPoint } from './model/about-point';
import { ABOUT_CONFIG } from './config/about-config';


@Component({
  selector: 'app-about-preview',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about-preview.component.html',
  styleUrls: ['./about-preview.component.scss']
})
export class AboutPreviewComponent {
  points: AboutPoint[] = ABOUT_CONFIG;
}