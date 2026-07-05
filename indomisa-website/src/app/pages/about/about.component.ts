import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Stat } from '../../shared/model/stat';
import { STATS_CONFIG } from './config/stats.config';
import { GenericType } from '../../shared/model/generic-type';
import { WHY_US_CONFIG } from './config/why-us.config';
import { FEATURED_WORK_CONFIG } from './config/featured-work.config';
import { QuestionAnswer } from '../../shared/model/qa-model';
import { FAQ_CONFIG } from './config/faq.config';
import { FeaturedWorkModel } from './model/featured-work.model';
import { FaqComponent, FaqItem } from "../../shared/components/faq/faq.component";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, FaqComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  protected activeFaq: number | null = 0;

  protected readonly stats: Stat[] = STATS_CONFIG;

  protected readonly whyUs: GenericType[] = WHY_US_CONFIG;

  protected readonly featuredWork: FeaturedWorkModel[] = FEATURED_WORK_CONFIG;

  protected readonly faqs: QuestionAnswer[] = FAQ_CONFIG;

  protected toggleFaq(index: number): void {
    this.activeFaq = this.activeFaq === index ? null : index;
  }
}