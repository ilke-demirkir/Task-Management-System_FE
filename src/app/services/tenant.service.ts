import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {
  AddUserToTenantDto,
  TenantDto,
  TenantMembers,
} from "../models/tenant.model";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: "root" })
export class TenantService {
  private http = inject(HttpClient);
  private apiUrl = "https://localhost:5097/api/tenants";
  constructor(private authService: AuthService) {}

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

  getMyTenants(): Observable<TenantDto[]> {
    const userId = this.authService.getCurrentUser()?.id || "";
    return this.http.get<TenantDto[]>(`${this.apiUrl}/my-tenants/${userId}`);
  }

  getMembers(tenantId: string): Observable<TenantMembers[]> {
    return this.http.get<TenantMembers[]>(`${this.apiUrl}/members/${tenantId}`);
  }

  removeMember(
    payload: { tenantId: string; userId: string },
  ): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/members/${payload.tenantId}/${payload.userId}`,
      { body: { payload } },
    );
  }

  addUserToTenant(
    data: AddUserToTenantDto,
  ): Observable<AddUserToTenantDto> {
    return this.http.post<AddUserToTenantDto>(
      `${this.apiUrl}/${data.tenantId}`,
      data,
    );
  }
}
