// tenant-selected.guard.ts
import { inject, Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from "@angular/router";
import { TenantContextService } from "../services/tenant-context.service";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: "root",
})
export class TenantSelectedGuard implements CanActivate {
    constructor(
        private tenantContextService: TenantContextService,
        private authService: AuthService,
        private router: Router,
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): boolean | UrlTree {
        const tenantId = this.tenantContextService.getTenantId().getValue();
        if (this.authService.isAdmin()) return true;
        if (!tenantId) {
            sessionStorage.setItem(
                "pendingToast",
                JSON.stringify({
                    message: "Please select a tenant to continue.",
                    type: "error",
                }),
            );
            return this.router.createUrlTree(["/tenants"], {
                queryParams: { returnUrl: state.url },
            });
        }

        return true;
    }
}
