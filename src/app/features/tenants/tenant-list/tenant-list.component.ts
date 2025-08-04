import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { TenantService } from '../../../services/tenant.service';
import { TenantDto } from '../../../models/tenant.model';
import { FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchBarComponent } from '../../../shared/search-bar/search-bar.component';
import { ConfirmClickDirective } from '../../../shared/confirm-click.directive';
import { ToastService } from '../../../shared/toast/toast.service';

@Component({
  selector: 'app-tenant-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SearchBarComponent, ConfirmClickDirective],
  templateUrl: './tenant-list.component.html',
  styleUrls: ['./tenant-list.component.scss']
})
export class TenantListComponent implements OnInit {
  private tenantService = inject(TenantService);
  private toastService = inject(ToastService);

  tenants = signal<TenantDto[]>([]);
  error = signal<string | null>(null);
  search = new FormControl('');

  filteredTenants = computed(() => {
    const term = this.search.value?.toLowerCase() || '';
    return this.tenants().filter(t =>
      t.name.toLowerCase().includes(term) ||
      t.id.toLowerCase().includes(term)
    );
  });

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  ngOnInit() {
    this.fetchTenants();
  }

  fetchTenants() {
    this.error.set(null);
    this.tenantService.getTenants().subscribe({
      next: (tenants) => {
        this.tenants.set(tenants);
      },
      error: () => {
        this.error.set('Failed to load tenants.');
      }
    });
  }

  deleteTenant(id: string) {
    this.tenantService.deleteTenant(id).subscribe({
      next: () => {
        this.tenants.set(this.tenants().filter(t => t.id !== id));
        this.toastService.show('Tenant deleted!', 'success');
      },
      error: () => {
        this.error.set('Failed to delete tenant.');
        this.toastService.show('Failed to delete tenant.', 'error');
      }
    });
  }
}
