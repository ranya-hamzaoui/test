import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
    constructor(private toastr: ToastrService) {}

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
}
