import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  dob: Date | null = null;
  gender: string = '';
  education: string = '';
  company: string = '';
  experience: string = ''; 
  package: string = '';
  password: string = '';

  educationOptions: string[] = ['Matric', 'Diploma', 'Intermediate', 'Graduate', 'Post Graduate'];

  constructor(private authService: AuthService, private employeeService: EmployeeService, private router: Router) {}

  register() {
    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      dob: this.dob,
      gender: this.gender,
      education: this.education,
      company: this.company,
      experience: this.experience, 
      package: this.package, 
      password: this.password
    };

    if (this.isFormValid()) {
      this.authService.register(user);
      this.employeeService.addEmployee(this.getEmployeeData(user)).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'You have successfully registered!'
        }).then(() => {
          this.router.navigate(['/auth/login']);
        });
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: 'Please fill in all required fields.'
      });
    }
  }

  cancel() {
    this.router.navigate(['/auth/login']);
  }

  private isFormValid(): boolean {
    return (
      this.firstName !== '' &&
      this.lastName !== '' &&
      this.email !== '' &&
      this.dob !== null &&
      this.gender !== '' &&
      this.education !== '' &&
      this.company !== '' &&
      this.experience !== '' &&
      this.package !== '' &&
      this.password !== ''
    );
  }

  private getEmployeeData(user: any) {
    const { password, ...employeeData } = user;
    return employeeData;
  }
}
