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

  loading = signal(false);
  submitted = signal(false);

  services: string[] = ['Web Development',
    'Mobile Development',
    'Cloud Solutions',
    'AI & Automation'];

  readonly contactForm: FormGroup = this.fb.nonNullable.group({
    name: [''],
    company: [''],
    email: ['', [
      Validators.required,
      Validators.email
    ]],
    phone: [''],
    service: [''],
    message: ['', [
      Validators.required,
      Validators.minLength(20)
    ]]
  });

  submit(): void {

    console.log('Form submitted:', this.contactForm.value);
    if (this.contactForm.invalid) {

      this.contactForm.markAllAsTouched();

      return;
    }

    this.loading.set(true);


    const payload = {
      name: this.contactForm.get('name')?.value,
      company: this.contactForm.get('company')?.value,
      email: this.contactForm.get('email')?.value,
      phone: this.contactForm.get('phone')?.value,
      service: this.contactForm.get('service')?.value,
      message: this.contactForm.get('message')?.value,
      access_key: 'd5e59142-daca-4d68-9601-35f63a980cb2',
      subject: 'New Submission from Website Contact Form'
    };

    this.mailService.sendContactMail(payload).subscribe({
      next: (response) => {
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