import { Component, OnInit, signal, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../services/project.service';
import { TaskService } from '../../../services/task.service';
import { ProjectDto } from '../../../models/project.model';
import { TaskDto } from '../../../models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  imports: [CommonModule],
})
export class ProjectDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private projectService = inject(ProjectService);
  private taskService = inject(TaskService);

  project = signal<ProjectDto | null>(null);
  tasks = signal<TaskDto[]>([]);
  error = signal<string | null>(null);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.fetchProject(id);
        this.fetchTasks(id);
      } else {
        this.error.set('No project ID provided.');
      }
    });
  }

  fetchProject(id: string) {
    this.error.set(null);
    this.projectService.getProject(id).subscribe({
      next: (project) => {
        this.project.set(project);
      },
      error: () => {
        this.error.set('Failed to load project details.');
      }
    });
  }

  fetchTasks(projectId: string) {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks.set(tasks.filter(t => t.projectId === projectId));
      }
    });
  }
}
