import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './common/pages/page-not-found/page-not-found.component';


export const routes: Routes = [
  { path: '', redirectTo: '/product-list', pathMatch: 'full' },
  {
    path: 'product-list',
    loadComponent: () => import('./product/pages/product-list/product-list.component').then((m) => m.ProductListComponent),
  },
  {
    path: 'product-edit',
    loadComponent: () => import('./product/pages/product-edit/product-edit.component').then((m) => m.ProductEditComponent)
  },
  { path: '**', component: PageNotFoundComponent }
];
