import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing'; // Import RouterTestingModule
import { ToastrService } from 'ngx-toastr';
import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { HomeComponent } from 'src/app/main/home/home.component';

const mockRoutes = [
  { path: 'home', component: HomeComponent }
]
class MockAuthService {
  Login = jasmine.createSpy('Login').and.returnValue(of({ success: true }));
}
class MockToastrService {
  success = jasmine.createSpy('success');
  error = jasmine.createSpy('error');
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: MockAuthService;
  let toastrService: MockToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(mockRoutes), // Mock routes for testing
      ],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: ToastrService, useClass: MockToastrService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as unknown as MockAuthService; 
    toastrService = TestBed.inject(ToastrService) as unknown as MockToastrService; 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call Login on AuthService and navigate on success', () => {
    component.login();
    expect(authService.Login).toHaveBeenCalledWith(component.formLogin.value);
    expect(toastrService.success).toHaveBeenCalledWith(
      'Authentification with Sucess',
      'Login Succes'
    );
  });

  it('should show error message when credentials are invalid', () => {
    component.formLogin.controls['email'].setValue('');
    component.login();
    expect(toastrService.error).toHaveBeenCalledWith(
      'Please enter valid login credentials',
      'Invalid Request'
    );
  });

  it('should handle login failure', () => {
    authService.Login.and.returnValue(throwError(() => new Error('Login failed')));
    component.login();
    expect(toastrService.error).toHaveBeenCalledWith(
      'Authentification Failed',
      'Login Failed'
    );
  });

  afterEach(() => {
    authService.Login.calls.reset();
    toastrService.success.calls.reset();
    toastrService.error.calls.reset();
  });
});
