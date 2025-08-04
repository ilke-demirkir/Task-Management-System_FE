import { Component, OnInit, signal, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TenantService } from '../../../services/tenant.service';
import { UserService } from '../../../services/user.service';
import { ProjectService } from '../../../services/project.service';
import { TenantDto } from '../../../models/tenant.model';
import { ApplicationUserDto } from '../../../models/user.model';
import { ProjectDto } from '../../../models/project.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tenant-detail',
  standalone: true,
  templateUrl: './tenant-detail.component.html',
  styleUrls: ['./tenant-detail.component.scss'],
  imports: [CommonModule],
})
export class TenantDetailComponent implements OnInit {
  tenant = signal<TenantDto | null>(null);
  users = signal<ApplicationUserDto[]>([]);
  projects = signal<ProjectDto[]>([]);
  error = signal<string | null>(null);

  // Computed signals for filtered data
  tenantUsers = computed(() => {
    const currentTenant = this.tenant();
    return currentTenant ? this.users().filter(u => u.tenantId === currentTenant.id) : [];
  });

  tenantProjects = computed(() => {
    const currentTenant = this.tenant();
    return currentTenant ? this.projects().filter(p => p.ownerId === currentTenant.id) : [];
  });

  constructor(
    private route: ActivatedRoute,
    private tenantService: TenantService,
    private userService: UserService,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.fetchTenant(id);
        this.fetchUsers();
        this.fetchProjects();
      } else {
        this.error.set('No tenant ID provided.');
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
        this.error.set('Failed to load tenant details.');
      }
    });
  }

  fetchUsers() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users.set(users);
      }
    });
  }

  fetchProjects() {
    this.projectService.getProjects().subscribe({
      next: (projects) => {
        this.projects.set(projects);
      }
    });
  }
}
