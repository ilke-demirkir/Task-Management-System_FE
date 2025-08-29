import { Component, computed, inject, signal } from "@angular/core";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  of,
  switchMap,
  tap,
} from "rxjs";
import { UserService } from "../../../services/user.service";
import { TenantService } from "../../../services/tenant.service";
import { ToastService } from "../../../shared/toast/toast.service";
import { DIALOG_DATA, DialogRef } from "@angular/cdk/dialog";
import { CommonModule } from "@angular/common";
import { ApplicationUserDto } from "../../../models/user.model";
import { AddUserToTenantDto } from "../../../models/tenant.model";
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { MatInput, MatInputModule } from "@angular/material/input";
import { MatOption } from "@angular/material/select";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatOptionModule } from "@angular/material/core";

@Component({
  selector: "app-add-user-to-tenant-dialog",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatOptionModule,
  ],
  templateUrl: "./add-users.component.html",
  styleUrls: ["./add-users.component.scss"],
})
export class AddUsersComponent {
  private userService = inject(UserService);
  private tenantService = inject(TenantService);
  private toast = inject(ToastService);
  private ref = inject(DialogRef<string>);
  tenantId: string = inject(DIALOG_DATA);
  public role: string = "";
  selectedUserId: string | null = null;

  query = new FormControl<string>("", { nonNullable: true });
  loading = signal(false);
  results = signal<ApplicationUserDto[]>([]);

  constructor() {
    this.query.valueChanges.pipe(
      debounceTime(250),
      distinctUntilChanged(),
      tap(() => {
        this.loading.set(true);
        this.results.set([]);
      }),
      filter((q) => q.length >= 2),
      switchMap((q) =>
        this.userService.search(q).pipe(
          catchError(() => of([])),
        )
      ),
      tap(() => this.loading.set(false)),
    ).subscribe((users) => this.results.set(users));
  }

  add(userId: string) {
    this.loading.set(true);
    const data: AddUserToTenantDto = {
      userId,
      tenantId: this.tenantId,
      role: this.role, // Default role, can be changed as needed
    };
    this.tenantService.addUserToTenant(data).subscribe({
      next: () => {
        this.toast.show("User added to tenant", "success");
        this.ref.close(userId);
      },
      error: () => {
        this.loading.set(false);
        this.toast.show("Failed to add user", "error");
      },
    });
  }

  close() {
    this.ref.close();
  }

  onSelectedByEmail(email: string) {
    const match = this.results().find((u) =>
      u.email.toLowerCase() === email.toLowerCase()
    );
    this.selectedUserId = match?.id ?? null;
  }

  addSelected() {
    if (!this.selectedUserId) return;
    this.add(this.selectedUserId);
  }
}
