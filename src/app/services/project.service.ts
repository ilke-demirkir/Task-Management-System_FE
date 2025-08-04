import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectDto } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private http = inject(HttpClient);
  private apiUrl = '/api/projects';

  createProject(payload: { name: string; description: string; projectType: string; ownerId: string }): Observable<ProjectDto> {
    return this.http.post<ProjectDto>(this.apiUrl, payload);
  }

  getProjects(): Observable<ProjectDto[]> {
    return this.http.get<ProjectDto[]>(this.apiUrl);
  }

  getProject(id: string): Observable<ProjectDto> {
    return this.http.get<ProjectDto>(`${this.apiUrl}/${id}`);
  }

  deleteProject(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateProject(id: string, payload: { name: string; description: string; projectType: string; ownerId: string }): Observable<ProjectDto> {
    return this.http.put<ProjectDto>(`${this.apiUrl}/${id}`, payload);
  }
}
