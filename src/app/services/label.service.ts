import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { LabelDto } from "../models/label.model";

@Injectable({ providedIn: "root" })
export class LabelService {
  private http = inject(HttpClient);
  private apiUrl = "https://localhost:5097/api/labels";

  createLabel(
    payload: { tenantId: string; name: string; color: string },
  ): Observable<LabelDto> {
    return this.http.post<LabelDto>(this.apiUrl, payload);
  }

  getLabels(): Observable<LabelDto[]> {
    return this.http.get<LabelDto[]>(this.apiUrl);
  }

  getLabel(id: string): Observable<LabelDto> {
    return this.http.get<LabelDto>(`${this.apiUrl}/${id}`);
  }

  deleteLabel(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
