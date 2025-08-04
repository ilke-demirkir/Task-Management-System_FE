import { Directive, Input, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appHasRole]',
  standalone: true
})
export class HasRoleDirective {
  private tpl = inject<TemplateRef<any>>(TemplateRef);
  private vcr = inject(ViewContainerRef);

  private auth = inject(AuthService);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  @Input() set appHasRole(roles: string | string[]) {
    const userRoles = this.auth.getRoles();
    const requiredRoles = Array.isArray(roles) ? roles : [roles];
    const hasRole = requiredRoles.some(role => userRoles.includes(role));
    this.vcr.clear();
    if (hasRole) {
      this.vcr.createEmbeddedView(this.tpl);
    }
  }
} 