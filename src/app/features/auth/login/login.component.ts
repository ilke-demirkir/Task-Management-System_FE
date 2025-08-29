import { Component, OnDestroy, OnInit, signal } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { ToastService } from "../../../shared/toast/toast.service";
import { Subscription } from "rxjs";
import { AuthService } from "../../../services/auth.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent implements OnInit, OnDestroy {
  loading = signal(false);
  error = signal("");
  form: FormGroup;
  private routerSub?: Subscription;
  private returnUrl: string = "/dashboard";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastService,
    private auth: AuthService,
  ) {
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    this.checkPendingToast();
    this.routerSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkPendingToast();
      }
    });
    this.returnUrl = this.route.snapshot.queryParamMap.get("returnUrl") ||
      "/dashboard";
  }

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
  }

  private checkPendingToast() {
    const pending = sessionStorage.getItem("pendingToast");
    if (pending) {
      const { message, type } = JSON.parse(pending);
      this.toast.show(message, type);
      sessionStorage.removeItem("pendingToast");
    }
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading.set(true);
    this.error.set("");
    this.auth.login(this.form.value).subscribe({
      next: () => {
        this.loading.set(false);
        this.toast.show("Login successful!", "success");
        this.router.navigate(["/tenants"]);
      },
      error: (err) => {
        this.loading.set(false);
        this.toast.show("Invalid credentials.", "error");
      },
    });
  }

  goToRegister() {
    this.router.navigate(["/register"]);
  }
}
