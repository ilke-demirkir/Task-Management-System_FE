import { Component, OnInit, signal } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ProjectService } from "../../../services/project.service";
import { UserSelectorComponent } from "../../../shared/user-selector/user-selector.component";
import { ToastService } from "../../../shared/toast/toast.service";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { ProjectTypes } from "../../../models/project.model";
import { MatSelectModule } from "@angular/material/select";
import { AuthService } from "../../../services/auth.service";
import { TenantContextService } from "../../../services/tenant-context.service";
import { TenantService } from "../../../services/tenant.service";
import { TenantDetailComponent } from "../../tenants/tenant-detail/tenant-detail.component";
import { TenantDto } from "../../../models/tenant.model";

@Component({
  selector: "app-project-create",
  standalone: true,
  templateUrl: "./project-create.component.html",
  styleUrls: ["./project-create.component.scss"],
  imports: [
    UserSelectorComponent,
    ReactiveFormsModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
})
export class ProjectCreateComponent implements OnInit {
  ProjectTypes = ProjectTypes;
  projectForm: FormGroup;
  error = signal<string | null>(null);
  success = signal(false);
  loading = signal(false);
  projectTypes = Object.values(ProjectTypes); // ['SoftwareDevelopment','DataScience',...]
  tenants: TenantDto[] = [];

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private toastService: ToastService,
    public authService: AuthService,
    private ctx: TenantContextService,
    public tenantService: TenantService,
  ) {
    this.projectForm = this.fb.group({
      name: ["", Validators.required],
      description: [""],
      projectType: ["", Validators.required],
      ownerId: [this.authService.getCurrentUser()?.id],
      tenantId: [this.ctx.getTenantId().getValue()],
    });
  }
  ngOnInit(): void {
    this.tenantService.getTenants().subscribe({
      next: (tenants) => {
        this.tenants = tenants;
        console.log("Fetched tenants:", tenants);
      },
      error: (err) => {
        this.error.set("Failed to load tenants.");
        this.toastService.show("Failed to load tenants.", "error");
        console.error("Error fetching tenants:", err);
      },
    });
  }

  createProject() {
    if (this.projectForm.invalid) return;
    this.error.set(null);
    this.success.set(false);
    this.loading.set(true);
    console.log("Creating project with payload:", this.projectForm.value);
    this.projectService.createProject(this.projectForm.value).subscribe({
      next: () => {
        this.success.set(true);
        this.projectForm.reset();
        this.toastService.show("Project created!", "success");
        this.loading.set(false);
      },
      error: () => {
        this.error.set("Failed to create project.");
        this.toastService.show("Failed to create project.", "error");
        this.loading.set(false);
      },
    });
  }
  humanize = (s: string) => s.replace(/([a-z])([A-Z])/g, "$1 $2");
}

/* TO-DO
Admins need to be able to create projects for any tenant.
To that end create a tenant selector component that will be visible only to admins.xs

*/
