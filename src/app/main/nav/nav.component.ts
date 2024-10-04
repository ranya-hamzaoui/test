import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NotificationnService } from 'src/app/shared/services/notificationn.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  refreshToken: string = '';
  user!: User;
  menuOpen = false;
  
  all_notif : any [] = [] ;
  reserv : any []=[];
  count  : any = 0 ;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userApi: UserService,
    private srvcNotfi:NotificationnService
  ) {}

  ngOnInit(): void {
    this.getProfile();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  
  logout(): void {
    this.authService.removeToken();
    this.router.navigateByUrl('/');

    // this.authService.Logout().subscribe({
    //   next: () => {
    //     this.router.navigateByUrl('/');
    //   },
    //   error: (err) => {
    //     console.error('Logout error:', err);
    //   }
    // });
  }
  getProfile(): void {
    this.userApi.getProfile().subscribe({
      next: (res: any) => {
        this.user = res.data?.user || null;
      },
      error: (err) => {
        console.error('Profile fetch error:', err);
      },
    });
  }

  get_all(){
    this.srvcNotfi.getAllNotif(1,15).subscribe((res : any)=>{
      this.all_notif =res['data']['notifications']
      for (let i = 0; i < this.all_notif.length; i++){
        if (this.all_notif[i].type == 8 || this.all_notif[i].type == 5){
          // this.reserv.push(this.all_notif[i])
        }}
    })
  }
}
