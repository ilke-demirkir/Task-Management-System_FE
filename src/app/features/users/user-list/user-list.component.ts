import { Component, computed, inject, OnInit, signal } from "@angular/core";
import { UserService } from "../../../services/user.service";
import { ApplicationUserDto } from "../../../models/user.model";
import { FormControl } from "@angular/forms";
import { UserAvatarComponent } from "../../../shared/user-avatar/user-avatar.component";
import { SearchBarComponent } from "../../../shared/search-bar/search-bar.component";
import { ConfirmClickDirective } from "../../../shared/confirm-click.directive";
import { ToastService } from "../../../shared/toast/toast.service";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-user-list",
  standalone: true,
  imports: [
    UserAvatarComponent,
    SearchBarComponent,
    ConfirmClickDirective,
    CommonModule,
    RouterLink,
  ],
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
})
export class UserListComponent implements OnInit {
  private userService = inject(UserService);
  private toastService = inject(ToastService);

  users = signal<ApplicationUserDto[]>([]);
  error = signal<string | null>(null);
  search = new FormControl("");

  filteredUsers = computed(() => {
    const term = this.search.value?.toLowerCase() || "";
    return this.users().filter((u) =>
      u.fullName.toLowerCase().includes(term) ||
      u.email.toLowerCase().includes(term)
    );
  });

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.error.set(null);
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users.set(users);
      },
      error: () => {
        this.error.set("Failed to load users.");
      },
    });
  }

  onSearch(term: string) {
    this.search.setValue(term);
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.users.set(this.users().filter((u) => u.id !== id));
        this.toastService.show("User deleted!", "success");
      },
      error: () => {
        this.error.set("Failed to delete user.");
        this.toastService.show("Failed to delete user.", "error");
      },
    });
  }
}
