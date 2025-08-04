import { Component, Input, OnInit, signal, computed, inject } from '@angular/core';
import { CommentService } from '../../../services/comment.service';
import { CommentDto } from '../../../models/comment.model';
import { UserService } from '../../../services/user.service';
import { ApplicationUserDto } from '../../../models/user.model';
import { UserAvatarComponent } from '../../../shared/user-avatar/user-avatar.component';
import { ConfirmClickDirective } from '../../../shared/confirm-click.directive';
import { ToastService } from '../../../shared/toast/toast.service';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
  imports: [UserAvatarComponent, ConfirmClickDirective, CommonModule, DatePipe],
})
export class CommentListComponent implements OnInit {
  private commentService = inject(CommentService);
  private userService = inject(UserService);
  private toastService = inject(ToastService);

  @Input() taskId!: string;
  comments = signal<CommentDto[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  userMap: Record<string, ApplicationUserDto> = {};

  filteredComments = computed(() =>
    this.comments().filter(c => c.taskId === this.taskId)
  );

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  ngOnInit() {
    this.fetchComments();
    this.fetchUsers();
  }

  fetchComments() {
    this.loading.set(true);
    this.error.set(null);
    this.commentService.getComments().subscribe({
      next: (comments) => {
        this.comments.set(comments);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load comments.');
        this.loading.set(false);
      }
    });
  }

  fetchUsers() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.userMap = users.reduce((acc, user) => {
          acc[user.id] = user;
          return acc;
        }, {} as Record<string, ApplicationUserDto>);
      }
    });
  }

  deleteComment(id: string) {
    this.commentService.deleteComment(id).subscribe({
      next: () => {
        this.comments.set(this.comments().filter(c => c.id !== id));
        this.toastService.show('Comment deleted!', 'success');
      },
      error: () => {
        this.error.set('Failed to delete comment.');
        this.toastService.show('Failed to delete comment.', 'error');
      }
    });
  }
}
