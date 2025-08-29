import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthService } from "../../services/auth.service";

export const RoleGuard: CanActivateFn = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const requiredRoles = route.data["roles"] as string[] | undefined;

  if (!auth.isAuthenticated()) {
    sessionStorage.setItem(
      "pendingToast",
      JSON.stringify({ message: "Please login to continue.", type: "error" }),
    );
    router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
    return router.createUrlTree(["/login"], {
      queryParams: { returnUrl: state.url },
    });
  }

  if (!requiredRoles || requiredRoles.length === 0) {
    return true;
  }

  console.log("Returned roles:", auth.getRoles());
  var userRoles: string[] = auth.getRoles();
  console.log("🔥 User Roles:", userRoles);
  const hasRole = requiredRoles.some((role) => userRoles.includes(role));
  if (!hasRole) {
    sessionStorage.setItem(
      "pendingToast",
      JSON.stringify({
        message: "You are not authorized to do this action.",
        type: "error",
      }),
    );
    return router.createUrlTree(["/forbidden"]);
  }

  return true;
};
