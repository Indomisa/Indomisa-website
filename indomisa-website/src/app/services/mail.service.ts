import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactMailRequest {
  name: string | null;
  company: string | null;
  email: string | null;
  phone: string | null;
  service: string | null;
  message: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class MailService {
  private http = inject(HttpClient);

  private readonly endpoint = 'https://api.web3forms.com/submit';
  private readonly accessKey = 'd5e59142-daca-4d68-9601-35f63a980cb2';

  sendContactMail(formValue: ContactMailRequest): Observable<unknown> {
    const payload = {
      access_key: this.accessKey,
      subject: 'New Submission from Website Contact Form',
      ...formValue
    };

    return this.http.post(this.endpoint, payload);
  }
}