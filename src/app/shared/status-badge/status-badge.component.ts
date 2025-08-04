import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  templateUrl: './status-badge.component.html',
  styleUrls: ['./status-badge.component.scss']
})
export class StatusBadgeComponent {
  @Input() status = '';

  get badgeClass(): string {
    switch (this.status.toLowerCase()) {
      case 'to do':
        return 'badge-todo';
      case 'in progress':
        return 'badge-inprogress';
      case 'done':
        return 'badge-done';
      default:
        return 'badge-default';
    }
  }
}
