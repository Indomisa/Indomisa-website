import { LowerCasePipe } from '@angular/common';
import { Component } from '@angular/core';

interface FooterLinkGroup {
  title: string;
  links: string[];
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [LowerCasePipe],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  footerLinks: FooterLinkGroup[] = [
    {
      title: 'Company',
      links: ['About', 'Careers', 'Blog', 'Press']
    },
    {
      title: 'Services',
      links: ['Mobile Apps', 'Web Apps', 'Analytics', 'Support']
    },
    {
      title: 'Resources',
      links: ['Case Studies', 'FAQ', 'Privacy Policy', 'Terms']
    }
  ];
}