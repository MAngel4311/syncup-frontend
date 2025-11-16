import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { RegistroWizard } from './auth/registro-wizard/registro-wizard';
import { LoginSuccessComponent } from './auth/login-success/login-success';
import { Layout } from './layout/layout';
import { authGuard } from './security/auth-guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'registro', component: RegistroWizard },
  { path: 'login-success', component: LoginSuccessComponent },
  
  { 
    path: 'dashboard', 
    component: Layout, 
    canActivate: [authGuard] 
  },
  
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];