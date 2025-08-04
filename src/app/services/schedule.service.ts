import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ScheduleDto } from '../models/schedule.model';

@Injectable({ providedIn: 'root' })
export class ScheduleService {
  private http = inject(HttpClient);
  private apiUrl = '/api/schedules';

  createSchedule(payload: { taskId: string; scheduledAt: string; note: string }): Observable<ScheduleDto> {
    return this.http.post<ScheduleDto>(this.apiUrl, payload);
  }

  getSchedules(): Observable<ScheduleDto[]> {
    return this.http.get<ScheduleDto[]>(this.apiUrl);
  }

  getSchedule(id: string): Observable<ScheduleDto> {
    return this.http.get<ScheduleDto>(`${this.apiUrl}/${id}`);
  }

  deleteSchedule(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
