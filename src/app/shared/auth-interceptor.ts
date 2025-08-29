// auth.interceptor.ts
import { inject, Injectable } from "@angular/core";
import {
    HttpErrorResponse,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({ providedIn: "root" })
export class AuthInterceptor implements HttpInterceptor {
    private router = inject(Router);
    private auth = inject(AuthService);

    intercept(req: HttpRequest<unknown>, next: HttpHandler) {
        return next.handle(req).pipe(
            catchError((err) => {
                if (err instanceof HttpErrorResponse && err.status === 401) {
                    // redirect to login on 401
                    this.auth.logout(); // clear token/session
                    this.router.navigate(["/login"]);
                }
                return throwError(() => err);
            }),
        );
    }
}
