import { Component, computed, OnInit, signal } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TenantService } from "../../../services/tenant.service";
import { UserService } from "../../../services/user.service";
import { ProjectService } from "../../../services/project.service";
import { TenantDto } from "../../../models/tenant.model";
import { TenantMembers } from "../../../models/tenant.model";
import { ProjectDto } from "../../../models/project.model";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../../services/auth.service";
import { RouterLink } from "@angular/router";
import { AddUsersComponent } from "../add-users/add-users.component";
import { Dialog } from "@angular/cdk/dialog";
import { TenantContextService } from "../../../services/tenant-context.service";
import { ToastService } from "../../../shared/toast/toast.service";

@Component({
  selector: "app-tenant-detail",
  standalone: true,
  templateUrl: "./tenant-detail.component.html",
  styleUrls: ["./tenant-detail.component.scss"],
  imports: [CommonModule, RouterLink],
})
export class TenantDetailComponent implements OnInit {
  tenant = signal<TenantDto | null>(null);
  members: TenantMembers[] = [];
  projects: ProjectDto[] = [];
  error = signal<string | null>(null);
  tenantId!: string | null;
  payload!: { tenantId: string; userId: string };

  constructor(
    private route: ActivatedRoute,
    private tenantService: TenantService,
    private userService: UserService,
    private projectService: ProjectService,
    public authService: AuthService,
    private ctx: TenantContextService,
    private dialog: Dialog,
    private toastService: ToastService,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      if (id) {
        this.tenantId = id;
        this.fetchTenant(id);
        this.fetchUsers();
        console.log("Fetched users:", this.members);
        this.fetchProjects(id);
      } else {
        this.error.set("No tenant ID provided.");
      }
    });
  }

  fetchTenant(id: string) {
    this.error.set(null);
    this.tenantService.getTenant(id).subscribe({
      next: (tenant) => {
        this.tenant.set(tenant);
      },
      error: () => {
        this.error.set("Failed to load tenant details.");
      },
    });
  }

  fetchUsers(tenantId: string = this.tenantId!) {
    this.tenantService.getMembers(tenantId).subscribe({
      next: (users) => {
        users.forEach((user) => {
          this.userService.getUser(user.userId).subscribe({
            next: (userDetails) => {
              user["email"] = userDetails.email; // Add email to the user object
              user["fullName"] = userDetails.fullName; // Add fullName to the user object
              this.members = [...(this.members || []), user];
            },
            error: (err) => {
              console.error(
                `Failed to fetch details for user ID ${user.userId}:`,
                err,
              );
            },
          });
        });
      },
    });
  }

  fetchProjects(tenantId: string) {
    this.projectService.getProjectsByTenant(tenantId).subscribe({
      next: (projects) => {
        this.projects = projects;
        console.log("Fetched projects:", this.projects);
      },
    });
  }
  removeUser(userId: string) {
    if (!this.tenantId) return;
    this.payload = { tenantId: this.tenantId, userId: userId };
    this.tenantService.removeMember(this.payload).subscribe({
      next: () => {
        this.members = this.members.filter((m) => m.userId !== userId);
        this.toastService.show("User removed from tenant.", "success");
      },
      error: () => {
        this.error.set("Failed to remove user from tenant.");
      },
    });
  }

  addUsers() {
    this.dialog.open<string>(AddUsersComponent, {
      data: this.tenantId,
      hasBackdrop: true,
      width: "520px",
      backdropClass: "cdk-overlay-dark-backdrop",
      maxHeight: "90vh",
      panelClass: "app-dialog-panel",
    }).closed.subscribe((addedUserId) => {
      if (addedUserId) this.fetchUsers(); // optimistic update or refetch
    });
  }

  deleteProject(projectId: string) {
    if (!projectId) return;
    if (!confirm("Are you sure you want to delete this project?")) return;
    this.projectService.deleteProject(projectId).subscribe({
      next: () => {
        this.projects = this.projects.filter((p) => p.id !== projectId);
        this.toastService.show("Project deleted!", "success");
      },
      error: () => {
        this.error.set("Failed to delete project.");
        this.toastService.show("Failed to delete project.", "error");
      },
    });
  }
}
