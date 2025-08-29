import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TenantContextService } from "../services/tenant-context.service";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class TenantHeaderInterceptor implements HttpInterceptor {
    constructor(
        private ctx: TenantContextService,
        private authService: AuthService,
    ) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        try {
            if (
                req.url.includes("/auth/login") ||
                req.url.includes("/auth/register") ||
                req.url.includes("/auth/logout")
            ) {
                return next.handle(req);
            }
            const tenantId = this.ctx.getTenantId().getValue();

            console.log("Tenant ID in interceptor:", tenantId);
            req = req.clone({
                setHeaders: {
                    "X-Is-Admin": String(this.authService.isAdmin()),
                    "X-Tenant-ID": tenantId ?? "null",
                },
            });

            return next.handle(req);
        } catch (error) {
            console.error("Error in TenantHeaderInterceptor:", error);
            return next.handle(req);
        }
    }
}
