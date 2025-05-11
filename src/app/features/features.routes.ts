import { Routes } from '@angular/router';

export default [
  { path: 'home', loadComponent: () => import('./home/home.component') },
  {
    path: 'list',
    loadComponent: () => import('./list/list.component'),
    loadChildren: () => import('../shared/shared.routes')
    
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
] as Routes;
