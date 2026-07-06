import {
  Component,
  HostListener,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { ThemeService } from '../../../services/theme.service';

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

  protected readonly scrolled = signal(false);
  protected readonly mobileMenuOpen = signal(false);
  protected readonly openedDropdown = signal<string | null>(null);
  // THEME: reflects current theme so the toggle button/icon stays in sync.
  protected readonly isDark = signal(false);

  constructor(private themeService: ThemeService) {
    this.isDark.set(this.themeService.current() === 'dark');
  }

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
  protected onWindowScroll(): void {
    this.scrolled.set(window.scrollY > 20);
  }

  protected toggleMenu(): void {
    this.mobileMenuOpen.update((isOpen) => !isOpen);
  }

  protected closeMenu(): void {
    this.mobileMenuOpen.set(false);
    this.openedDropdown.set(null);
  }

  protected toggleMobileDropdown(label: string): void {
    this.openedDropdown.update((current) => (current === label ? null : label));
  }

  protected toggleTheme(): void {
    this.themeService.toggle();
    this.isDark.set(this.themeService.current() === 'dark');
  }
}