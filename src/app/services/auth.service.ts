import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of, tap } from "rxjs";
import { ApplicationUserDto } from "../models/user.model";
import { UserService } from "./user.service";
import { TenantContextService } from "./tenant-context.service";
import { TenantUserDto } from "../models/tenant-user.model";

interface JwtPayload {
  sub: string;
  email: string;
  role?: string;
  Roles?: string[];
  [key: string]: unknown;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = "https://localhost:5097/api/auth";
  private tokenKey = "jwt_token";
  private tenantUserRoles: TenantUserDto[] | null = [];

  constructor(
    private userService: UserService,
    private ctx: TenantContextService,
  ) {}

  register(payload: {
    // tenantId: string;
    fullName: string;
    email: string;
    avatarUrl: string;
    jobTitle: string;
    isActive: boolean;
    password: string;
    role: string;
  }): Observable<{ userId: string }> {
    return this.http.post<{ userId: string }>(
      `${this.apiUrl}/register`,
      payload,
    );
  }

  login(
    payload: { email: string; password: string },
  ): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, payload)
      .pipe(
        tap((res) => {
          //console.log("🔥 login response:", res);
          this.setToken(res.token);
        }),
      );
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.ctx.setTenantId(null);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getRoles(): string[] {
    const token = this.getToken();
    const tenantId = this.ctx.getTenantId().getValue();
    const userId = this.getCurrentUser()!.id;

    //console.log("Fetched tenant user roles:", this.tenantUserRoles);
    for (let tenant of this.tenantUserRoles || []) {
      if (tenant.tenantId == tenantId) {
        //console.log("Tenant user roles found:", tenant.role);
        return [tenant.role];
      }
    }
    //console.log("Tenant user roles after fetch:", this.tenantUserRoles);

    if (this.tenantUserRoles?.length == 0) {
      //console.log("No roles found for user:", userId, "in tenant:", tenantId);
    }
    if (!token) return [];

    try {
      const payload: JwtPayload = JSON.parse(atob(token.split(".")[1]));
      //console.log("Current payload of roles", payload.Roles);
      return payload.Roles ? payload.Roles : [];
    } catch {
      return [];
    }
  }

  getRoleClaims(): void {
    const userId = this.getCurrentUser()!.id;
    this.ctx.getTenantUserRoles(userId).subscribe({
      next: (roles) => {
        //console.log("Fetched tenant user roles:", roles);
        this.tenantUserRoles = roles || [];
      },
      error: (err) => {
        //console.error("Failed to fetch tenant user roles:", err);
        this.tenantUserRoles = [];
      },
    });
  }

  hasRole(role: string): boolean {
    return this.getRoles().includes(role);
  }

  getCurrentUser(): ApplicationUserDto | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return {
        id: payload.sub,
        email: payload.email,
        fullName: payload.fullName,
        tenantId: payload.tenantId,
        Roles: payload.Roles,
      };
    } catch {
      return null;
    }
  }
  isAdmin(): boolean {
    return this.hasRole("Admin");
  }
  isManager(): boolean {
    return this.hasRole("Manager");
  }
  hasTenant(): boolean {
    const token = this.getToken();
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return !!payload.tenantId;
    } catch (error) {
      //console.error("Error checking tenant in token:", error);
      return false;
    }
  }
}
