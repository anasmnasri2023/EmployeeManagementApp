import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from '../emp.add-edit/emp.add-edit.component';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'package',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _empService: EmployeeService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getEmployeeList();
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }

  getEmployeeList() {
    this._empService.getEmployeeList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.error,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    const numericFilter = parseFloat(filterValue.replace(/[^\d.-]/g, ''));
  
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const packageString = data.package.toString().toLowerCase();
      const formattedDate = this.formatDate(data.dob);
      const fullString = `${data.id} ${data.firstName} ${data.lastName} ${data.email} ${formattedDate} ${data.gender} ${data.education} ${data.company} ${data.experience} ${packageString}`.toLowerCase();
  
      const filterDateParts = filter.split('/');
      if (filterDateParts.length === 3) {
        const filterDate = new Date(`${filterDateParts[2]}-${filterDateParts[1]}-${filterDateParts[0]}`);
        if (!isNaN(filterDate.getTime())) {
          return (
            fullString.includes(filter) ||
            data.package === numericFilter ||
            this.isSameDate(new Date(data.dob), filterDate)
          );
        }
      }
  
      return fullString.includes(filter) || data.package === numericFilter;
    };
  
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  isSameDate(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  }
  

  deleteEmployee(id: number) {
    this._empService.deleteEmployee(id).subscribe({
      next: (res) => {
        this._snackBar.open('Employee has been deleted.', 'Close', {
          duration: 3000,
          panelClass: 'green-snackbar' 
        });
        this.getEmployeeList();
      },
      error: (err) => {
        this._snackBar.open('Failed to delete the employee.', 'Close', {
          duration: 3000,
          panelClass: 'red-snackbar'
        });
      },
    });
  }
  

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(EmpAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }

  openDetails(data: any) {
    Swal.fire({
      title: 'Employee Details',
      html: `
        <div style="display: flex; flex-wrap: wrap;">
          <div style="flex: 1 1 50%;">
            <strong>ID:</strong> ${data.id}<br>
            <strong>First Name:</strong> ${data.firstName}<br>
            <strong>Last Name:</strong> ${data.lastName}<br>
            <strong>Email:</strong> ${data.email}<br>
          </div>
          <div style="flex: 1 1 50%;">
            <strong>Date of Birth:</strong> ${this.formatDate(data.dob)}<br>
            <strong>Gender:</strong> ${data.gender}<br>
            <strong>Education:</strong> ${data.education}<br>
            <strong>Company:</strong> ${data.company}<br>
          </div>
          <div style="flex: 1 1 50%;">
            <strong>Experience:</strong> ${data.experience}<br>
            <strong>Package:</strong> ${this.formatCurrency(data.package)}
          </div>
        </div>
      `,
      icon: 'info'
    });
  }

  private formatDate(date: any): string {
    if (!date) return '';

    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  private formatCurrency(amount: number): string {
    return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }
}
