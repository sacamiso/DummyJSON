import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserResponse } from '../model/user-response.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = environment.API_URL;

  constructor(private readonly http: HttpClient) { }

  getAllUsers(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/users`);
  }

}
