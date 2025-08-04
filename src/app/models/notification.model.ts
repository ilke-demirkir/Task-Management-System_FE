export interface NotificationAction {
  action: string;
  title: string;
  icon?: string;
}

export interface NotificationDto {
  id: string;
  userId: string;
  message: string;
  createdAt: string; // ISO datetime
  isRead: boolean;

  // Push notification fields (all optional)
  title?: string;
  icon?: string;
  url?: string;
  data?: any;
  actions?: NotificationAction[];
} 