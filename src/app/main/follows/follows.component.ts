import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/models';
import { FollowService } from 'src/app/shared/services/follow.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-follows',
  templateUrl: './follows.component.html',
  styleUrls: ['./follows.component.css'],
})
export class FollowsComponent implements OnInit {

  follows: User[] = [];
  fakefollowsold = [
    {
    _id: '1111',
    username: 'rania',
    email: 'rania@gmail.com',
    image: 'string',
    Gender: 'Femme'
    },
    {
      _id: '1111',
      username: 'rania',
      email: 'rania@gmail.com',
      image: 'string',
      Gender: 'Femme'
      },
      {
        _id: '1111',
        username: 'rania',
        email: 'rania@gmail.com',
        image: 'string',
        Gender: 'Femme'
        }
   ]
   fakefollows : any 
  constructor(private followServ: FollowService, 
    private toastService:ToastrService,
    private userService:UserService) {}

  ngOnInit(): void {
    // this.getAllUsers();
    this.getAllNotFollows();
  }

  getAllNotFollows() : void {
    this.followServ.getNotFollowed().subscribe((resp: any) => {
      this.follows = resp['data']
      console.log('dataaaaa', resp['data'])
    });
  }
  getAllUsers() : void {
    this.userService.getUsers().subscribe((resp: any) => {
      this.follows = resp['data']['users']
    });
  }
  addFollow = (follow: any) : void=> {
    this.followServ.addFollow(follow).subscribe((res:any)=>{
      this.getAllNotFollows()
      this.toastService.success('follow is Done')
    },
    err => this.toastService.error('Failed to follow')
    )
  }
  unFollow = (idFollow: any) => {
    this.followServ.deleteFollow(idFollow).subscribe((res:any)=>{
        this.getAllNotFollows()
    })  
  }

}
