import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Post } from 'src/app/core/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  private baseUrl = `${environment.baseurl}/posts`;

  /**
   * Get list of follows.
   * @return {Observable<Post>} List Post of follows.
   */
  getFollowsPosts(page: number): Observable<Post[]> {
    return this.http
      .get<Post[]>(`${environment.baseurl}/posts-follow/${page}`)
      .pipe(map((data: any) => data));
  }
  /**
   * Get list new.
   * @return {Observable<Post>} List placeholder.
   */
  getMyPostsByLike(page: number): Observable<Post[]> {
    return this.http
      .get<Post[]>(`${this.baseUrl}-user/${page}`)
      .pipe(map((data: any) => data));
  }
  /**
   * Get list new.
   * @return {Observable<Post>} List placeholder.
   */
  getPostsByLike(page: number): Observable<Post[]> {
    return this.http
      .get<Post[]>(`${this.baseUrl}-like/${page}`)
      .pipe(map((data: any) => data));
  }
  /**
   * Add new new.
   * @body {Role} .
   * @return {Observable<Data>} return data with message and object created.
   */
  createPost(data: any): Observable<Post[]> {
    return this.http.post<Post[]>(`${this.baseUrl}`, data);
  }

  /**
   * Add new new.
   * @body {Role} .
   * @return {Observable<Data>} return data with message and object created.
   */
  createPostWithPicture(data: any): Observable<Post[]> {
    return this.http.post<Post[]>(
      `${environment.baseurl}/posts/saveFile`,
      data
    );
  }

  updatePost(id: string, data: any): Observable<Post> {
    return this.http.put<Post>(`${environment.baseurl}/posts/${id}`, data);
  }

  deletePost(id: string): Observable<Post> {
    return this.http.delete<Post>(`${this.baseUrl}/${id}`);
  }
}
