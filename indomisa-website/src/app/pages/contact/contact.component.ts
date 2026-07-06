import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MailService } from '../../services/mail.service';
import { ContactMailRequest } from './model/contact-mail-request';
import { AnalyticsService } from '../../services/analytics.service';
import { PROJECT_TYPE_CONFIG } from './config/project-type.config';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { GenericOption } from '../../shared/model/generic-option.model';
import { PROJECT_SCALE_CONFIG } from './config/project-scale.config';
import { SeoService } from '../../services/seo.service';

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
export class ContactComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  private mailService = inject(MailService);
  private analytics = inject(AnalyticsService);
  private seo = inject(SeoService);

  protected readonly currentStep = signal(1);

  protected readonly projectTypes: GenericOption[] = PROJECT_TYPE_CONFIG;

  protected readonly projectScales: GenericOption[] = PROJECT_SCALE_CONFIG;

  protected readonly contactForm = this.formBuilder.nonNullable.group({
    projectType: ['', Validators.required],
    projectScale: ['', Validators.required],
    businessName: [''],
    whatsappNumber: [
      '',
      [Validators.required, Validators.pattern(/^(\+27|0)[6-8][0-9]{8}$/)],
    ],
    email: ['', Validators.email],
  });

  protected readonly progress = computed(() => `${(this.currentStep() / 3) * 100}%`);

  protected readonly googleMapUrl: SafeResourceUrl;

  constructor(private readonly sanitizer: DomSanitizer) {
    this.googleMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.google.com/maps?q=Johannesburg,South%20Africa&output=embed'
    );
  }

  // SEO: title/description/canonical + LocalBusiness structured data.
  // Uses the same name/address/phone (NAP) shown in the page content
  // below — consistent NAP across the page and the schema is what
  // local search results actually check.
  ngOnInit(): void {
    this.seo.apply({
      title: 'Contact Us',
      description: 'Get in touch with Indomisa Consulting to discuss a custom website, business system, MVP, or automation project.',
      path: '/contact'
    });

    this.seo.setJsonLd('ld-contact', {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Indomisa Consulting',
      url: 'https://indomisa.it.com/contact',
      telephone: '+27615249848',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Johannesburg',
        addressCountry: 'ZA'
      },
      openingHoursSpecification: [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '08:00', closes: '17:00' }
      ]
    });
  }

  protected selectProjectType(value: string): void {
    this.contactForm.controls.projectType.setValue(value);
    this.nextStep();
  }

  protected selectProjectScale(value: string): void {
    this.contactForm.controls.projectScale.setValue(value);
    this.nextStep();
  }

  protected nextStep(): void {
    if (this.currentStep() < 4) {
      this.currentStep.update((step) => step + 1);
    }
  }

  protected previousStep(): void {
    if (this.currentStep() > 1) {
      this.currentStep.update((step) => step - 1);
    }
  }


  submit(): void {

    if (this.contactForm.invalid) {
        console.log('Form is invalid:', this.contactForm.errors);
      this.contactForm.markAllAsTouched();

      return;
    }

    // this.loading.set(true);


    const payload: ContactMailRequest = {
      projectType: this.contactForm.get('projectType')?.value,
      projectScale: this.contactForm.get('projectScale')?.value,
      businessName: this.contactForm.get('businessName')?.value,
      whatsappNumber: this.contactForm.get('whatsappNumber')?.value,
    };

    this.mailService.sendContactMail(payload).subscribe({
      next: (response) => {
        this.analytics.track('contact_form_submit', {
          service: payload.projectType || undefined
        });
        // this.loading.set(false);
        // this.submitted.set(true);
        this.contactForm.reset();
      },
      error: (error) => {
        // this.loading.set(false);
        alert('There was an error submitting the form. Please try again later.');
        console.error('Error submitting form:', error);
      }
    });

  }

}