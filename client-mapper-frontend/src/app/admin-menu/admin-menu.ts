import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocalApiUsers } from '../../enviroments/enviroments';

import { User } from '../create-user/user.interface';
import { Product } from '../products/products.interface';
import { LocalApiProducts } from '../../enviroments/enviroments';
@Component({
  selector: 'app-admin-menu',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './admin-menu.html',
  styleUrls: ['./admin-menu.css']
})
export class AdminMenu implements OnInit {
  users: User[] = [];
  newUser: User = { name: '', email: '', telephone: '', address: '', password: '' };
  editUserData: User | null = null;
  showModal = false;
  showEditModal = false;
  errorMessage = '';
  successMessage = '';

  constructor() {
    this.loadUsers();
  }

  ngOnInit() {
    this.loadUsers();
  }

  async loadUsers() {
  try {
    const res = await fetch(LocalApiUsers.ApiListUser);
    this.users = await res.json();
  } catch {
    this.errorMessage = 'Error loading users.';
  }
}

  openModal() {
    this.showModal = true;
    this.errorMessage = '';
    this.newUser = { name: '', email: '', telephone: '', address: '', password: '' };
  }

  closeModal() {
    this.showModal = false;
  }

  async addUser() {
  try {
  const res = await fetch(LocalApiUsers.ApiCreateUser, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(this.newUser)
  });
  if (!res.ok) throw new Error();
  await this.loadUsers();
  this.closeModal();
  this.successMessage = 'User created successfully';
  setTimeout(() => this.successMessage = '', 3000);
  } catch {
  this.errorMessage = 'Error creating user.';
  }
  }

  async deleteUser(id: number | undefined) {
    if (!id) {
      this.errorMessage = '';
      return;
    }
    try {
      const res = await fetch(LocalApiUsers.ApiDeleteUser + id, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      await this.loadUsers();
      this.successMessage = 'User deleted successfully';
      setTimeout(() => this.successMessage = '', 3000);
    } catch {
      this.errorMessage = 'Error deleting user.';
    }
  }
  openEditModal(user: User) {
  this.editUserData = { ...user };
  this.showEditModal = true;
  this.errorMessage = '';
  this.successMessage = '';
}
closeEditModal() {
  this.showEditModal = false;
  this.editUserData = null;
}

  editUser(user: any) {
    this.editUserData = { ...user };
  }

  async updateUser() {
  if (!this.editUserData || !this.editUserData.idusers) {
  this.errorMessage = '';
  return;
  }
  try {
  const res = await fetch(LocalApiUsers.ApiUpdateUser + this.editUserData.idusers, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(this.editUserData)
  });
  if (!res.ok) throw new Error();
  await this.loadUsers();
  this.closeEditModal();
  this.successMessage = 'User updated successfully';
  setTimeout(() => this.successMessage = '', 3000);
  } catch {
  this.errorMessage = 'Error updating user.';
  }
  }

  cancelEdit() {
    this.editUserData = null;
  }

  // --- PRODUCTS ---
  products: Product[] = [];
  newProduct: Product = { name: '', description: '' };
  editProductData: Product | null = null;
  showProductModal = false;
  showEditProductModal = false;

  async loadProducts() {
    try {
      const res = await fetch(LocalApiProducts.ApiListProduct);
      this.products = await res.json();
    } catch {
      this.errorMessage = 'Error loading products.';
    }
  }

  openProductModal() {
    this.showProductModal = true;
    this.errorMessage = '';
    this.newProduct = { name: '', description: '' };
  }

  closeProductModal() {
    this.showProductModal = false;
  }

  async addProduct() {
    try {
      const res = await fetch(LocalApiProducts.ApiCreateProduct, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.newProduct)
      });
      if (!res.ok) throw new Error();
      await this.loadProducts();
      this.closeProductModal();
      this.successMessage = 'Product created successfully';
      setTimeout(() => this.successMessage = '', 3000);
    } catch {
      this.errorMessage = 'Error creating product.';
    }
  }

  async deleteProduct(id: number | undefined) {
    if (!id) {
      this.errorMessage = '';
      return;
    }
    try {
      const res = await fetch(LocalApiProducts.ApiDeleteProduct + id, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      await this.loadProducts();
      this.successMessage = 'Product deleted successfully';
      setTimeout(() => this.successMessage = '', 3000);
    } catch {
      this.errorMessage = 'Error deleting product.';
    }
  }

  openEditProductModal(product: Product) {
    this.editProductData = { ...product };
    this.showEditProductModal = true;
    this.errorMessage = '';
    this.successMessage = '';
  }

  closeEditProductModal() {
    this.showEditProductModal = false;
    this.editProductData = null;
  }

  async updateProduct() {
    if (!this.editProductData || !this.editProductData.id) {
      this.errorMessage = '';
      return;
    }
    try {
      const res = await fetch(LocalApiProducts.ApiUpdateProduct + this.editProductData.id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.editProductData)
      });
      if (!res.ok) throw new Error();
      await this.loadProducts();
      this.closeEditProductModal();
      this.successMessage = 'Product updated successfully';
      setTimeout(() => this.successMessage = '', 3000);
    } catch {
      this.errorMessage = 'Error updating product.';
    }
  }
}
