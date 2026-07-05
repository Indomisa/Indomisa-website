import { Component, EventEmitter, Input, Output } from '@angular/core';

export type FaqItem = {
  question: string;
  answer: string;
};

@Component({
  selector: 'app-faq',
  standalone: true,
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
})
export class FaqComponent {
  @Input({ required: true }) items: FaqItem[] = [];

  @Input() label = 'FAQ';
  @Input() title = 'Frequently asked questions';
  @Input() allowMultipleOpen = false;

  protected openIndexes = new Set<number>();

  protected toggleFaq(index: number, item: FaqItem): void {
    if (this.openIndexes.has(index)) {
      this.openIndexes.delete(index);
      return;
    }

    if (!this.allowMultipleOpen) {
      this.openIndexes.clear();
    }

    this.openIndexes.add(index);
  }

  protected isOpen(index: number): boolean {
    return this.openIndexes.has(index);
  }
}