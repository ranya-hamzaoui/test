import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationnService {

  notif_service_endpoint = environment.baseurl+'/notifications/';
  constructor(private httpClient: HttpClient) { }

  getAllNotif(page : any,nbr : any) : Observable<any> {
    return this.httpClient.get<any>(this.notif_service_endpoint + page +'/'+ nbr);
  }
  getby_id(id :any): Observable<any> {
    return this.httpClient.get<any>(this.notif_service_endpoint +id)
  }
}
