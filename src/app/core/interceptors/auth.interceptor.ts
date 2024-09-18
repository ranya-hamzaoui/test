import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authserice: AuthService,
    private router: Router
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: string = this.authserice.getJwtToken()!;

    if (token) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });
    }

    return next.handle(request);
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    const refreshToken: string = localStorage.getItem('refreshToken')!;

    return this.authserice.refreshToken().pipe(
      map((token: any) => {
        console.log('token in refresh', token);

        //return next.handle(TokenInterceptor.addToken(request, token.token));
      })
    );
  }
}
