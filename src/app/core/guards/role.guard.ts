import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const RoleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const requiredRoles = route.data['roles'] as string[] | undefined;

  if (!auth.isAuthenticated()) {
    sessionStorage.setItem('pendingToast', JSON.stringify({ message: 'Please login to continue.', type: 'error' }));
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  if (!requiredRoles || requiredRoles.length === 0) {
    return true;
  }

  const userRoles = auth.getRoles();
  const hasRole = requiredRoles.some(role => userRoles.includes(role));
  if (!hasRole) {
    sessionStorage.setItem('pendingToast', JSON.stringify({ message: 'You are not authorized to do this action.', type: 'error' }));
    router.navigate(['/forbidden']);
    return false;
  }

  return true;
}; 