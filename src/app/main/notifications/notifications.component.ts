import { Component, OnInit } from '@angular/core';
import { NotificationnService } from 'src/app/shared/services/notificationn.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  listNotif : any[] = [];
  pager = {
    currentPage:0,
    totalPages:0,
    pages:[]
  };
  constructor(private srvc_notfi:NotificationnService) { }
  ngOnInit() {
    this.getNotifs(1)
  }

  getNotifs(p : any){
    this.srvc_notfi.getAllNotif(p,10).subscribe((reslt:any)=>{
      this.listNotif =reslt['notifications']
      this.pager['pages']=[];
      this.pager["currentPage"]=Number(reslt["currentPage"]);
      this.pager["totalPages"]=Number(reslt["totalPages"]);
      for(let i=0 ; i< reslt['totalPages'] ; i++){
        this.pager['pages'].push((i+1) as never)
      }
    })
  }
  get_id(id: any){
    this.srvc_notfi.getby_id(id).subscribe((res : any)=>{
    })
  }
  setpage(p:number) {
    this.getNotifs(p)
  }
}
