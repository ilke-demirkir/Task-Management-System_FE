import { Component, OnInit } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { Router, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ProjectService } from "../../services/project.service";
import { ProjectDto } from "../../models/project.model";
import { ApplicationUserDto } from "../../models/user.model";
import { AuthService } from "../../services/auth.service";
import { firstValueFrom } from "rxjs";

interface Task {
  id: string;
  title: string;
  dueDate: string;
  project: string;
}

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  constructor(
    private router: Router,
    private projectService: ProjectService,
    private authService: AuthService,
  ) {}

  projects: ProjectDto[] = [];
  user!: ApplicationUserDto | null;
  tasks: Task[] = [
    {
      id: "1",
      title: "Design UI",
      dueDate: "2024-06-10",
      project: "Website Redesign",
    },
    {
      id: "2",
      title: "Write API Docs",
      dueDate: "2024-06-12",
      project: "API Integration",
    },
    {
      id: "3",
      title: "Sprint Planning",
      dueDate: "2024-06-14",
      project: "Mobile App",
    },
  ];

  addProject() {
    this.router.navigate(["/projects/create"]);
  }
  async ngOnInit(): Promise<void> {
    this.user = this.authService.getCurrentUser();
    const projects = await firstValueFrom(
      this.projectService.getProjects(this.user?.id || ""),
    );
    console.log("🔥 Projects:", projects);
    this.projects = projects;
  }
}
