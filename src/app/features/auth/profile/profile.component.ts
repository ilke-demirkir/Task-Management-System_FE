import { Component, OnInit, signal, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { ApplicationUserDto } from '../../../models/user.model';
import { ToastService } from '../../../shared/toast/toast.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class ProfileComponent implements OnInit {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  profileForm: FormGroup;
  error = signal<string | null>(null);
  success = signal(false);
  user: ApplicationUserDto | null = null;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    this.profileForm = this.fb.group({
      avatarUrl: [''],
      fullName: ['', Validators.required],
      email: [{ value: '', disabled: true }],
      jobTitle: [''],
      isActive: [false]
    });
  }

  ngOnInit() {
    this.fetchProfile();
  }

  fetchProfile() {
    this.error.set(null);
    this.success.set(false);
    const userId = this.getCurrentUserId();
    if (!userId) {
      this.error.set('User not authenticated.');
      return;
    }
    this.userService.getUser(userId).subscribe({
      next: (user) => {
        this.user = user;
        this.profileForm.patchValue(user);
      },
      error: (err) => {
        this.error.set('Failed to load profile.');
      }
    });
  }

  save() {
    if (!this.user) return;
    if (this.profileForm.invalid) return;
    this.error.set(null);
    this.success.set(false);
    const updated = {
      ...this.user,
      ...this.profileForm.getRawValue()
    };
    this.userService.updateUser(this.user.id, updated).subscribe({
      next: (user) => {
        this.user = user;
        this.success.set(true);
        this.toastService.show('Profile updated!', 'success');
      },
      error: () => {
        this.error.set('Failed to update profile.');
      }
    });
  }

  getCurrentUserId(): string | null {
    // Implement logic to get current user ID (e.g., from auth service or token)
    return null;
  }
}
