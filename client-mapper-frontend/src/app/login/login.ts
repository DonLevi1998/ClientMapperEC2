import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class Login {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  async onSubmit(form: any) {
    console.log('[1] Form submitted', { email: this.email, password: '***' });

    if (!this.email || !this.password) {
      this.errorMessage = 'All fields are required.';
      console.log('[2] Validation failed: empty fields');
      return;
    }

    this.errorMessage = '';
    console.log('[3] Making login request to http://localhost:5030/login');

    try {
      const response = await fetch('http://localhost:5030/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: this.email, password: this.password }),
      });

      console.log('[4] Login response status:', response.status);

      if (response.status === 404) {
        this.errorMessage = "email don't exist";
        console.log('[5] Email not found');
        return;
      }

      if (response.status === 401) {
        this.errorMessage = 'password incorrect';
        console.log('[6] Invalid password');
        return;
      }

      if (!response.ok) {
        this.errorMessage = 'Login failed.';
        console.log('[7] General login failure', await response.text());
        return;
      }

      console.log('[8] Login successful, parsing response');
      const loginData = await response.json();
      console.log('[9] Login data received:', loginData);

      const userIdOrUsername = loginData.username || loginData.id || this.email;
      console.log('[10] Preparing to check role for:', userIdOrUsername);

      try {
        console.log(
          '[11] Making role request to http://localhost:5032/check-role'
        );
        const roleResponse = await fetch('http://localhost:5032/check-role', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${loginData.token}`,
          },
          body: JSON.stringify({ userIdOrUsername }),
        });

        console.log('[12] Role response status:', roleResponse.status);

        if (!roleResponse.ok) {
          this.errorMessage = 'No se pudo verificar el rol del usuario.';
          console.log('[13] Role check failed', await roleResponse.text());
          return;
        }

        const roleData = await roleResponse.json();
        console.log('[14] Role data received:', roleData);

        const { rol } = roleData;
        console.log('[15] User role determined:', rol);

        if (rol === 1) {
          console.log('[16] Navigating to admin menu');
          this.router.navigate(['/admin-menu']);
        } else if (rol === 0) {
          console.log('[17] Navigating to main menu');
          this.router.navigate(['/main-menu']);
        } else {
          this.errorMessage = 'Rol de usuario desconocido.';
          console.log('[18] Unknown role value:', rol);
        }
      } catch (err) {
        this.errorMessage = 'Error verificando el rol del usuario.';
        console.error('[19] Role check error:', err);
      }
    } catch (error) {
      this.errorMessage = 'Error connecting to the server.';
      console.error('[20] Login request failed:', error);
    }
  }

  goToCreateUser() {
    console.log('[21] Navigating to create-user');
    this.router.navigate(['/create-user']);
  }
}
