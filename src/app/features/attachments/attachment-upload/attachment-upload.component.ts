import { Component, Input, signal, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AttachmentService } from '../../../services/attachment.service';
import { ToastService } from '../../../shared/toast/toast.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-attachment-upload',
  standalone: true,
  templateUrl: './attachment-upload.component.html',
  styleUrls: ['./attachment-upload.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class AttachmentUploadComponent {
  private fb = inject(FormBuilder);
  private attachmentService = inject(AttachmentService);
  private toastService = inject(ToastService);

  @Input() taskId!: string;
  uploadForm: FormGroup;
  loading = signal(false);
  error = signal<string | null>(null);
  success = signal(false);
  selectedFile: File | null = null;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    this.uploadForm = this.fb.group({
      fileName: ['', Validators.required],
      file: [null, Validators.required]
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
      this.uploadForm.patchValue({ fileName: this.selectedFile.name, file: this.selectedFile });
    }
  }

  uploadAttachment() {
    if (this.uploadForm.invalid || !this.taskId || !this.selectedFile) return;
    this.loading.set(true);
    this.error.set(null);
    this.success.set(false);
    // Simulate file upload and get a fileUrl (in real app, upload to server or storage)
    const fileUrl = URL.createObjectURL(this.selectedFile);
    this.attachmentService.createAttachment({
      taskId: this.taskId,
      fileName: this.uploadForm.value.fileName,
      fileUrl
    }).subscribe({
      next: () => {
        this.success.set(true);
        this.loading.set(false);
        this.uploadForm.reset();
        this.selectedFile = null;
        this.toastService.show('Attachment uploaded!', 'success');
      },
      error: () => {
        this.error.set('Failed to upload attachment.');
        this.loading.set(false);
        this.toastService.show('Failed to upload attachment.', 'error');
      }
    });
  }
}
