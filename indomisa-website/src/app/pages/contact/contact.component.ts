import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MailService } from '../../services/mail.service';
import { SERVICES } from './config/service-config';
import { ContactMailRequest } from './model/contact-mail-request';
import { genericType } from '../../shared/model/generic-type';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  private fb = inject(FormBuilder);
  private mailService = inject(MailService);
  private analytics = inject(AnalyticsService);

  loading = signal(false);
  submitted = signal(false);

  services: genericType[] = SERVICES;

  readonly contactForm: FormGroup = this.fb.nonNullable.group({
    name: [''],
    company: [''],
    email: ['', [
      Validators.required,
      Validators.email
    ]],
    phone: [''],
    service: [this.services.length > 0 ? this.services[0].title : ''],
    message: ['', [
      Validators.required,
      Validators.minLength(20)
    ]]
  });

  submit(): void {

    if (this.contactForm.invalid) {

      this.contactForm.markAllAsTouched();

      return;
    }

    this.loading.set(true);


    const payload: ContactMailRequest = {
      name: this.contactForm.get('name')?.value,
      company: this.contactForm.get('company')?.value,
      email: this.contactForm.get('email')?.value,
      phone: this.contactForm.get('phone')?.value,
      service: this.contactForm.get('service')?.value,
      message: this.contactForm.get('message')?.value,
    };

    this.mailService.sendContactMail(payload).subscribe({
      next: (response) => {
        this.analytics.track('contact_form_submit', {
          service: payload.service || undefined
        });
        this.loading.set(false);
        this.submitted.set(true);
        this.contactForm.reset();
      },
      error: (error) => {
        this.loading.set(false);
        alert('There was an error submitting the form. Please try again later.');
        console.error('Error submitting form:', error);
      }
    });

  }

}