import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { ProductResponse } from '../model/product-response.model';
import { Product } from '../model/product.model';



@Injectable({
  providedIn: 'root'
})

export class ProductService {

  apiUrl = environment.API_URL;

  constructor(private readonly http: HttpClient) { }

  getAllProducts(): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.apiUrl}/products`);
  }

  getProductsInterval(limit: number, skip: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.apiUrl}/products?limit=${limit}&skip=${skip}`);
  }

  searchProduct(term: string): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.apiUrl}/products/search?q=${term}`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  updateProduct(id: number, producto: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, producto);
  }

  addProduct(producto: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/products/add`, producto);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/products/${id}`);
  }

  getCategorias(): Observable<Array<string>> {
    return this.http.get<Array<string>>(`${this.apiUrl}/products/categories`);
  }

}