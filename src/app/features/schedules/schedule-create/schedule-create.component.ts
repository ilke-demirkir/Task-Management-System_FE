import { Component, Input, signal, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ScheduleService } from '../../../services/schedule.service';
import { ToastService } from '../../../shared/toast/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-schedule-create',
  standalone: true,
  templateUrl: './schedule-create.component.html',
    styleUrls: ['./schedule-create.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class ScheduleCreateComponent {
  private fb = inject(FormBuilder);
  private scheduleService = inject(ScheduleService);
  private toastService = inject(ToastService);

  @Input() taskId!: string;
  scheduleForm: FormGroup;
  loading = signal(false);
  error = signal<string | null>(null);
  success = signal(false);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    this.scheduleForm = this.fb.group({
      scheduledAt: ['', Validators.required],
      note: ['']
    });
  }

  createSchedule() {
    if (this.scheduleForm.invalid || !this.taskId) return;
    this.loading.set(true);
    this.error.set(null);
    this.success.set(false);
    this.scheduleService.createSchedule({
      taskId: this.taskId,
      scheduledAt: this.scheduleForm.value.scheduledAt,
      note: this.scheduleForm.value.note
    }).subscribe({
      next: () => {
        this.success.set(true);
        this.loading.set(false);
        this.scheduleForm.reset();
        this.toastService.show('Schedule created!', 'success');
      },
      error: () => {
        this.error.set('Failed to create schedule.');
        this.loading.set(false);
        this.toastService.show('Failed to create schedule.', 'error');
      }
    });
  }
}
