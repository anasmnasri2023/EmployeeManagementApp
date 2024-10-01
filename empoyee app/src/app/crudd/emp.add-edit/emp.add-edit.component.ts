import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp.add-edit.component.html',
  styleUrls: ['./emp.add-edit.component.css']
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;
  education: string[] = ['Matric', 'Diploma', 'Intermediate', 'Graduate', 'Post Graduate'];

  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.empForm = this._fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(10)]],
      lastName: ['', [Validators.required, Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      education: ['', Validators.required],
      company: ['', Validators.required],
      experience: ['', [Validators.required, Validators.min(0.1)]],
      package: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.empForm.patchValue(this.data);
    }
  }

  onFormSubmit(): void {
    if (this.empForm.valid) {
      const formData = this.empForm.value;

      if (this.data) {
        this._empService.updateEmployee(this.data.id, formData).subscribe({
          next: () => {
            Swal.fire({
              title: 'Update Success',
              text: 'Employee updated successfully!',
              icon: 'success'
            });
            this._dialogRef.close(true);
          },
          error: (err) => {
            console.error(err);
          }
        });
      } else {
        this._empService.addEmployee(formData).subscribe({
          next: () => {
            Swal.fire({
              title: 'Add Success',
              text: 'Employee added successfully!',
              icon: 'success'
            });
            this._dialogRef.close(true);
          },
          error: (err) => {
            console.error(err);
          }
        });
      }
    } else {
      let errorMessage = 'Please fill all required fields: \n';
      
      const formControls = this.empForm.controls;

      if (formControls['firstName'].invalid) {
        errorMessage += '- First Name is required and must be at most 10 characters long.\n';
      }
      if (formControls['lastName'].invalid) {
        errorMessage += '- Last Name is required and must be at most 10 characters long.\n';
      }
      if (formControls['email'].invalid) {
        errorMessage += '- Valid Email is required.\n';
      }
      if (formControls['dob'].invalid) {
        errorMessage += '- Date of Birth is required.\n';
      }
      if (formControls['gender'].invalid) {
        errorMessage += '- Gender is required.\n';
      }
      if (formControls['education'].invalid) {
        errorMessage += '- Education level is required.\n';
      }
      if (formControls['company'].invalid) {
        errorMessage += '- Company name is required.\n';
      }
      if (formControls['experience'].invalid) {
        errorMessage += '- Experience must be a positive number.\n';
      }
      if (formControls['package'].invalid) {
        errorMessage += '- Package must be a positive number.\n';
      }
  
      Swal.fire({
        title: 'Error',
        text: errorMessage,
        icon: 'error'
      });
    }
  }

  onCancel(): void {
    this._dialogRef.close(false);
  }
}
