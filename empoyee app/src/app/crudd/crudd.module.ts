import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoMaterialModule } from '../demo-material-module';
import { CruddRoutes } from './crudd.routing';
import { RouterModule } from '@angular/router';
import { CrudComponent } from './crud/crud.component';
import { EmpAddEditComponent } from './emp.add-edit/emp.add-edit.component';

@NgModule({
  declarations: [
    CrudComponent,
    EmpAddEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    RouterModule.forChild(CruddRoutes),
  ]
})
export class CruddModule { }
