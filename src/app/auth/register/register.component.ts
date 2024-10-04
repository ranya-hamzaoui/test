import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from 'src/app/core/helpers/must-match.validator';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  title: string = 'SIGN UP';
  formRegister!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authservice: AuthService,
    private router: Router,
    private toastService: ToastrService
  ) {
    this.createFormRegister();
  }
  createFormRegister() {
    this.formRegister = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        phone: ['', Validators.required],
        job: ['', Validators.required],
        dateBirth: ['', Validators.required],
        gender: ['', Validators.required],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }
  get f() {
    return this.formRegister.controls;
  }

  register(): void {
    this.submitted = true;

    if (this.formRegister.invalid) {
      this.toastService.error(
        'Please fill in the form correctly',
        'Invalid Registration'
      );
      return;
    }
    this.authservice.Register(this.formRegister.value).subscribe(
      () => {
        this.toastService.success('Registration Successful', 'Welcome!');
        this.router.navigateByUrl('/');
      },
      (err) => {
        const errorMsg = err?.error?.message || 'Registration Failed !!!!!!!';
        console.log('errMsg', errorMsg);
        this.toastService.error('Registration Failed');
      }
    );
  }

  resetForm() {
    this.submitted = false;
    this.formRegister.reset();
  }
}
