import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserResponse } from '../model/user-response.model';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = environment.API_URL;

  constructor(private readonly http: HttpClient) { }

  getAllUsers(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/users`);
  }

  getUsersInterval(limit: number, skip: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/users?limit=${limit}&skip=${skip}`);
  }

  searchUser(paramBusqueda: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/users/search?q=${paramBusqueda}`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  updateUser(id: number, usuario: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${id}`, usuario);
  }

  addUser(usuario: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users/add`, usuario);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/users/${id}`);
  }
}
