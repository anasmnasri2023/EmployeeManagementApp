import { Routes } from '@angular/router';
import { CrudComponent } from './crud/crud.component';
import { EmpAddEditComponent } from './emp.add-edit/emp.add-edit.component';



export const CruddRoutes: Routes = [{
  path: 'crud',
  component:CrudComponent
},
{
  path:'ajout',
  component:EmpAddEditComponent
}];
