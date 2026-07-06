import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Stat } from '../../shared/model/stat';
import { STATS_CONFIG } from './config/stats.config';
import { GenericType } from '../../shared/model/generic-type';
import { WHY_US_CONFIG } from './config/why-us.config';
import { FEATURED_WORK_CONFIG } from './config/featured-work.config';
import { QuestionAnswer } from '../../shared/model/qa-model';
import { FAQ_CONFIG } from './config/faq.config';
import { FeaturedWorkModel } from './model/featured-work.model';
import { FaqComponent, FaqItem } from "../../shared/components/faq/faq.component";
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, FaqComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit {
  protected activeFaq: number | null = 0;

  protected readonly stats: Stat[] = STATS_CONFIG;

  protected readonly whyUs: GenericType[] = WHY_US_CONFIG;

  protected readonly featuredWork: FeaturedWorkModel[] = FEATURED_WORK_CONFIG;

  protected readonly faqs: QuestionAnswer[] = FAQ_CONFIG;

  constructor(private seo: SeoService) {}

  // SEO: page title/description/canonical + AboutPage structured data.
  // This page previously had no meta tags at all, so it inherited
  // whatever the last-visited route had left in <head>.
  ngOnInit(): void {
    this.seo.apply({
      title: 'About Us',
      description: 'Indomisa Consulting partners with small and medium businesses to design and build custom software, web applications, and digital systems.',
      path: '/about'
    });

    this.seo.setJsonLd('ld-about', {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About Indomisa Consulting',
      url: 'https://indomisa.it.com/about',
      mainEntity: {
        '@type': 'Organization',
        name: 'Indomisa Consulting',
        url: 'https://indomisa.it.com/'
      }
    });
  }

  protected toggleFaq(index: number): void {
    this.activeFaq = this.activeFaq === index ? null : index;
  }
}