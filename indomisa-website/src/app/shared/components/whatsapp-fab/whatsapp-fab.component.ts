import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-whatsapp-fab',
  standalone: true,
  templateUrl: './whatsapp-fab.component.html',
  styleUrl: './whatsapp-fab.component.scss',
})
export class WhatsappFabComponent {
  @Input() phoneNumber = '27615249848';

  @Input() message =
    'Hi Indomisa Consulting, I would like to enquire about your software development services.';

  protected get whatsappUrl(): string {
    return `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(this.message)}`;
  }
}