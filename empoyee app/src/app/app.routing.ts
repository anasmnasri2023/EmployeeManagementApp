import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { BlancComponent } from './layouts/full/blanc/blanc.component';


export const AppRoutes: Routes = [
  
    {
      path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren:
          () => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: '',
        loadChildren: () => import('./crudd/crudd.module').then(m => m.CruddModule)
      }
    ]
  },
    {
      path:'auth',
      component: BlancComponent,
      children:[

        {
          path: '',
          loadChildren: () => import('./authentification/authentification.module').then(m => m.AuthentificationModule)
        },
      ]      
    },
    
    { path: 'logout', redirectTo: '/auth/login', pathMatch: 'full' }  ,
    { path: 'prof', redirectTo: '/dashboard/prof', pathMatch: 'full' }  

];
