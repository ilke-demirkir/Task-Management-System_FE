import {
  Component,
  computed,
  inject,
  OnInit,
  signal,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { TenantService } from "../../../services/tenant.service";
import { TenantDto } from "../../../models/tenant.model";
import { FormControl } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SearchBarComponent } from "../../../shared/search-bar/search-bar.component";
import { ConfirmClickDirective } from "../../../shared/confirm-click.directive";
import { ToastService } from "../../../shared/toast/toast.service";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { NavigationEnd, RouterLink } from "@angular/router";
import { TenantContextService } from "../../../services/tenant-context.service";
import { AuthService } from "../../../services/auth.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-tenant-list",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SearchBarComponent,
    ConfirmClickDirective,
    MatDialogModule,
    RouterLink,
  ],
  templateUrl: "./tenant-list.component.html",
  styleUrls: ["./tenant-list.component.scss"],
})
export class TenantListComponent implements OnInit {
  private tenantService = inject(TenantService);
  private toastService = inject(ToastService);
  private tenantContextService = inject(TenantContextService);
  public authService = inject(AuthService);
  private routerSub?: Subscription;
  private router = inject(Router);
  private returnUrl: string = "/dashboard";

  tenants = signal<TenantDto[]>([]);
  error = signal<string | null>(null);
  search = new FormControl("");

  filteredTenants = computed(() => {
    const term = this.search.value?.toLowerCase() || "";
    return this.tenants().filter((t) =>
      t.name.toLowerCase().includes(term) ||
      t.id.toLowerCase().includes(term)
    );
  });
  @ViewChild("confirmDeleteDialog")
  confirmDeleteDialog!: TemplateRef<any>;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor(private dialog: MatDialog) {}

  confirmDelete(tenantId: string) {
    const dialogRef = this.dialog.open(this.confirmDeleteDialog, {});

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteTenant(tenantId);
      }
    });
  }

  ngOnInit() {
    this.checkPendingToast();
    this.routerSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkPendingToast();
      }
    });
    this.returnUrl =
      this.router.routerState.snapshot.root.queryParams["returnUrl"] ||
      "/dashboard";
    this.fetchTenants();
  }

  private checkPendingToast() {
    const pending = sessionStorage.getItem("pendingToast");
    if (pending!) console.log("Pending toast not found.");
    if (pending) {
      const { message, type } = JSON.parse(pending);
      this.toastService.show(message, type);
      sessionStorage.removeItem("pendingToast");
    }
  }
  ngOnDestroy() {
    this.routerSub?.unsubscribe();
  }

  fetchTenants() {
    this.error.set(null);
    if (this.authService.isAdmin()) {
      this.tenantService.getTenants().subscribe({
        next: (tenants) => {
          this.tenants.set(tenants);
        },
        error: () => {
          this.error.set("Failed to load tenants.");
        },
      });
      return;
    }
    this.tenantService.getMyTenants().subscribe({
      next: (tenants) => {
        this.tenants.set(tenants);
      },
      error: () => {
        this.error.set("Failed to load tenants.");
      },
    });
  }

  deleteTenant(id: string) {
    this.tenantService.deleteTenant(id).subscribe({
      next: () => {
        this.tenants.set(this.tenants().filter((t) => t.id !== id));
        this.toastService.show("Tenant deleted!", "success");
      },
      error: () => {
        this.error.set("Failed to delete tenant.");
        this.toastService.show("Failed to delete tenant.", "error");
      },
    });
  }

  isSelected(tenantId: string): boolean {
    /*
    console.log(
      "Result of isSelected:",
      this.tenantContextService.getTenantId().getValue() === tenantId,
    );
    */
    return this.tenantContextService.getTenantId().getValue() === tenantId;
  }

  selectTenant(tenantId: string, tenantName?: string) {
    this.tenantContextService.setTenantId(tenantId);
    this.authService.getRoleClaims();
    this.toastService.show(`Tenant selected! ${tenantId}`, "success");
  }
}

/* TO-DO
Implement a way to hanlde when a user does not have any teants.


*/
