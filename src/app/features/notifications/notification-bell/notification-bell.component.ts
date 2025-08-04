import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { NotificationService } from '../../../services/notification.service';
import { AuthService } from '../../../services/auth.service';
import { NotificationDto } from '../../../models/notification.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification-bell',
  standalone: true,
  templateUrl: './notification-bell.component.html',
  styleUrls: ['./notification-bell.component.scss'],
  imports: [CommonModule]
})
export class NotificationBellComponent implements OnInit {
  private notificationService = inject(NotificationService);
  private authService = inject(AuthService);

  notifications = signal<NotificationDto[]>([]);
  loading = signal(false);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  getCurrentUserId(): string | null {
    const token = this.authService.getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub || payload.userId || null;
    } catch {
      return null;
    }
  }

  unreadCount = computed(() => {
    const userId = this.getCurrentUserId();
    return userId
      ? this.notifications().filter(n => n.userId === userId && !n.isRead).length
      : 0;
  });

  ngOnInit() {
    this.fetchNotifications();
  }

  fetchNotifications() {
    this.loading.set(true);
    this.notificationService.getNotifications().subscribe({
      next: (notifications) => {
        this.notifications.set(notifications);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }
}
