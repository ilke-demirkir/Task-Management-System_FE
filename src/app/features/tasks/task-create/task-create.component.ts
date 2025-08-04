import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../../services/task.service';
import { UserSelectorComponent } from '../../../shared/user-selector/user-selector.component';
import { DatePickerComponent } from '../../../shared/date-picker/date-picker.component';
import { ToastService } from '../../../shared/toast/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-create',
  standalone: true,
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss'],
  imports: [UserSelectorComponent, DatePickerComponent, ReactiveFormsModule, CommonModule]
})
export class TaskCreateComponent {
  taskForm: FormGroup;
  error = signal<string | null>(null);
  success = signal(false);

  constructor(private fb: FormBuilder, private taskService: TaskService, private toastService: ToastService) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      projectId: ['', Validators.required],
      assignedToId: ['', Validators.required]
    });
  }

  createTask() {
    if (this.taskForm.invalid) return;
    this.error.set(null);
    this.success.set(false);
    this.taskService.createTask(this.taskForm.value).subscribe({
      next: () => {
        this.success.set(true);
        this.taskForm.reset();
        this.toastService.show('Task created!', 'success');
      },
      error: () => {
        this.error.set('Failed to create task.');
        this.toastService.show('Failed to create task.', 'error');
      }
    });
  }
}
