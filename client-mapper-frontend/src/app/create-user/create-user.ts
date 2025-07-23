import { Component } from '@angular/core';
import { User } from './user.interface';
import { LocalApiUsers } from '../../enviroments/enviroments';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  imports: [FormsModule, CommonModule],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUser {
  user: User = {
    name: '',
    email: '',
    telephone: '',
    password: '',
    address: ''
  };
  constructor(private router: Router) {}
  confirmPassword: string = '';
  errorMessage: string = '';

  async onSubmit(form: any) {
    if (!form.valid) {
      this.errorMessage = 'All fields are required.';
      return;
    }
    if (this.user.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords are not the same.';
      return;
    }
    this.errorMessage = '';
    // Call backend API
    try {
      const response = await fetch(`${LocalApiUsers.ApiCreateUser}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.user)
      });
      if (!response.ok) {
        this.errorMessage = 'Failed to create user.';
        return;
      }
      // Optionally, redirect or show success message
      alert('User created successfully!');
      form.resetForm();
      this.confirmPassword = '';
    } catch (error) {
      this.errorMessage = 'Error connecting to the server.';
    }
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
