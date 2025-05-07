import { Routes } from '@angular/router';

export default [
  { path: 'sign-in', loadComponent: () => import('./component/sign-in/sign-in.component') },
  { path: 'sign-up', loadComponent: () => import('./component/sign-up/sign-up.component') },
  
] as Routes;
