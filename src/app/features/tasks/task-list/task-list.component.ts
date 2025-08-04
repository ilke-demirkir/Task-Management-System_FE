import { Component, OnInit, signal, computed } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { TaskDto } from '../../../models/task.model';
import { FormControl } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ApplicationUserDto } from '../../../models/user.model';
import { UserAvatarComponent } from '../../../shared/user-avatar/user-avatar.component';
import { StatusBadgeComponent } from '../../../shared/status-badge/status-badge.component';
import { SearchBarComponent } from '../../../shared/search-bar/search-bar.component';
import { ToastService } from '../../../shared/toast/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  imports: [UserAvatarComponent, StatusBadgeComponent, SearchBarComponent, CommonModule],
})
export class TaskListComponent implements OnInit {
  tasks = signal<TaskDto[]>([]);
  error = signal<string | null>(null);
  search = new FormControl('');
  userMap: { [id: string]: ApplicationUserDto } = {};

  filteredTasks = computed(() => {
    const term = this.search.value?.toLowerCase() || '';
    return this.tasks().filter(t =>
      t.title.toLowerCase().includes(term) ||
      t.description.toLowerCase().includes(term) ||
      t.status.toLowerCase().includes(term)
    );
  });

  constructor(private taskService: TaskService, private userService: UserService, private toastService: ToastService) {}

  ngOnInit() {
    this.fetchTasks();
    this.fetchUsers();
  }

  fetchTasks() {
    this.error.set(null);
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks.set(tasks);
      },
      error: () => {
        this.error.set('Failed to load tasks.');
      }
    });
  }

  fetchUsers() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        users.forEach(u => this.userMap[u.id] = u);
      }
    });
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.tasks.set(this.tasks().filter(t => t.id !== id));
        this.toastService.show('Task deleted!', 'success');
      },
      error: () => {
        this.error.set('Failed to delete task.');
        this.toastService.show('Failed to delete task.', 'error');
      }
    });
  }
}
