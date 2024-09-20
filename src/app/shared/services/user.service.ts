import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from './../../core/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  idProfile!: string;
  private apiUrl = `${environment.baseurl}`;

  constructor(protected http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }
  getProfile(idUser ? : string): Observable<User> {
    const url = `${this.apiUrl}/profile`
    return this.http.get<User>(!idUser ? `${url}` : `${url}/${this.idProfile}`);
  }
  setUserIdProfile(idUser : string){
   this.idProfile = idUser
  }
  getUserIdProfile(){
    return this.idProfile 
   }
   updatePicture(data:unknown){
    return  this.http.put(`${this.apiUrl}/users/updatePicture`, data);
   }
}

