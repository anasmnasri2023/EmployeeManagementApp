import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  firstName: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    const isValidUser = this.authService.validateLogin(this.firstName, this.password);

    if (isValidUser) {
      Swal.fire({
        icon: 'success',
        title: 'Login successful!',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        this.router.navigate(['/dashboard']);
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid credentials',
        text: 'Please try again.'
      });
    }
  }

  goToRegister(): void {
    this.router.navigate(['/auth/register']); 
  }

  goToForgotPassword(): void {
    this.router.navigate(['/auth/forgot']);
  }
}
