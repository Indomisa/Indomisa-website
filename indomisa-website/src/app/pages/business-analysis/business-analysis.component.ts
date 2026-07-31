import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaqComponent, FaqItem } from '../../shared/components/faq/faq.component';
import { SeoService } from '../../services/seo.service';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { padIndex } from '../../shared/util/pad-index';

type CardItem = {
  title: string;
  description: string;
};

type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

@Component({
  selector: 'app-business-analysis',
  standalone: true,
  imports: [RouterLink, FaqComponent, RevealOnScrollDirective],
  templateUrl: './business-analysis.component.html',
  styleUrl: './business-analysis.component.scss',
})
export class BusinessAnalysisComponent implements OnInit {
  protected padIndex = padIndex;
  protected readonly services: CardItem[] = [
    {
      title: 'Requirements Gathering',
      description:
        'Structured workshops to clarify business needs, users, workflows, rules, and success criteria.',
    },
    {
      title: 'Process Mapping',
      description:
        'Visualise current processes, identify bottlenecks, and design improved future-state workflows.',
    },
    {
      title: 'SRS Documentation',
      description:
        'Detailed software requirements specifications for developers, stakeholders, and sign-off.',
    },
    {
      title: 'MVP Scoping',
      description:
        'Define the smallest valuable version of a solution to reduce cost, risk, and delivery time.',
    },
    {
      title: 'User Stories',
      description:
        'Translate business needs into clear user stories, acceptance criteria, and delivery backlog items.',
    },
    {
      title: 'UAT Planning',
      description:
        'Prepare test scenarios, acceptance checks, and sign-off criteria before launch.',
    },
  ];

  protected readonly processSteps: ProcessStep[] = [
    {
      number: '01',
      title: 'Understand',
      description:
        'We learn your business, pain points, stakeholders, current tools, and operational constraints.',
    },
    {
      number: '02',
      title: 'Analyse',
      description:
        'We identify gaps, risks, process inefficiencies, dependencies, and improvement opportunities.',
    },
    {
      number: '03',
      title: 'Document',
      description:
        'We produce clear requirements, workflows, user stories, acceptance criteria, and delivery scope.',
    },
    {
      number: '04',
      title: 'Validate',
      description:
        'We review requirements with stakeholders to confirm accuracy before development begins.',
    },
  ];

  protected readonly deliverables: CardItem[] = [
    {
      title: 'Business Requirements Document',
      description:
        'A business-facing document explaining objectives, stakeholders, processes, pain points, and desired outcomes.',
    },
    {
      title: 'Software Requirements Specification',
      description:
        'A technical requirements document defining features, system behaviour, integrations, and constraints.',
    },
    {
      title: 'Process Flow Diagrams',
      description:
        'Clear diagrams showing current-state and future-state workflows.',
    },
    {
      title: 'Backlog & User Stories',
      description:
        'Structured backlog items with user stories and acceptance criteria for development.',
    },
  ];

  protected readonly faqs: FaqItem[] = [
    {
      question: 'Why do we need business analysis before development?',
      answer:
        'Business analysis reduces uncertainty before development starts. It helps clarify what must be built, what can wait, and how success will be measured.',
    },
    {
      question: 'Can you help us define an MVP?',
      answer:
        'Yes. We help separate must-have features from future enhancements so the first version delivers value without unnecessary scope creep.',
    },
    {
      question: 'Do you create documentation developers can use?',
      answer:
        'Yes. We produce structured requirements, user stories, process flows, acceptance criteria, and SRS documentation that can guide implementation.',
    },
    {
      question: 'Can business analysis be done as a standalone service?',
      answer:
        'Yes. You can engage us only for discovery, documentation, scoping, and requirements before deciding whether to proceed with development.',
    },
  ];

  constructor(private seo: SeoService) {}

  // SEO: Service-page title/description/canonical + Service schema.
  ngOnInit(): void {
    this.seo.apply({
      title: 'Business Analysis',
      description: 'Requirements gathering, process mapping, SRS documentation, and MVP scoping to turn business problems into clear, buildable solutions.',
      path: '/services/business-analysis'
    });

    this.seo.setJsonLd('ld-service', {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Business Analysis',
      provider: { '@type': 'Organization', name: 'Indomisa Consulting', url: 'https://indomisa.it.com/' },
      areaServed: 'ZA',
      url: 'https://indomisa.it.com/services/business-analysis'
    });
  }
}