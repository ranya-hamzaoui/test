import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { tap, map } from 'rxjs/operators';
import { LoginRequest } from 'src/app/core/models/login-request';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/core/models';
import { RegisterRequest } from 'src/app/core/models/register-request';
import { Router } from '@angular/router';
import { TEXT } from '../constants/text';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlLogin = `${environment.baseurl}/login`;
  private urlRefreshToken = `${environment.baseurl}/refresh-token`;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private readonly TEXT = TEXT;
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser')!)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  Login(paramsLogin: LoginRequest): Observable<any> {
    return this.http.post(this.urlLogin, paramsLogin).pipe(
      map(
        (resp: any) => {
          localStorage.clear();
          this.doLoginUser(resp['data']);
        },
        (error: any) => {
          this.doLogoutUser();
          console.log(error.error);
        }
      )
    );
  }

  Register(RequestRegister: RegisterRequest): Observable<any> {
    return this.http.post(`${environment.baseurl}/register`, RequestRegister);
  }

  Logout(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    return this.http.post(`${environment.baseurl}/logout`, {
      refreshToken,
    });
  }

  forgetPass(data: any): Observable<any> {
    return this.http.put(`${environment.baseurl}/user/forgetPass`, data);
  }

  resetPassword(email: string, newPassword: string): Observable<any> {
    const params = { email, password: newPassword };
    return this.http.put(`${environment.baseurl}/user/reset`, params);
  }

  desconnect() {
    localStorage.clear();
    this.currentUserSubject.next({} as User);
    this.router.navigate(['/pages/login']);
  }

  isConnected(): boolean {
    return !!this.getJwtToken();
  }
  getJwtToken(): string | null {
    return localStorage.getItem(this.TEXT.jwtToken);
  }
  private doLoginUser(resp: {
    token: string;
    refreshToken: string;
    user: User;
  }): void {
    this.storeTokens(resp.token, resp.refreshToken);
    localStorage.setItem(this.TEXT.currentUser, JSON.stringify(resp.user));
    this.currentUserSubject.next(resp.user);
  }
  private doLogoutUser(): void {
    this.removeToken();
  }
  private getRefreshToken(): string | null {
    return localStorage.getItem(this.TEXT.refreshToken);
  }

  private storeTokens(token: string, refresh: string) {
    localStorage.setItem(this.TEXT.jwtToken, token);
    localStorage.setItem(this.TEXT.refreshToken, refresh);
  }

  removeToken(): void {
    localStorage.removeItem(this.TEXT.jwtToken);
    localStorage.removeItem(this.TEXT.jwtToken);
    localStorage.removeItem(this.TEXT.currentUser);
    this.currentUserSubject.next({} as User);
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    return this.http.post<any>(this.urlRefreshToken, { refreshToken }).pipe(
      tap((res: any) => {
        this.storeTokens(res['data']['token'], res['data']['refreshToken']);
      })
    );
  }

  getIdentity(): string | null {
    return JSON.parse(localStorage.getItem(this.TEXT.currentUser)!)._id ?? null;
  }

  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem(this.TEXT.currentUser)!);
  }
}
