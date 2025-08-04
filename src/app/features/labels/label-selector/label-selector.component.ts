import { Component, OnInit, Output, EventEmitter, signal, inject } from '@angular/core';
import { LabelService } from '../../../services/label.service';
import { LabelDto } from '../../../models/label.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-label-selector',
  standalone: true,
  templateUrl: './label-selector.component.html',
  styleUrls: ['./label-selector.component.scss'],
  imports: [CommonModule]
})
export class LabelSelectorComponent implements OnInit {
  private labelService = inject(LabelService);

  labels = signal<LabelDto[]>([]);
  selectedLabelIds = signal<string[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  @Output() selectionChange = new EventEmitter<string[]>();

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

  toggleLabel(id: string) {
    const current = this.selectedLabelIds();
    if (current.includes(id)) {
      this.selectedLabelIds.set(current.filter(lid => lid !== id));
    } else {
      this.selectedLabelIds.set([...current, id]);
    }
    this.selectionChange.emit(this.selectedLabelIds());
  }
}
