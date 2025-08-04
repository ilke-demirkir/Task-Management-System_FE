import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  imports: [CommonModule]
})
export class ToastComponent implements OnInit {
  @Input() message = '';
  @Input() type: 'success' | 'error' | 'info' | 'warning' = 'info';
  @Input() durationMs = 3000;
  @Output() closed = new EventEmitter<void>();

  timeoutId: any;

  ngOnInit() {
    this.timeoutId = setTimeout(() => this.close(), this.durationMs);
  }

  close() {
    clearTimeout(this.timeoutId);
    this.closed.emit();
  }

  get icon() {
    switch (this.type) {
      case 'success': return '✔️';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      default: return 'ℹ️';
    }
  }
} 