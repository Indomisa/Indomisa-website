import { Component } from '@angular/core';
import { GenericType } from '../../shared/model/generic-type';
import { QuestionAnswer } from '../../shared/model/qa-model';
import { FaqComponent } from "../../shared/components/faq/faq.component";
import { RouterLink } from '@angular/router';

type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

@Component({
  selector: 'app-web-development',
  standalone: true,
  templateUrl: './web-development.component.html',
  styleUrl: './web-development.component.scss',
  imports: [FaqComponent, RouterLink],
})
export class WebDevelopmentComponent {
  protected readonly services: GenericType[] = [
    {
      title: 'Business Websites',
      description:
        'Modern, responsive websites designed to represent your brand clearly and professionally.',
    },
    {
      title: 'Landing Pages',
      description:
        'High-converting landing pages for campaigns, services, products, and lead generation.',
    },
    {
      title: 'Web Applications',
      description:
        'Custom web-based systems for internal operations, customer portals, dashboards, and workflows.',
    },
    {
      title: 'Website Redesigns',
      description:
        'Improve outdated websites with better design, performance, usability, and SEO structure.',
    },
    {
      title: 'SEO Setup',
      description:
        'Technical SEO foundations including metadata, sitemap, structured data, performance, and indexing support.',
    },
    {
      title: 'Maintenance & Support',
      description:
        'Ongoing updates, fixes, content changes, monitoring, and technical support after launch.',
    },
  ];

  protected readonly processSteps: ProcessStep[] = [
    {
      number: '01',
      title: 'Discovery',
      description:
        'We understand your business, goals, audience, competitors, and required website functionality.',
    },
    {
      number: '02',
      title: 'Design & Structure',
      description:
        'We plan the pages, sections, user journey, content structure, and visual direction.',
    },
    {
      number: '03',
      title: 'Development',
      description:
        'We build the website using clean, responsive, scalable front-end code.',
    },
    {
      number: '04',
      title: 'Testing & Launch',
      description:
        'We test responsiveness, performance, forms, SEO basics, and deploy the website live.',
    },
  ];

  protected readonly faqs: QuestionAnswer[] = [
    {
      question: 'Can you build a simple business website?',
      answer:
        'Yes. We can build a professional business website with pages such as Home, About, Services, Contact, Privacy Policy, and Terms.',
    },
    {
      question: 'Do you build custom web applications?',
      answer:
        'Yes. We build custom systems such as dashboards, portals, workflow tools, booking systems, and internal business platforms.',
    },
    {
      question: 'Will the website be mobile-friendly?',
      answer:
        'Yes. All websites are built responsively for desktop, tablet, and mobile devices.',
    },
    {
      question: 'Do you help with Google indexing?',
      answer:
        'Yes. We can add sitemap.xml, robots.txt, SEO metadata, structured data, Google Analytics, and Google Search Console setup guidance.',
    },
  ];
}