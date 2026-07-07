import { Injectable, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

export interface PageSeo {
  /** Plain page title — the service appends " | Indomisa Consulting". */
  title: string;
  description: string;
  /** Path only, e.g. '/services/web-development'. */
  path: string;
  /** Defaults to the shared logo if not provided. */
  image?: string;
}

const SITE_URL = 'https://indomisa.it.com';
const DEFAULT_IMAGE = `${SITE_URL}/assets/logo_dark.png`;

/**
 * SEO: centralises everything each route needs for search and social —
 * <title>, meta description, canonical link, Open Graph / Twitter tags,
 * and JSON-LD structured data. Call `apply()` once per page component's
 * ngOnInit and `setJsonLd()` alongside it for any structured data.
 *
 * Centralising this avoids the previous pattern where only the home page
 * set a title/description and every other route silently inherited
 * whatever the last-visited page had left behind.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  constructor(
    private titleService: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private document: Document
  ) {}

  apply(page: PageSeo): void {
    const fullTitle = `${page.title} | Indomisa Consulting`;
    const url = `${SITE_URL}${page.path}`;
    const image = page.image ?? DEFAULT_IMAGE;

    this.titleService.setTitle(fullTitle);

    this.meta.updateTag({ name: 'description', content: page.description });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: page.description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:type', content: 'website' });

    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: page.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    this.setCanonical(url);
  }

  /** Injects or replaces a JSON-LD <script> block, keyed by id so repeat
   *  navigations to the same route don't stack duplicate tags. */
  setJsonLd(id: string, schema: object): void {
    const existing = this.document.getElementById(id);
    if (existing) existing.remove();

    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    script.text = JSON.stringify(schema);
    this.document.head.appendChild(script);
  }

  private setCanonical(url: string): void {
    let link = this.document.querySelector<HTMLLinkElement>("link[rel='canonical']");
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
