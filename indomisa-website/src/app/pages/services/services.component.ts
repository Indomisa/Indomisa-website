import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

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
export class ServicesComponent {
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
}