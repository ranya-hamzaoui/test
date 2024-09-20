import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ForgetPasswdComponent } from './forget-passwd/forget-passwd.component';
import { ResetPasswdComponent } from './reset-passwd/reset-passwd.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgetPasswdComponent,
    ResetPasswdComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class AuthModule {}
