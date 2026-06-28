import { Component } from '@angular/core';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent {
  testimonials: Testimonial[] = [
    {
      name: 'Sarah Mitchell',
      role: 'Operations Director',
      company: 'GrowthPoint Logistics',
      quote: 'SageCore transformed our manual processes into a clean digital workflow. The system saved our team hours every week.'
    },
    {
      name: 'Daniel Naidoo',
      role: 'Founder',
      company: 'Urban Retail Co.',
      quote: 'They understood our business quickly and delivered a practical application that actually solved our day-to-day problems.'
    },
    {
      name: 'Amelia Jacobs',
      role: 'Managing Partner',
      company: 'FinanceHub Advisory',
      quote: 'The team was professional, responsive, and technically strong. We now have a scalable platform that supports our growth.'
    }
  ];
}