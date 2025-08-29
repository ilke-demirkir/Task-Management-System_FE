import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CommentDto } from "../models/comment.model";

@Injectable({ providedIn: "root" })
export class CommentService {
  private http = inject(HttpClient);
  private apiUrl = "https://localhost:5097/api/comments";

  createComment(
    payload: { taskId: string; userId: string; content: string },
  ): Observable<CommentDto> {
    return this.http.post<CommentDto>(this.apiUrl, payload);
  }

  getComments(): Observable<CommentDto[]> {
    return this.http.get<CommentDto[]>(this.apiUrl);
  }

  getComment(id: string): Observable<CommentDto> {
    return this.http.get<CommentDto>(`${this.apiUrl}/${id}`);
  }

  deleteComment(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
