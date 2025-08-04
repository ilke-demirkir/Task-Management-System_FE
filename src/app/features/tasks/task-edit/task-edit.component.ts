import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../../services/task.service';
import { UserSelectorComponent } from '../../../shared/user-selector/user-selector.component';
import { DatePickerComponent } from '../../../shared/date-picker/date-picker.component';
import { ToastService } from '../../../shared/toast/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss'],
  imports: [UserSelectorComponent, DatePickerComponent, ReactiveFormsModule, CommonModule]
})
export class TaskEditComponent implements OnInit {
  taskForm: FormGroup;
  loading = signal(false);
  error = signal<string | null>(null);
  success = signal(false);
  taskId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private taskService: TaskService,
    private toastService: ToastService
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      status: ['', Validators.required],
      assignedToId: ['', Validators.required],
      projectId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.taskId = params.get('id');
      if (this.taskId) {
        this.fetchTask(this.taskId);
      } else {
        this.error.set('No task ID provided.');
      }
    });
  }

  fetchTask(id: string) {
    this.loading.set(true);
    this.error.set(null);
    this.taskService.getTask(id).subscribe({
      next: (task) => {
        this.taskForm.patchValue(task);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load task.');
        this.loading.set(false);
      }
    });
  }

  saveTask() {
    if (!this.taskId || this.taskForm.invalid) return;
    this.loading.set(true);
    this.error.set(null);
    this.success.set(false);
    this.taskService.updateTask(this.taskId, this.taskForm.value).subscribe({
      next: () => {
        this.success.set(true);
        this.loading.set(false);
        this.toastService.show('Task updated!', 'success');
      },
      error: () => {
        this.error.set('Failed to update task.');
        this.loading.set(false);
        this.toastService.show('Failed to update task.', 'error');
      }
    });
  }
}
