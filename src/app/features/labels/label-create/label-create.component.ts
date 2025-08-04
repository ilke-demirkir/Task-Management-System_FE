import { Component, signal, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LabelService } from '../../../services/label.service';
import { ToastService } from '../../../shared/toast/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-label-create',
  standalone: true,
  templateUrl: './label-create.component.html',
  styleUrls: ['./label-create.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class LabelCreateComponent {
  private fb = inject(FormBuilder);
  private labelService = inject(LabelService);
  private toastService = inject(ToastService);

  labelForm: FormGroup;
  loading = signal(false);
  error = signal<string | null>(null);
  success = signal(false);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    this.labelForm = this.fb.group({
      tenantId: ['', Validators.required],
      name: ['', Validators.required],
      color: ['', Validators.required]
    });
  }

  createLabel() {
    if (this.labelForm.invalid) return;
    this.loading.set(true);
    this.error.set(null);
    this.success.set(false);
    this.labelService.createLabel(this.labelForm.value).subscribe({
      next: () => {
        this.success.set(true);
        this.loading.set(false);
        this.labelForm.reset();
        this.toastService.show('Label created!', 'success');
      },
      error: () => {
        this.error.set('Failed to create label.');
        this.loading.set(false);
        this.toastService.show('Failed to create label.', 'error');
      }
    });
  }
}
