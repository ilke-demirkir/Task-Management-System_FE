import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ProjectDto } from "../models/project.model";

@Injectable({ providedIn: "root" })
export class ProjectService {
  private http = inject(HttpClient);
  private apiUrl = "https://localhost:5097/api/projects";

  createProject(
    payload: {
      name: string;
      description: string;
      projectType: string;
      ownerId: string;
      tenatId: string; // optional for tenant-specific projects
    },
  ): Observable<ProjectDto> {
    return this.http.post<ProjectDto>(this.apiUrl, payload);
  }

  getProjects(userId?: string): Observable<ProjectDto[]> {
    const params = { userId: userId || "" };
    return this.http.get<ProjectDto[]>(this.apiUrl, { params });
  }

  getProject(id: string): Observable<ProjectDto> {
    return this.http.get<ProjectDto>(`${this.apiUrl}/${id}`);
  }
  getProjectsByTenant(tenantId: string): Observable<ProjectDto[]> {
    return this.http.get<ProjectDto[]>(`${this.apiUrl}/tenant/${tenantId}`);
  }

  deleteProject(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  removeMember(userId: string, projectId: string): Observable<void> {
    //TO-DO: Implement the backend endpoint for removing a member from a project
    return this.http.delete<void>(
      `${this.apiUrl}/${projectId}/members/${userId}`,
    );
  }

  updateProject(
    payload: {
      id: string;
      name: string;
      description: string;
      projectType: string;
      ownerId: string;
    },
  ): Observable<ProjectDto> {
    return this.http.put<ProjectDto>(`${this.apiUrl}/${payload.id}`, payload);
  }
}
