import { Component, signal } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { Router } from "@angular/router";
import { ToastService } from "../../../shared/toast/toast.service";
import { AuthService } from "../../../services/auth.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.scss",
})
export class RegisterComponent {
  loading = signal(false);
  error = signal("");
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toast: ToastService,
    private auth: AuthService,
  ) {
    this.form = this.fb.group({
      fullName: ["", [Validators.required, Validators.minLength(2)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", [Validators.required]],
    }, { validators: this.passwordsMatch });
  }

  passwordsMatch(group: FormGroup) {
    const pass = group.get("password")?.value;
    const confirm = group.get("confirmPassword")?.value;
    return pass === confirm ? null : { notMatching: true };
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading.set(true);
    this.error.set("");
    const payload = {
      fullName: this.form.value.fullName,
      email: this.form.value.email,
      avatarUrl: "",
      jobTitle: "",
      isActive: true,
      password: this.form.value.password,
    };
    this.auth.register(payload).subscribe({
      next: () => {
        this.loading.set(false);
        this.toast.show("Registration successful! Please login.", "success");
        this.router.navigate(["/login"]);
      },
      error: (err) => {
        this.loading.set(false);
        this.toast.show("Registration failed.", "error");
      },
    });
  }

  goToLogin() {
    this.router.navigate(["/login"]);
  }
}
