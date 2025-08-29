import { Component, inject, OnInit, signal } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../../services/user.service";
import { ApplicationUserDto } from "../../../models/user.model";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../../services/auth.service";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-user-profile",
  standalone: true,
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
  imports: [CommonModule, RouterLink],
})
export class UserProfileComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  private authService = inject(AuthService);
  public id: string | null = "";

  user = signal<ApplicationUserDto | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get("id");
      if (this.id) {
        this.fetchUser(this.id);
      } else {
        this.fetchUser(this.authService.getCurrentUser()!.id);
      }
      9;
    });
  }

  fetchUser(id: string) {
    this.loading.set(true);
    this.error.set(null);
    this.userService.getUser(id).subscribe({
      next: (user) => {
        this.user.set(user);
        this.loading.set(false);
      },
      error: () => {
        this.error.set("Failed to load user profile.");
        this.loading.set(false);
      },
    });
  }
}
