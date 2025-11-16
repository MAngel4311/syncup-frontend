import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { RegistroWizard } from './auth/registro-wizard/registro-wizard';
import { LoginSuccessComponent } from './auth/login-success/login-success';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'registro', component: RegistroWizard },
  { path: 'login-success', component: LoginSuccessComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];