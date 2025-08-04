import { Component, Input, signal, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentService } from '../../../services/comment.service';
import { AuthService } from '../../../services/auth.service';
import { ToastService } from '../../../shared/toast/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comment-create',
  standalone: true,
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class CommentCreateComponent {
  private fb = inject(FormBuilder);
  private commentService = inject(CommentService);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  @Input() taskId!: string;
  commentForm: FormGroup;
  loading = signal(false);
  error = signal<string | null>(null);
  success = signal(false);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    this.commentForm = this.fb.group({
      content: ['', Validators.required]
    });
  }

  getCurrentUserId(): string | null {
    const token = this.authService.getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub || payload.userId || null;
    } catch {
      return null;
    }
  }

  createComment() {
    if (this.commentForm.invalid) return;
    this.loading.set(true);
    this.error.set(null);
    this.success.set(false);
    const payload = {
      ...this.commentForm.value,
      userId: this.authService.getToken() ? JSON.parse(atob(this.authService.getToken()!.split('.')[1])).sub : '',
    };
    this.commentService.createComment(payload).subscribe({
      next: () => {
        this.success.set(true);
        this.loading.set(false);
        this.commentForm.reset();
        this.toastService.show('Comment added!', 'success');
      },
      error: () => {
        this.error.set('Failed to add comment.');
        this.loading.set(false);
        this.toastService.show('Failed to add comment.', 'error');
      }
    });
  }
}
