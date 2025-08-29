import { Component, computed, inject, OnInit, signal } from "@angular/core";
import { NotificationService } from "../../../services/notification.service";
import { NotificationDto } from "../../../models/notification.model";
import { AuthService } from "../../../services/auth.service";
import { StatusBadgeComponent } from "../../../shared/status-badge/status-badge.component";
import { CommonModule } from "@angular/common";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-notification-list",
  standalone: true,
  templateUrl: "./notification-list.component.html",
  styleUrls: ["./notification-list.component.scss"],
  imports: [StatusBadgeComponent, CommonModule, DatePipe],
})
export class NotificationListComponent implements OnInit {
  private notificationService = inject(NotificationService);
  private authService = inject(AuthService);

  notifications = signal<NotificationDto[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  getCurrentUserId(): string | null {
    const token = this.authService.getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.sub || payload.userId || null;
    } catch {
      return null;
    }
  }

  userNotifications = computed(() => {
    const userId = this.getCurrentUserId();
    return userId
      ? this.notifications().filter((n) => n.userId === userId)
      : [];
  });

  ngOnInit() {
    console.log("NotificationListComponent initializing…");

    this.fetchNotifications();
  }

  fetchNotifications() {
    this.loading.set(true);
    this.error.set(null);
    this.notificationService.getNotifications().subscribe({
      next: (notifications) => {
        this.notifications.set(notifications);
        this.loading.set(false);
      },
      error: () => {
        this.error.set("Failed to load notifications.");
        this.loading.set(false);
      },
    });
  }
}
