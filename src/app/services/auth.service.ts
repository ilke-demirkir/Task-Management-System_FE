import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";

interface JwtPayload {
  sub: string;
  email: string;
  role?: string;
  roles?: string[];
  [key: string]: unknown;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = "https://localhost:5097/api/auth";
  private tokenKey = "jwt_token";

  register(payload: {
    // tenantId: string;
    fullName: string;
    email: string;
    avatarUrl: string;
    jobTitle: string;
    isActive: boolean;
    password: string;
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
        tap((res) => this.setToken(res.token)),
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
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getRoles(): string[] {
    const token = this.getToken();
    if (!token) return [];

    try {
      const payload: JwtPayload = JSON.parse(atob(token.split(".")[1]));
      return payload.roles || payload.role ? [payload.role as string] : [];
    } catch {
      return [];
    }
  }

  hasRole(role: string): boolean {
    return this.getRoles().includes(role);
  }
}
