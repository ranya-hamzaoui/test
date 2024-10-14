import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

class MockAuthService {
  Register = jasmine.createSpy('Register').and.returnValue(of({}));
}

class MockToastrService {
  success = jasmine.createSpy('success');
  error = jasmine.createSpy('error');
}

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockAuthService: MockAuthService;
  let mockToastrService: MockToastrService;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([{ path: '', component: RegisterComponent }]), // Fix route configuration
      ],
      declarations: [RegisterComponent],
      providers: [
        FormBuilder,
        { provide: AuthService, useClass: MockAuthService },
        { provide: ToastrService, useClass: MockToastrService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    mockAuthService = TestBed.inject(AuthService) as unknown as MockAuthService ;
    mockToastrService = TestBed.inject(ToastrService) as unknown as MockToastrService;
    router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl'); // Spy on router navigation
    fixture.detectChanges();
  });
  it('should create the form with 8 controls', () => {
    expect(component.formRegister.contains('name')).toBeTruthy();
    expect(component.formRegister.contains('email')).toBeTruthy();
    expect(component.formRegister.contains('password')).toBeTruthy();
    expect(component.formRegister.contains('confirmPassword')).toBeTruthy();
    expect(component.formRegister.contains('phone')).toBeTruthy();
    expect(component.formRegister.contains('job')).toBeTruthy();
    expect(component.formRegister.contains('dateBirth')).toBeTruthy();
    expect(component.formRegister.contains('gender')).toBeTruthy();
  });
  it('should make the name control required', () => {
    const control = component.formRegister.get('name');
    control?.setValue('');
    expect(control?.valid).toBeFalse();
  });
  it('should call Register method and navigate on successful registration', () => {
    //Rendre le formulaire valide
    component.formRegister.setValue({
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
    confirmPassword: 'password123',
    phone: '123456789',
    job: 'Developer',
    dateBirth: '1990-01-01',
    gender: 'Male',
    });
    component.register();
    expect(mockAuthService.Register).toHaveBeenCalled();
    expect(mockToastrService.success).toHaveBeenCalledWith('Registration Successful', 'Welcome!');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/');
  });
  it('should show error toast on registration failure', () => {
    //Fill with the same user for fire error server 
    component.formRegister.setValue({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        phone: '123456789',
        job: 'Developer',
        dateBirth: '1990-01-01',
        gender: 'Male',
    });
    mockAuthService.Register.and.returnValue(throwError({ error: { message: 'Registration failed' } }));
    component.register();
    expect(mockToastrService.error).toHaveBeenCalledWith('Registration Failed');
  });
  it('should reset the form', () => {
    component.resetForm();
    expect(component.submitted).toBeFalse();
    expect(component.formRegister.value).toEqual({
      name: null ,
      email: null ,
      password: null ,
      confirmPassword: null ,
      phone: null ,
      job: null ,
      dateBirth: null ,
      gender: null ,
    });
  });
  it('should show error toast if the form is invalid', () => {
    component.formRegister.get('name')?.setValue('');
    component.register();
    expect(mockToastrService.error).toHaveBeenCalledWith(
      'Please fill in the form correctly',
      'Invalid Registration'
    );
  });
});
