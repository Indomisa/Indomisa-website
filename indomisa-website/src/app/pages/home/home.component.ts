import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { HeroComponent } from '../hero/hero.component';
import { AboutComponent } from '../about/about.component';
import { ServicesComponent } from '../services/services.component';
import { ProcessSectionComponent } from '../process-section/process-section.component';
import { DifferentiatorSectionComponent } from '../differentiator-section/differentiator-section.component';
import { StatsComponent } from '../stats/stats.component';
import { TestimonialsComponent } from '../testimonials/testimonials.component';
import { ContactComponent } from '../contact/contact.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { MarqueeTickerComponent } from "../marquee-ticker/marquee-ticker.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    ServicesComponent,
    ProcessSectionComponent,
    DifferentiatorSectionComponent,
    StatsComponent,
    TestimonialsComponent,
    ContactComponent,
    FooterComponent,
    MarqueeTickerComponent
],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

}