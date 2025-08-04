import { Component, Input, OnInit, signal, computed, inject } from '@angular/core';
import { AttachmentService } from '../../../services/attachment.service';
import { AttachmentDto } from '../../../models/attachment.model';
import { UserService } from '../../../services/user.service';
import { ApplicationUserDto } from '../../../models/user.model';
import { ConfirmClickDirective } from '../../../shared/confirm-click.directive';
import { ToastService } from '../../../shared/toast/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-attachment-list',
  standalone: true,
  templateUrl: './attachment-list.component.html',
  styleUrls: ['./attachment-list.component.scss'],
  imports: [ ConfirmClickDirective, CommonModule],
})
export class AttachmentListComponent implements OnInit {
  private attachmentService = inject(AttachmentService);
  private userService = inject(UserService);
  private toastService = inject(ToastService);

  @Input() taskId!: string;
  attachments = signal<AttachmentDto[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  userMap: Record<string, ApplicationUserDto> = {};

  filteredAttachments = computed(() =>
    this.attachments().filter(a => a.taskId === this.taskId)
  );

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  ngOnInit() {
    this.fetchAttachments();
    this.fetchUsers();
  }

  fetchAttachments() {
    this.loading.set(true);
    this.error.set(null);
    this.attachmentService.getAttachments().subscribe({
      next: (attachments) => {
        this.attachments.set(attachments);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load attachments.');
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

  deleteAttachment(id: string) {
    this.attachmentService.deleteAttachment(id).subscribe({
      next: () => {
        this.attachments.set(this.attachments().filter(a => a.id !== id));
        this.toastService.show('Attachment deleted!', 'success');
      },
      error: () => {
        this.error.set('Failed to delete attachment.');
        this.toastService.show('Failed to delete attachment.', 'error');
      }
    });
  }
}
