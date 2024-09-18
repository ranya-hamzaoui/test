import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  submitted: boolean = false;
  Loading: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private authservice: AuthService,
    private router: Router,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      email: ['nadine@gmail.com', [Validators.required, Validators.email]],
      password: ['rania20', [Validators.required]],
    });
  }

  login(): void {
    this.submitted = true;

    if (this.formLogin.invalid) {
      this.Loading = false;
      this.toastService.error(
        'Please enter valid login credentials',
        'Invalid Request'
      );
      return;
    }
    this.Loading = true;
    this.authservice.Login(this.formLogin.value).subscribe(
      () => {
        this.router.navigateByUrl('/home');
        this.toastService.success(
          'Authentification with Sucess',
          'Login Succes'
        );
      },
      (err: unknown) => {
        console.log('err loginnnnnnnnnn', err);
        this.toastService.error('Authentification Failed', 'Login Failed');
      }
    );
  }

  onReset() {
    this.submitted = false;
    this.formLogin.reset();
  }
  get f() {
    return this.formLogin.controls;
  }
}
