import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  newPassword: string = '';
  confirmNewPassword: string = '';

  constructor(private router: Router) {}

  resetPassword(): void {
    // Check if newPassword matches confirmNewPassword
    if (this.newPassword === this.confirmNewPassword) {
      Swal.fire({
        icon: 'success',
        title: 'Password Reset Successful!',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        // Navigate to login page
        this.router.navigate(['/auth/login']);
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Passwords do not match',
        text: 'Please make sure your passwords match.'
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/auth/login']);
  }
}
