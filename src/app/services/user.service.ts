import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationUserDto } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = '/api/applicationusers';

  getUsers(): Observable<ApplicationUserDto[]> {
    return this.http.get<ApplicationUserDto[]>(this.apiUrl);
  }

  getUser(id: string): Observable<ApplicationUserDto> {
    return this.http.get<ApplicationUserDto>(`${this.apiUrl}/${id}`);
  }

  updateUser(id: string, user: Partial<ApplicationUserDto>): Observable<ApplicationUserDto> {
    return this.http.put<ApplicationUserDto>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  registerOneSignalId(oneSignalId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/onesignal-id`, { oneSignalId });
  }
}
