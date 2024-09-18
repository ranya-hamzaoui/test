import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/core/models';

@Injectable({
  providedIn: 'root',
})
export class FollowService {
  private url: string = `${environment.baseurl}/follow`;

  constructor(private http: HttpClient) {}

  addFollow(follow: any): Observable<any> {
    // let args = JSON.stringify({follow});
    return this.http.post(this.url, { followed: follow });
  }

  deleteFollow(idFollow: User): Observable<any> {
    return this.http.delete(this.url + 'unfollow/' + idFollow);
  }

  getMyFollows(page = 1): Observable<User[]> {
    const url = this.url + 'ed-user/' + page;
    return this.http.get<User[]>(url);
  }

  getFollowed(userId = null, page = 1): Observable<any> {
    const url = this.url + 'followed/';
    return this.http.get<User[]>(url);
  }

  getNotFollowed(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.baseurl}/not-followed`);
  }
}
