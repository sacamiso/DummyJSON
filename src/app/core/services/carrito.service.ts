import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cart } from '../model/carro.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  apiUrl = environment.API_URL;


  constructor(private readonly http: HttpClient) { }

  getCartById(id: number): Observable<Cart> {
    return this.http.get<Cart>(`${this.apiUrl}/carts/${id}`);
  }
}
