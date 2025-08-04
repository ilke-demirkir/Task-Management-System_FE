import { Component, OnInit, signal, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../../services/task.service';
import { TaskDto } from '../../../models/task.model';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
  imports: [CommonModule, DatePipe]
})
export class TaskDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private taskService = inject(TaskService);

  task = signal<TaskDto | null>(null);
  error = signal<string | null>(null);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.fetchTask(id);
      } else {
        this.error.set('No task ID provided.');
      }
    });
  }

  fetchTask(id: string) {
    this.error.set(null);
    this.taskService.getTask(id).subscribe({
      next: (task) => {
        this.task.set(task);
      },
      error: () => {
        this.error.set('Failed to load task details.');
      }
    });
  }
}
