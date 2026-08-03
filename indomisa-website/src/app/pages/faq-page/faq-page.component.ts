import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaqComponent, FaqItem } from '../../shared/components/faq/faq.component';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-faq-page',
  standalone: true,
  imports: [RouterLink, FaqComponent],
  templateUrl: './faq-page.component.html',
  styleUrl: './faq-page.component.scss'
})
export class FaqPageComponent implements OnInit {
  protected readonly generalFaqs: FaqItem[] = [
    {
      question: 'Do you only build websites?',
      answer:
        'No. We build websites, web applications, business systems, dashboards, portals, integrations, and custom software tools.'
    },
    {
      question: 'Can you build an MVP first?',
      answer:
        'Yes. We recommend starting with an MVP when the business needs to validate the solution before investing in a full platform.'
    },
    {
      question: 'Do you provide support after development?',
      answer:
        'Yes. We can provide post-launch support, bug fixes, enhancements, hosting guidance, and system improvements.'
    },
    {
      question: 'What technologies do you use?',
      answer:
        'Our preferred stack includes Angular, Java Spring Boot, PostgreSQL, cloud hosting, REST APIs, and modern web technologies.'
    },
    {
      question: 'How do we start a project?',
      answer:
        'We start with a discovery session to understand your problem, define the MVP or full scope, estimate cost, and prepare a formal proposal.'
    }
  ];

  protected readonly webDevelopmentFaqs: FaqItem[] = [
    {
      question: 'Can you build a simple business website?',
      answer:
        'Yes. We can build a professional business website with pages such as Home, About, Services, Contact, Privacy Policy, and Terms.'
    },
    {
      question: 'Do you build custom web applications?',
      answer:
        'Yes. We build custom systems such as dashboards, portals, workflow tools, booking systems, and internal business platforms.'
    },
    {
      question: 'Will the website be mobile-friendly?',
      answer: 'Yes. All websites are built responsively for desktop, tablet, and mobile devices.'
    },
    {
      question: 'Do you help with Google indexing?',
      answer:
        'Yes. We can add sitemap.xml, robots.txt, SEO metadata, structured data, Google Analytics, and Google Search Console setup guidance.'
    }
  ];

  protected readonly softwareDevelopmentFaqs: FaqItem[] = [
    {
      question: 'Do you build software from scratch?',
      answer:
        'Yes. We design and build custom software based on your specific business process, users, and operational requirements.'
    },
    {
      question: 'Can you start with an MVP?',
      answer:
        'Yes. An MVP is often the best approach because it delivers the most important functionality first and reduces project risk.'
    },
    {
      question: 'Can the software integrate with existing systems?',
      answer:
        'Yes. We can integrate with CRMs, ticketing systems, accounting tools, payment gateways, email services, and other APIs.'
    },
    {
      question: 'Will we own the software?',
      answer:
        'Ownership depends on the agreed contract, but the project source code, business logic, and documentation can be handed over as part of the delivery.'
    }
  ];

  protected readonly businessAnalysisFaqs: FaqItem[] = [
    {
      question: 'Why do we need business analysis before development?',
      answer:
        'Business analysis reduces uncertainty before development starts. It helps clarify what must be built, what can wait, and how success will be measured.'
    },
    {
      question: 'Can you help us define an MVP?',
      answer:
        'Yes. We help separate must-have features from future enhancements so the first version delivers value without unnecessary scope creep.'
    },
    {
      question: 'Do you create documentation developers can use?',
      answer:
        'Yes. We produce structured requirements, user stories, process flows, acceptance criteria, and SRS documentation that can guide implementation.'
    },
    {
      question: 'Can business analysis be done as a standalone service?',
      answer:
        'Yes. You can engage us only for discovery, documentation, scoping, and requirements before deciding whether to proceed with development.'
    }
  ];

  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.apply({
      title: 'FAQ',
      description:
        'Answers to common questions about working with Indomisa Consulting on web development, software development, and business analysis projects.',
      path: '/faq'
    });

    const allFaqs = [
      ...this.generalFaqs,
      ...this.webDevelopmentFaqs,
      ...this.softwareDevelopmentFaqs,
      ...this.businessAnalysisFaqs
    ];

    this.seo.setJsonLd('ld-faq', {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: allFaqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    });
  }
}
