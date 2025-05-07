import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/sign-in', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./pages/home/home.component') },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes'),
  },
];
