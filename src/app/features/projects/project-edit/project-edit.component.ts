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
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-project-edit",
  standalone: true,
  templateUrl: "./project-edit.component.html",
  styleUrls: ["./project-edit.component.scss"],
  imports: [
    UserSelectorComponent,
    ReactiveFormsModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class ProjectEditComponent implements OnInit {
  projectForm: FormGroup;
  loading = signal(false);
  error = signal<string | null>(null);
  success = signal(false);
  projectId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.projectForm = this.fb.group({
      name: ["", Validators.required],
      description: [""],
      projectType: ["", Validators.required],
      ownerId: ["", Validators.required],
    });
  }

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get("id");
    if (this.projectId) {
      this.loading.set(true);
      this.projectService.getProject(this.projectId).subscribe({
        next: (project) => {
          this.projectForm.patchValue(project);
          this.loading.set(false);
        },
        error: () => {
          this.error.set("Failed to load project.");
          this.toastService.show("Failed to load project.", "error");
          this.loading.set(false);
        },
      });
    }
  }

  updateProject() {
    if (this.projectForm.invalid || !this.projectId) return;
    this.loading.set(true);
    this.error.set(null);
    this.success.set(false);
    this.projectService.updateProject(this.projectId, this.projectForm.value)
      .subscribe({
        next: () => {
          this.success.set(true);
          this.toastService.show("Project updated!", "success");
          this.loading.set(false);
          this.router.navigate(["/projects", this.projectId]);
        },
        error: () => {
          this.error.set("Failed to update project.");
          this.toastService.show("Failed to update project.", "error");
          this.loading.set(false);
        },
      });
  }
}
