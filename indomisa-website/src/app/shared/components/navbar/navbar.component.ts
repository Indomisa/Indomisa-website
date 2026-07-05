import {
  Component,
  HostListener,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

interface NavLink {
  label: string;
  route: string;
  children?: NavLink[];
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  scrolled = signal(false);
  mobileOpen = signal(false);

  links: NavLink[] = [
    {
      label: 'Services', route: '/services', children: [
        { label: 'Web Development', route: '/services/web-development' },
        { label: 'Software Development', route: '/services/software-development' },
        { label: 'Business Analysis', route: '/services/business-analysis' },
      ]
    },
    { label: 'About', route: '/about' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 20);
  }

  toggleMenu(): void {
    this.mobileOpen.update(v => !v);
  }

  closeMenu(): void {
    this.mobileOpen.set(false);
  }
}