import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-user-avatar",
  standalone: true,
  templateUrl: "./user-avatar.component.html",
  styleUrls: ["./user-avatar.component.scss"],
  imports: [CommonModule],
})
export class UserAvatarComponent {
  @Input()
  avatarUrl: string | null = null;
  @Input()
  fullName: string | null = null;

  get initials(): string {
    if (!this.fullName) return "";
    const names = this.fullName.split(" ");
    return names.length === 1
      ? names[0][0].toUpperCase()
      : (names[0][0] + names[names.length - 1][0]).toUpperCase();
  }
}
