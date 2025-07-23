import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMenu } from './admin-menu/admin-menu';
import { UsersComponent } from './users/users.component';
// Importa ProductsComponent y CategoryComponent cuando los crees

const routes: Routes = [
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
  { path: '', redirectTo: '/admin-menu', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
