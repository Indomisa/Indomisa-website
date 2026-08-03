import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shared/components/footer/footer.component";
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { WhatsappFabComponent } from "./shared/components/whatsapp-fab/whatsapp-fab.component";
import { CursorFxComponent } from "./shared/components/cursor-fx/cursor-fx.component";
import { SiteBackgroundComponent } from "./shared/components/site-background/site-background.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FooterComponent,
    NavbarComponent,
    RouterLink,
    WhatsappFabComponent,
    CursorFxComponent,
    SiteBackgroundComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Indomisa';
}
