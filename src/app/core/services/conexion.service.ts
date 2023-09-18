import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EstadoApi } from '../model/estadoApi.model';

@Injectable({
  providedIn: 'root'
})
export class ConexionService {

  apiUrl = environment.API_URL;

  constructor(private readonly http: HttpClient) { }

  compruebaEstado(): Observable<EstadoApi>{
    return this.http.get<EstadoApi>(`${this.apiUrl}/test`);
  }
}
