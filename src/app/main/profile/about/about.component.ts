import { Component } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/core/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  user!:User 
  constructor(private userService:UserService) { 
      this.getUser();
  }
  getUser(){
    this.userService.getProfile(this.userService.getUserIdProfile()).subscribe(
      (res:any) => {
        this.user = res.data['user']
      }
    )
  }
}