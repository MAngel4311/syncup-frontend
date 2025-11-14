import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { RegistroWizard } from './auth/registro-wizard/registro-wizard';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'registro', component: RegistroWizard },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];