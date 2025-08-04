import { Component, signal, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TenantService } from '../../../services/tenant.service';
import { ToastService } from '../../../shared/toast/toast.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-tenant-create',
  standalone: true,
  templateUrl: './tenant-create.component.html',
  styleUrls: ['./tenant-create.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class TenantCreateComponent {
  private fb = inject(FormBuilder);
  private tenantService = inject(TenantService);
  private toastService = inject(ToastService);

  tenantForm: FormGroup;
  error = signal<string | null>(null);
  success = signal(false);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    this.tenantForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  createTenant() {
    if (this.tenantForm.invalid) return;
    this.error.set(null);
    this.success.set(false);
    this.tenantService.createTenant(this.tenantForm.value).subscribe({
      next: () => {
        this.success.set(true);
        this.tenantForm.reset();
        this.toastService.show('Tenant created!', 'success');
      },
      error: () => {
        this.error.set('Failed to create tenant.');
        this.toastService.show('Failed to create tenant.', 'error');
      }
    });
  }
}
