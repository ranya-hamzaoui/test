import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from 'src/app/core/models';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  private baseUrl = `${environment.baseurl}/comments`;

  getCommentByPost(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.baseUrl);
  }

  addComment(data: any): Observable<Comment> {
    return this.http.post<Comment>(this.baseUrl, data);
  }

  getCommentById(id: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.baseUrl}/${id}`);
  }

  updateComment(id: string, data: any): Observable<Comment> {
    return this.http.put<Comment>(`${this.baseUrl}/${id}`, data);
  }
  deleteComment(id: string): Observable<Comment> {
    return this.http.delete<Comment>(`${this.baseUrl}/${id}`);
  }
}
