import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent {
  @Input() value: string | null = null;
  @Input() label = 'Date';
  @Input() type: 'date' | 'datetime-local' = 'date';
  @Input() min?: string;
  @Input() max?: string;
  @Output() valueChange = new EventEmitter<string>();

  onChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.valueChange.emit(input.value);
  }
}
