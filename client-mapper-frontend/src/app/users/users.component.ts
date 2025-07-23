import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { User } from '../create-user/user.interface';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error = '';

  // Para el formulario de crear/editar
  formUser: User = { name: '', email: '', telephone: '', password: '', address: '' };
  editing: boolean = false;
  editingId: number | null = null;
  searchEmail: string = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (data: User[]) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error fetching users';
        this.loading = false;
      }
    });
  }

  submitUser() {
    if (this.editing && this.editingId !== null) {
      this.userService.updateUser(this.editingId, this.formUser).subscribe(() => {
        this.fetchUsers();
        this.resetForm();
      });
    } else {
      this.userService.createUser(this.formUser).subscribe(() => {
        this.fetchUsers();
        this.resetForm();
      });
    }
  }

  editUser(user: User, id: number) {
    this.formUser = { ...user };
    this.editing = true;
    this.editingId = id;
  }

  deleteUser(id: number) {
    if (confirm('¿Seguro que deseas eliminar este usuario?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.fetchUsers();
      });
    }
  }

  findUser() {
    if (!this.searchEmail) return;
    this.userService.findUserByEmail(this.searchEmail).subscribe({
      next: (user) => {
        this.users = user ? [user] : [];
      },
      error: () => {
        this.error = 'Usuario no encontrado';
        this.users = [];
      }
    });
  }

  resetForm() {
    this.formUser = { name: '', email: '', telephone: '', password: '', address: '' };
    this.editing = false;
    this.editingId = null;
  }
}
