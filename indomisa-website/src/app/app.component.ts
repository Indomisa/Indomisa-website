import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shared/components/footer/footer.component";
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { ThemeService } from './services/theme.service';
import { WhatsappFabComponent } from "./shared/components/whatsapp-fab/whatsapp-fab.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NavbarComponent, RouterLink, WhatsappFabComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Indomisa';

  // THEME: applies the visitor's saved (or OS-preferred) light/dark
  // choice as soon as the app boots. See ThemeService for details.
  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.init();
  }
}
