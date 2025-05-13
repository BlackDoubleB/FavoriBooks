import { Routes } from '@angular/router';

export default [
  { path: 'home', loadComponent: () => import('../home/home.component') },

  {
    path: 'lists',
    loadComponent: () => import('./main-list/list.component'),
    children: [
      {
        path: 'new',
        loadComponent: () => import('./form/form.component'),
      },
      {
        path: 'edit/:idList',
        loadComponent: () => import('./form/form.component'),
      },
    ],
  },
  { path: 'search', loadComponent: () => import('../book-search/book-search.component') },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  
] as Routes;
