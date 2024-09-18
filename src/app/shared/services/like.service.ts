import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Like } from './../../core/models/like';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  private baseUrl = `${environment.baseurl}/like`;

  constructor(private http: HttpClient) {}

  allLikeByPost(): Observable<Like[]> {
    return this.http.get<Like[]>(`${this.baseUrl}`);
  }

  addLike(postId: any): Observable<Like[]> {
    return this.http.post<Like[]>(`${this.baseUrl}/${postId}`, {
      params: { id: postId },
    });
  }

  removeLike(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseurl}/delete-like/${id}`);
  }

  getLikes(postId: string): Observable<Like[]> {
    return this.http.get<Like[]>(`${environment.baseurl}/get-likes/${postId}`);
  }
}
