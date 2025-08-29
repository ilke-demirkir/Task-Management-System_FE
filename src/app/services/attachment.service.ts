import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AttachmentDto } from "../models/attachment.model";

@Injectable({ providedIn: "root" })
export class AttachmentService {
  private http = inject(HttpClient);
  private apiUrl = "https://localhost:5097/api/attachments";

  createAttachment(
    payload: { taskId: string; fileName: string; fileUrl: string },
  ): Observable<AttachmentDto> {
    return this.http.post<AttachmentDto>(this.apiUrl, payload);
  }

  getAttachments(): Observable<AttachmentDto[]> {
    return this.http.get<AttachmentDto[]>(this.apiUrl);
  }

  getAttachment(id: string): Observable<AttachmentDto> {
    return this.http.get<AttachmentDto>(`${this.apiUrl}/${id}`);
  }

  deleteAttachment(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
