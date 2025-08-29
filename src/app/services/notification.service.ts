import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { NotificationDto } from "../models/notification.model";

@Injectable({ providedIn: "root" })
export class NotificationService {
  private http = inject(HttpClient);
  private apiUrl = "https://localhost:5097/api/notifications";

  createNotification(
    payload: { userId: string; message: string; isRead: boolean },
  ): Observable<NotificationDto> {
    return this.http.post<NotificationDto>(this.apiUrl, payload);
  }

  getNotifications(): Observable<NotificationDto[]> {
    return this.http.get<NotificationDto[]>(this.apiUrl);
  }

  getNotification(id: string): Observable<NotificationDto> {
    return this.http.get<NotificationDto>(`${this.apiUrl}/${id}`);
  }
}
