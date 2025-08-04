import { Directive, EventEmitter, HostListener, Input, Output, inject } from '@angular/core';
import { DialogService } from './dialog.service';

@Directive({
  selector: '[appConfirmClick]',
  standalone: true
})
export class ConfirmClickDirective {
  private dialog = inject(DialogService);

  @Input('appConfirmClick') confirmOptions: { title?: string; message?: string } = {};
  @Output() confirmed = new EventEmitter<void>();

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  @HostListener('click', ['$event'])
  async onClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    const confirmed = await this.dialog.openConfirmation(this.confirmOptions);
    if (confirmed) {
      this.confirmed.emit();
    }
  }
} 