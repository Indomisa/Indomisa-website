import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaqComponent, FaqItem } from '../../shared/components/faq/faq.component';

type ServiceItem = {
  title: string;
  description: string;
};

type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

type TechItem = {
  name: string;
  description: string;
};

@Component({
  selector: 'app-software-development',
  standalone: true,
  imports: [RouterLink, FaqComponent],
  templateUrl: './software-development.component.html',
  styleUrl: './software-development.component.scss',
})
export class SoftwareDevelopmentComponent {
  protected readonly services: ServiceItem[] = [
    {
      title: 'Custom Business Systems',
      description:
        'Tailored platforms for operations, workflows, approvals, reporting, and internal business processes.',
    },
    {
      title: 'Web Applications',
      description:
        'Secure browser-based systems such as dashboards, portals, booking tools, and management platforms.',
    },
    {
      title: 'MVP Development',
      description:
        'Lean first versions of software products designed to validate an idea before scaling investment.',
    },
    {
      title: 'API Integrations',
      description:
        'Connect business systems, CRMs, ticketing tools, payment providers, accounting systems, and third-party APIs.',
    },
    {
      title: 'Workflow Automation',
      description:
        'Reduce repetitive manual work by digitising business rules, notifications, approvals, and task flows.',
    },
    {
      title: 'System Modernisation',
      description:
        'Improve outdated tools with cleaner architecture, better usability, stronger security, and scalable foundations.',
    },
  ];

  protected readonly technologies: TechItem[] = [
    {
      name: 'Angular',
      description: 'Modern frontend applications and responsive user interfaces.',
    },
    {
      name: 'Java Spring Boot',
      description: 'Reliable backend services, APIs, authentication, and business logic.',
    },
    {
      name: 'PostgreSQL',
      description: 'Structured relational data storage for business-critical systems.',
    },
    {
      name: 'Cloud Hosting',
      description: 'Deployment-ready infrastructure using scalable cloud platforms.',
    },
  ];

  protected readonly processSteps: ProcessStep[] = [
    {
      number: '01',
      title: 'Discovery & Requirements',
      description:
        'We clarify the business problem, users, workflows, features, constraints, and success criteria.',
    },
    {
      number: '02',
      title: 'Solution Design',
      description:
        'We define the architecture, data model, screens, integrations, user journeys, and delivery plan.',
    },
    {
      number: '03',
      title: 'Development',
      description:
        'We build the system in phases using clean code, reusable components, APIs, and regular demonstrations.',
    },
    {
      number: '04',
      title: 'Testing & Deployment',
      description:
        'We test the solution, fix defects, prepare documentation, deploy the system, and support go-live.',
    },
  ];

  protected readonly faqs: FaqItem[] = [
    {
      question: 'Do you build software from scratch?',
      answer:
        'Yes. We design and build custom software based on your specific business process, users, and operational requirements.',
    },
    {
      question: 'Can you start with an MVP?',
      answer:
        'Yes. An MVP is often the best approach because it delivers the most important functionality first and reduces project risk.',
    },
    {
      question: 'Can the software integrate with existing systems?',
      answer:
        'Yes. We can integrate with CRMs, ticketing systems, accounting tools, payment gateways, email services, and other APIs.',
    },
    {
      question: 'Will we own the software?',
      answer:
        'Ownership depends on the agreed contract, but the project source code, business logic, and documentation can be handed over as part of the delivery.',
    },
  ];
}