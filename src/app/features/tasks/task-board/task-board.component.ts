import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { TaskDto } from '../../../models/task.model';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-board',
  standalone: true,
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss'],
  imports: [CommonModule, DatePipe]
})
export class TaskBoardComponent implements OnInit {
  private taskService = inject(TaskService);

  tasks = signal<TaskDto[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  statuses = ['To Do', 'In Progress', 'Done'];

  tasksByStatus = computed(() => {
    const grouped: Record<string, TaskDto[]> = {};
    for (const status of this.statuses) {
      grouped[status] = this.tasks().filter(t => t.status === status);
    }
    return grouped;
  });

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  ngOnInit() {
    this.fetchTasks();
  }

  fetchTasks() {
    this.loading.set(true);
    this.error.set(null);
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks.set(tasks);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load tasks.');
        this.loading.set(false);
      }
    });
  }
}
