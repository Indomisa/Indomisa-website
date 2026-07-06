import { Component, OnInit } from '@angular/core';
import { HeroComponent } from "../hero/hero.component";
import { ProcessSectionComponent } from "../process-section/process-section.component";
import { MarqueeTickerComponent } from "../marquee-ticker/marquee-ticker.component";
import { DifferentiatorSectionComponent } from "../differentiator-section/differentiator-section.component";
import { AboutPreviewComponent } from "../about-preview/about-preview.component";
import { ServicesPreviewComponent } from '../services-preview/services-preview.component';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [HeroComponent, ProcessSectionComponent, MarqueeTickerComponent, DifferentiatorSectionComponent, AboutPreviewComponent, ServicesPreviewComponent],
})
export class HomeComponent implements OnInit {

  constructor(private seo: SeoService) { }

  ngOnInit(): void {
    // SEO: homepage title/description/canonical/OG tags, previously set
    // with raw Title/Meta calls here (this was the only page that had
    // any at all). Moved to SeoService so every route follows the same
    // pattern. Domain corrected to indomisa.it.com to match sitemap.xml
    // and robots.txt (it was previously indomisa.co.za, a mismatch that
    // would have confused canonical/OG signals to search engines).
    this.seo.apply({
      title: 'Custom Software Development & Business Solutions',
      description: 'Indomisa Consulting provides custom software development, web development, and business analysis for small and medium businesses in South Africa.',
      path: '/'
    });

    // SEO: Organization + WebSite structured data for the homepage.
    // Helps Google understand the business entity and enables sitelinks
    // search box eligibility.
    this.seo.setJsonLd('ld-home', {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Indomisa Consulting',
      url: 'https://indomisa.it.com/',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://indomisa.it.com/services?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    });
  }
}
