import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { HeroComponent } from "../hero/hero.component";
import { ProcessSectionComponent } from "../process-section/process-section.component";
import { MarqueeTickerComponent } from "../marquee-ticker/marquee-ticker.component";
import { DifferentiatorSectionComponent } from "../differentiator-section/differentiator-section.component";
import { AboutPreviewComponent } from "../about-preview/about-preview.component";
import { ServicesPreviewComponent } from "../services-preview/services-preview.component";
import { ContactPreviewComponent } from '../contact-preview/contact-preview.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [HeroComponent, ProcessSectionComponent, MarqueeTickerComponent, DifferentiatorSectionComponent, AboutPreviewComponent, ServicesPreviewComponent, ContactPreviewComponent],
})
export class HomeComponent implements OnInit {

  constructor(
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Indomisa Consulting | Software Development & Business Solutions');

    this.meta.updateTag({
      name: 'description',
      content: 'Indomisa Consulting provides software development, business analysis, system design, and digital transformation solutions in South Africa.'
    });

    this.meta.updateTag({
      name: 'keywords',
      content: 'Indomisa, software development South Africa, business consulting, Angular development, Java development'
    });

    this.meta.updateTag({
      property: 'og:title',
      content: 'Indomisa Consulting'
    });

    this.meta.updateTag({
      property: 'og:description',
      content: 'Software development and business consulting solutions for modern businesses.'
    });

    this.meta.updateTag({
      property: 'og:url',
      content: 'https://indomisa.co.za/'
    });

    this.meta.updateTag({
      property: 'og:type',
      content: 'website'
    });
  }
}