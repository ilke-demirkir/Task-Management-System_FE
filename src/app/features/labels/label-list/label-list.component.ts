import { Component, OnInit, signal, inject } from '@angular/core';
import { LabelService } from '../../../services/label.service';
import { LabelDto } from '../../../models/label.model';
import { StatusBadgeComponent } from '../../../shared/status-badge/status-badge.component';
import { ConfirmClickDirective } from '../../../shared/confirm-click.directive';
import { ToastService } from '../../../shared/toast/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-label-list',
  standalone: true,
  templateUrl: './label-list.component.html',
  styleUrls: ['./label-list.component.scss'],
  imports: [StatusBadgeComponent, ConfirmClickDirective, CommonModule]
})
export class LabelListComponent implements OnInit {
  private labelService = inject(LabelService);
  private toastService = inject(ToastService);

  labels = signal<LabelDto[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  ngOnInit() {
    this.fetchLabels();
  }

  fetchLabels() {
    this.loading.set(true);
    this.error.set(null);
    this.labelService.getLabels().subscribe({
      next: (labels) => {
        this.labels.set(labels);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load labels.');
        this.loading.set(false);
      }
    });
  }

  deleteLabel(id: string) {
    this.labelService.deleteLabel(id).subscribe({
      next: () => {
        this.labels.set(this.labels().filter(l => l.id !== id));
        this.toastService.show('Label deleted!', 'success');
      },
      error: () => {
        this.error.set('Failed to delete label.');
        this.toastService.show('Failed to delete label.', 'error');
      }
    });
  }
}
