import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class chatService {

  private baseUrl = `${environment.baseurl}/chats`;
  constructor(private http: HttpClient) {}

   getAllRooms(page: number): Observable<any[]> {
      return this.http
        .get<any[]>(`${this.baseUrl}/${page}`)
        .pipe(map((data: any) => data));
    }
   InitiateRoom(idReceiver: any,page:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/initiate/${idReceiver}/${page}`,{});
   }

}
