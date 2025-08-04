import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TenantDto } from '../models/tenant.model';

@Injectable({ providedIn: 'root' })
export class TenantService {
  private http = inject(HttpClient);
  private apiUrl = '/api/tenants';

  createTenant(payload: { name: string }): Observable<TenantDto> {
    return this.http.post<TenantDto>(this.apiUrl, payload);
  }

  getTenants(): Observable<TenantDto[]> {
    return this.http.get<TenantDto[]>(this.apiUrl);
  }

  getTenant(id: string): Observable<TenantDto> {
    return this.http.get<TenantDto>(`${this.apiUrl}/${id}`);
  }

  deleteTenant(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
