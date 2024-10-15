import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/models';
import { FollowService } from 'src/app/shared/services/follow.service';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-follows',
  templateUrl: './follows.component.html',
  styleUrls: ['./follows.component.css'],
})
export class FollowsComponent implements OnInit {
  urlImage : string = environment.baseurl + '/getImageFile';
  follows: User[] = [];
  constructor(
    private followServ: FollowService,
    private toastService: ToastrService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getAllNotFollows();
  }

  getAllNotFollows(): void {
    this.followServ.getNotFollowed().subscribe((resp: any) => {
      this.follows = resp['data'];
    });
  }

  addFollow = (follow: any): void => {
    this.followServ.addFollow(follow).subscribe(
      () => {
        this.getAllNotFollows();
        this.toastService.success('follow is Done');
      },
      () => this.toastService.error('Failed to follow')
    );
  };
}
