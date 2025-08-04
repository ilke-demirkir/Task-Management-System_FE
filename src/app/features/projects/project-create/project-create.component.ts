import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from '../../../services/project.service';
import { UserSelectorComponent } from '../../../shared/user-selector/user-selector.component';
import { ToastService } from '../../../shared/toast/toast.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-project-create',
  standalone: true,
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss'],
  imports: [
    UserSelectorComponent,
    ReactiveFormsModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class ProjectCreateComponent {
  projectForm: FormGroup;
  error = signal<string | null>(null);
  success = signal(false);
  loading = signal(false);

  constructor(private fb: FormBuilder, private projectService: ProjectService, private toastService: ToastService) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      projectType: ['', Validators.required],
      ownerId: ['', Validators.required]
    });
  }

  createProject() {
    if (this.projectForm.invalid) return;
    this.error.set(null);
    this.success.set(false);
    this.loading.set(true);
    this.projectService.createProject(this.projectForm.value).subscribe({
      next: () => {
        this.success.set(true);
        this.projectForm.reset();
        this.toastService.show('Project created!', 'success');
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to create project.');
        this.toastService.show('Failed to create project.', 'error');
        this.loading.set(false);
      }
    });
  }
}
