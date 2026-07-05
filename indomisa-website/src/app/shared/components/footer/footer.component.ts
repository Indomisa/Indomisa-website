import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

interface FooterLinkGroup {
  title: string;
  links: string[];
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
      links: ['About']
    },
    {
      title: 'Services',
      links: ['Software Development', 'Web Development', 'Business Analysis']
    },
    {
      title: 'Resources',
      links: ['FAQ', 'Privacy Policy', 'Terms']
    }
  ];
  getServiceRoute(link: string): string {
    return '/services/' + link.toLowerCase().replaceAll(' ', '-');
  }
}