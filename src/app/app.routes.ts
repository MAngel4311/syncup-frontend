import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { RegistroWizard } from './auth/registro-wizard/registro-wizard';
import { LoginSuccessComponent } from './auth/login-success/login-success';
import { Layout } from './layout/layout';
import { authGuard } from './security/auth-guard';
import { OnboardingLayout } from './onboarding/onboarding-layout/onboarding-layout';

import { Home } from './pages/home/home';
import { SearchComponent } from './pages/search/search';
import { LibraryComponent } from './pages/library/library';

import { adminAuthGuard } from './security/admin-auth.guard';
import { AdminLayoutComponent } from './admin/admin-layout';
import { ManageUsersComponent } from './admin/manage-users/manage-users';
import { ManageSongsComponent } from './admin/manage-songs';
import { AdminDashboardComponent } from './admin/admin-dashboard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'registro', component: RegistroWizard },
  { path: 'login-success', component: LoginSuccessComponent },
  
  { 
    path: 'bienvenido', 
    component: OnboardingLayout, 
    canActivate: [authGuard] 
  },
  
  { 
    path: 'dashboard', 
    component: Layout, 
    canActivate: [authGuard],
    children: [
      { path: 'home', component: Home },
      { path: 'search', component: SearchComponent },
      { path: 'library', component: LibraryComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },

  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [authGuard, adminAuthGuard],
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'users', component: ManageUsersComponent },
      { path: 'songs', component: ManageSongsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];