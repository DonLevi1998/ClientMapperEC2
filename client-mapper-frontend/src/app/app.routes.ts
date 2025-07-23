import { Routes } from '@angular/router';

import { Login } from './login/login';
import { CreateUser } from './create-user/create-user';
import { MainMenu } from './main-menu/main-menu';
import { AdminMenu } from './admin-menu/admin-menu';
import { UsersComponent } from './users/users.component';
// Importa ProductsComponent y CategoryComponent cuando los crees

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'create-user', component: CreateUser },
  { path: 'main-menu', component: MainMenu },
  {
    path: 'admin-menu',
    component: AdminMenu,
    children: [
      { path: 'users', component: UsersComponent },
      // { path: 'products', component: ProductsComponent },
      // { path: 'category', component: CategoryComponent },
      { path: '', redirectTo: 'users', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
