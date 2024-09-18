import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authservice: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const isAuth = this.authservice.isConnected();
    if (isAuth) {
      return true;
    }
    this.router.navigate(['/'], { skipLocationChange: true });
    return false;
  }
}
