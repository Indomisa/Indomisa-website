import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

interface FooterLink {
  label: string;
  route: string;
}

interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  footerLinks: FooterLinkGroup[] = [
    {
      title: 'Company',
      links: [{ label: 'About', route: '/about' }]
    },
    {
      title: 'Services',
      links: [
        { label: 'Software Development', route: '/services/software-development' },
        { label: 'Web Development', route: '/services/web-development' },
        { label: 'Business Analysis', route: '/services/business-analysis' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'FAQ', route: '/faq' },
        { label: 'Privacy Policy', route: '/privacy-policy' },
        { label: 'Terms', route: '/terms' }
      ]
    }
  ];
}