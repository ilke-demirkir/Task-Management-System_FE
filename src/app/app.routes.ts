import { Routes } from "@angular/router";
import { RoleGuard } from "./core/guards/role.guard";
import { TenantSelectedGuard } from "./shared/tenant-selected.guard";
export const routes: Routes = [
  {
    path: "home",
    loadComponent: () =>
      import("./home/home.component").then((m) => m.HomeComponent),
  },
  {
    path: "dashboard",
    loadComponent: () =>
      import("./features/dashboard/dashboard.component").then((m) =>
        m.DashboardComponent
      ),
  },
  {
    path: "login",
    loadComponent: () =>
      import("./features/auth/login/login.component").then((m) =>
        m.LoginComponent
      ),
  },
  {
    path: "register",
    loadComponent: () =>
      import("./features/auth/register/register.component").then((m) =>
        m.RegisterComponent
      ),
  },
  // --- Main Feature Routes ---
  {
    path: "tasks",
    loadComponent: () =>
      import("./features/tasks/task-list/task-list.component").then((m) =>
        m.TaskListComponent
      ),
    canActivate: [RoleGuard, TenantSelectedGuard],
    data: { roles: ["Admin", "Manager", "User"] },
  },
  {
    path: "tasks/create",
    loadComponent: () =>
      import("./features/tasks/task-create/task-create.component").then((m) =>
        m.TaskCreateComponent
      ),
    canActivate: [RoleGuard, TenantSelectedGuard],
    data: { roles: ["Admin", "Manager"] },
  },
  {
    path: "tasks/:id",
    loadComponent: () =>
      import("./features/tasks/task-detail/task-detail.component").then((m) =>
        m.TaskDetailComponent
      ),
    canActivate: [RoleGuard, TenantSelectedGuard],
    data: { roles: ["Admin", "Manager", "User"] },
  },
  {
    path: "tasks/:id/edit",
    loadComponent: () =>
      import("./features/tasks/task-edit/task-edit.component").then((m) =>
        m.TaskEditComponent
      ),
    canActivate: [RoleGuard, TenantSelectedGuard],
    data: { roles: ["Admin", "Manager"] },
  },
  {
    path: "projects",
    loadComponent: () =>
      import("./features/projects/project-list/project-list.component").then(
        (m) => m.ProjectListComponent,
      ),
    canActivate: [RoleGuard, TenantSelectedGuard],
    data: { roles: ["Admin", "Manager", "User"] },
  },
  {
    path: "projects/create",
    loadComponent: () =>
      import("./features/projects/project-create/project-create.component")
        .then((m) => m.ProjectCreateComponent),
    canActivate: [RoleGuard, TenantSelectedGuard],
    data: { roles: ["Admin", "Manager"] },
  },
  {
    path: "projects/:id",
    loadComponent: () =>
      import("./features/projects/project-detail/project-detail.component")
        .then((m) => m.ProjectDetailComponent),
    canActivate: [RoleGuard, TenantSelectedGuard],
    data: { roles: ["Admin", "Manager", "User"] },
  },
  {
    path: "projects/:id/edit",
    loadComponent: () =>
      import("./features/projects/project-edit/project-edit.component").then(
        (m) => m.ProjectEditComponent,
      ),
    canActivate: [RoleGuard, TenantSelectedGuard],
    data: { roles: ["Admin", "Manager"] },
  },
  {
    path: "users",
    loadComponent: () =>
      import("./features/users/user-list/user-list.component").then((m) =>
        m.UserListComponent
      ),
    canActivate: [RoleGuard, TenantSelectedGuard],
    data: { roles: ["Admin"] },
  },
  {
    path: "users/:id",
    loadComponent: () =>
      import("./features/users/user-profile/user-profile.component").then((m) =>
        m.UserProfileComponent
      ),
    canActivate: [RoleGuard, TenantSelectedGuard],
    data: { roles: ["Admin", "Manager", "User"] },
  },
  {
    path: "tenants",
    loadComponent: () =>
      import("./features/tenants/tenant-list/tenant-list.component").then((m) =>
        m.TenantListComponent
      ),
    canActivate: [RoleGuard],
    data: { roles: ["Admin", "Manager", "User"] },
  },
  {
    path: "tenants/create",
    loadComponent: () =>
      import("./features/tenants/tenant-create/tenant-create.component").then(
        (m) => m.TenantCreateComponent,
      ),
    canActivate: [RoleGuard, TenantSelectedGuard],
    data: { roles: ["Admin"] },
  },
  {
    path: "tenants/:id",
    loadComponent: () =>
      import("./features/tenants/tenant-detail/tenant-detail.component").then(
        (m) => m.TenantDetailComponent,
      ),
    canActivate: [RoleGuard, TenantSelectedGuard],
    data: { roles: ["Admin", "Manager"] },
  },
  // --- Placeholders for future features ---
  {
    path: "comments",
    loadComponent: () =>
      import("./features/comments/comment-list/comment-list.component").then(
        (m) => m.CommentListComponent,
      ),
    canActivate: [RoleGuard, TenantSelectedGuard],
    data: { roles: ["Admin", "Manager", "User"] },
  },
  {
    path: "attachments",
    loadComponent: () =>
      import("./features/attachments/attachment-list/attachment-list.component")
        .then((m) => m.AttachmentListComponent),
    canActivate: [RoleGuard, TenantSelectedGuard],
    data: { roles: ["Admin", "Manager", "User"] },
  },
  {
    path: "labels",
    loadComponent: () =>
      import("./features/labels/label-list/label-list.component").then((m) =>
        m.LabelListComponent
      ),
    canActivate: [RoleGuard, TenantSelectedGuard],
    data: { roles: ["Admin", "Manager", "User"] },
  },
  {
    path: "notifications",
    loadComponent: () =>
      import(
        "./features/notifications/notification-list/notification-list.component"
      ).then((m) => m.NotificationListComponent),
    canActivate: [RoleGuard, TenantSelectedGuard],
    data: { roles: ["Admin", "Manager", "User"] },
  },
  {
    path: "schedules",
    loadComponent: () =>
      import("./features/schedules/schedule-list/schedule-list.component").then(
        (m) => m.ScheduleListComponent,
      ),
    canActivate: [RoleGuard, TenantSelectedGuard],
    data: { roles: ["Admin", "Manager", "User"] },
  },
  {
    path: "profile",
    loadComponent: () =>
      import("./features/users/user-profile/user-profile.component").then((m) =>
        m.UserProfileComponent
      ),
    canActivate: [RoleGuard, TenantSelectedGuard],
    data: { roles: ["Admin", "Manager", "User"] },
  },
  // --- Default redirect ---
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
];
