import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthentificationRoutes } from './authentification.routing';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DemoMaterialModule } from '../demo-material-module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    RouterModule.forChild(AuthentificationRoutes),
  ]
})
export class AuthentificationModule { }
