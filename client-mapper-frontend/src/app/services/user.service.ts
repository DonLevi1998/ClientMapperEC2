import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalApiUsers } from '../../enviroments/enviroments';
import { User } from '../create-user/user.interface';

@Injectable({ providedIn: 'root' })
export class UserService {
  private ApiCreateUser = LocalApiUsers.ApiCreateUser; 
  private ApiDeleteUser = LocalApiUsers.ApiDeleteUser;
  private ApiUpdateUser = LocalApiUsers.ApiUpdateUser;
  private ApiListUser = LocalApiUsers.ApiListUser;
  private ApiFindUser = LocalApiUsers.ApiFindUser;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.ApiListUser);
  }

  createUser(user: User) {
    return this.http.post<User>(LocalApiUsers.ApiCreateUser, user);
  }

  updateUser(id: number, user: User) {
    return this.http.put<User>(`${LocalApiUsers.ApiUpdateUser}/${id}`, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${LocalApiUsers.ApiDeleteUser}/${id}`);
  }

  findUserByEmail(email: string) {
    return this.http.get<User>(`${LocalApiUsers.ApiFindUser}?email=${email}`);
  }
}
