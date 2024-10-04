import { Component, OnInit } from '@angular/core';
import { Follow, User } from 'src/app/core/models';
import { FollowService } from 'src/app/shared/services/follow.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-myabonnes',
  templateUrl: './myabonnes.component.html',
  styleUrls: ['./myabonnes.component.css']
})
export class MyabonnesComponent implements OnInit {
  follows : any [] = []
  total : number = 0;
  itemsPerPage : number = 0;
  urlFile = environment.baseurl + '/getImageFile'
  constructor(private followServ : FollowService) { }

  ngOnInit(): void {
    this.getAllFollows();
  }

  getAllFollows() {
    this.followServ.getFollowing().subscribe((resp : any)=>{
      this.follows = resp['followings'];
      this.total = resp ['total'];
      this.itemsPerPage = resp ['itemsPerPage'];
    })
  }

  unFollow = (idFollow: any) => {
    this.followServ.deleteFollow(idFollow).subscribe(() => {
      this.getAllFollows();
    });
  };

}
