import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';

type ServiceCard = {
  title: string;
  description: string;
  route: string;
  tag: string;
};

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent implements OnInit {
  protected readonly services: ServiceCard[] = [
    {
      title: 'Software Development',
      description:
        'Custom business systems, web applications, dashboards, portals, APIs, and workflow automation.',
      route: '/services/software-development',
      tag: 'Build',
    },
    {
      title: 'Web Development',
      description:
        'Modern websites, landing pages, SEO-ready pages, business websites, and responsive web experiences.',
      route: '/services/web-development',
      tag: 'Web',
    },
    {
      title: 'Business Analysis',
      description:
        'Requirements gathering, SRS documents, process mapping, MVP scoping, user stories, and UAT planning.',
      route: '/services/business-analysis',
      tag: 'Plan',
    }
  ];

  constructor(private seo: SeoService) {}

  // SEO: title/description/canonical + an ItemList of the three service
  // pages so search engines can associate this hub page with each
  // individual service (which each carry their own Service schema).
  ngOnInit(): void {
    this.seo.apply({
      title: 'Services',
      description: 'Software development, web development, and business analysis services for small and medium businesses, from requirements to launch.',
      path: '/services'
    });

    this.seo.setJsonLd('ld-services', {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: this.services.map((service, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://indomisa.it.com${service.route}`,
        name: service.title
      }))
    });
  }
}