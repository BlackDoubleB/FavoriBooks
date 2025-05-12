import { Routes } from '@angular/router';
import LayoutComponent from './shared/components/layout/layout.component';
import { privateGuard, publicGuard } from './core/auth.guard';

export const routes: Routes = [
  {
    canActivateChild: [privateGuard()],
    path:'',
    component: LayoutComponent,
    loadChildren: () => import('./features/list/features.routes'),
  },
  {
    canActivateChild:[publicGuard()],
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes'),
  },
];
