import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-reset-passwd',
  templateUrl: './reset-passwd.component.html',
  styleUrls: ['./reset-passwd.component.scss'],
})
export class ResetPasswdComponent {
  resetLink: string = '';
  newPass: string = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService

  ) {
    this.activatedRoute.params.subscribe((params: any) => {
      this.resetLink = params["resetLink"];
    });
  }

  newPassword() {
    if (!this.newPass) {
      this.toastr.error('Password is required', 'Invalid Input');
      return;
    }

    let data = {
      resetLink: this.resetLink,
      newPass: this.newPass,
    };

    this.authService.resetPassword(this.resetLink, this.newPass).subscribe(
      (res: any) => {
        this.toastr.success('Password reset successfully!', 'Success');
        this.router.navigateByUrl('/login');
      },
      (err) => {
       console.log(err.error.message || 'Failed to reset password', 'Error');
      }
    );
  }
}
