import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-forget-passwd',
  templateUrl: './forget-passwd.component.html',
  styleUrls: ['./forget-passwd.component.scss'],
})
export class ForgetPasswdComponent {
  email: string = '';
  loading: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  reset() {
    if (!this.email) {
      this.toastrService.error(
        'Please provide a valid email address.',
        'Invalid Request'
      );
      return;
    }

    this.loading = true;

    this.authService.forgetPass({ email: this.email }).subscribe(
      () => {
        this.loading = false;
        this.toastrService.success(
          'Please check your email for reset instructions.',
          'Reset Email Sent'
        );
        this.router.navigate(['/']); // Redirect to login after success
      },
      (err: any) => {
        this.loading = false;
        console.log(err?.error?.message || 'Reset request failed.', 'Error');
      }
    );
  }
}
