import { Component, OnInit } from '@angular/core';
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
  constructor(private followServ: FollowService, private userService:UserService) {}

  ngOnInit(): void {
    this.getAllUsers();
    // this.getAllMyFollows();
  }

  getAllMyFollows() : void {
    this.followServ.getMyFollows(1).subscribe((resp: any) => {
      this.fakefollows = resp['follows']
    });
  }
  getAllUsers() : void {
    this.userService.getUsers().subscribe((resp: any) => {
      this.fakefollows = resp['data']['users']
    });
  }
  addFollow = (idFollow: any) : void=> {
    this.followServ.addFollow(idFollow).subscribe((res:any)=>{
      this.getAllMyFollows()
    })
  }
  unFollow = (idFollow: any) => {
    this.followServ.deleteFollow(idFollow).subscribe((res:any)=>{
        this.getAllMyFollows()
    })  
  }

}
