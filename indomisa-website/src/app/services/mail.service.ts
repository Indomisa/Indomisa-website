import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ContactMailRequest } from '../pages/contact/model/contact-mail-request';



@Injectable({
  providedIn: 'root'
})
export class MailService {
  private http = inject(HttpClient);

  private readonly endpoint = 'https://api.web3forms.com/submit';
  private readonly accessKey = environment.web3formsAccessKey;

  sendContactMail(formValue: ContactMailRequest): Observable<unknown> {
    const payload = {
      access_key: this.accessKey,
      subject: 'New Submission from Website Contact Form',
      ...formValue
    };

    return this.http.post(this.endpoint, payload);
  }
}