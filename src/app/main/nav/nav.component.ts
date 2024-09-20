import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models';
import { AuthService } from 'src/app/shared/services/auth.service';
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
  constructor(
    private authService: AuthService,
    private router: Router,
    private userApi: UserService
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
}
