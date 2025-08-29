import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TenantUserDto } from "../models/tenant-user.model";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root",
})
export class TenantContextService {
  private apiUrl = "https://localhost:5097/api/tenants";
  private http = inject(HttpClient);
  private tenantId$ = new BehaviorSubject<string | null>(null);
  private auth = inject(UserService);

  setTenantId(tenantId: string | null): void {
    this.tenantId$.next(tenantId);
  }
  getTenantUserRoles(userId: string): Observable<TenantUserDto[] | null> {
    console.log(
      "Fetching tenant user roles for user:",
      userId,
    );
    return this.http.get<TenantUserDto[]>(`${this.apiUrl}/tenant-user-roles`, {
      params: {
        userId: userId,
      },
    });
  }

  getTenantId(): BehaviorSubject<string | null> {
    return this.tenantId$;
  }
}
