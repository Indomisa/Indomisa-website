import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { HeroComponent } from '../hero/hero.component';
import { AboutComponent } from '../about/about.component';
import { ServicesComponent } from '../services/services.component';
import { ProcessSectionComponent } from '../process-section/process-section.component';
import { DifferentiatorSectionComponent } from '../differentiator-section/differentiator-section.component';
import { ContactComponent } from '../contact/contact.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
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
    ContactComponent,
    FooterComponent,
    MarqueeTickerComponent
],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

}