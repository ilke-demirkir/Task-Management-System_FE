import { Component, computed, inject, OnInit, signal } from "@angular/core";
import { ProjectService } from "../../../services/project.service";
import { ProjectDto } from "../../../models/project.model";
import { FormControl } from "@angular/forms";
import { UserService } from "../../../services/user.service";
import { ApplicationUserDto } from "../../../models/user.model";
import { UserAvatarComponent } from "../../../shared/user-avatar/user-avatar.component";
import { SearchBarComponent } from "../../../shared/search-bar/search-bar.component";
import { ToastService } from "../../../shared/toast/toast.service";
import { CommonModule, DatePipe } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: "app-project-list",
  standalone: true,
  templateUrl: "./project-list.component.html",
  styleUrls: ["./project-list.component.scss"],
  imports: [
    UserAvatarComponent,
    SearchBarComponent,
    CommonModule,
    DatePipe,
    ReactiveFormsModule,
    RouterLink,
  ],
})
export class ProjectListComponent implements OnInit {
  private projectService = inject(ProjectService);
  private userService = inject(UserService);
  private toastService = inject(ToastService);
  public authService = inject(AuthService);

  projects = signal<ProjectDto[]>([]);
  error = signal<string | null>(null);
  search = new FormControl("");
  userMap: Record<string, ApplicationUserDto> = {};

  filteredProjects = computed(() => {
    const term = this.search.value?.toLowerCase() || "";
    return this.projects().filter((p) =>
      p.name.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term) ||
      p.projectType.toLowerCase().includes(term)
    );
  });

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  ngOnInit() {
    this.fetchProjects();
    this.fetchUsers();
  }

  fetchProjects() {
    this.error.set(null);
    this.projectService.getProjects().subscribe({
      next: (projects) => {
        this.projects.set(projects);
      },
      error: () => {
        this.error.set("Failed to load projects.");
      },
    });
  }

  fetchUsers() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        users.forEach((u) => this.userMap[u.id] = u);
      },
    });
  }

  deleteProject(id: string) {
    this.projectService.deleteProject(id).subscribe({
      next: () => {
        this.projects.set(this.projects().filter((p) => p.id !== id));
        this.toastService.show("Project deleted!", "success");
      },
      error: () => {
        this.error.set("Failed to delete project.");
        this.toastService.show("Failed to delete project.", "error");
      },
    });
  }
}
