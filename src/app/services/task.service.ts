import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TaskDto } from "../models/task.model";

@Injectable({ providedIn: "root" })
export class TaskService {
  private http = inject(HttpClient);
  private apiUrl = "https://localhost:5097/api/tasks";

  createTask(
    payload: {
      title: string;
      description: string;
      dueDate: string;
      projectId: string;
      assignedToId: string;
    },
  ): Observable<TaskDto> {
    return this.http.post<TaskDto>(this.apiUrl, payload);
  }

  getTasks(): Observable<TaskDto[]> {
    return this.http.get<TaskDto[]>(this.apiUrl);
  }

  getTask(id: string): Observable<TaskDto> {
    return this.http.get<TaskDto>(`${this.apiUrl}/${id}`);
  }

  updateTask(id: string, task: Partial<TaskDto>): Observable<TaskDto> {
    return this.http.put<TaskDto>(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
