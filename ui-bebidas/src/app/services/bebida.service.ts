import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bebida } from '../models/bebida.model';

@Injectable({
  providedIn: 'root'
})
export class BebidaService {
  private apiUrl = 'http://localhost:8000/menu'; // ✅ API de bebidas FastAPI

  constructor(private http: HttpClient) {}

  getBebidas(): Observable<Bebida[]> {
    return this.http.get<Bebida[]>(this.apiUrl);
  }

  getBebida(nombre: string): Observable<Bebida> {
    return this.http.get<Bebida>(`${this.apiUrl}/${nombre}`);
  }

  createBebida(bebida: Bebida): Observable<Bebida> {
    return this.http.post<Bebida>(this.apiUrl, bebida);
  }

  updateBebida(nombre: string, bebida: Partial<Bebida>): Observable<Bebida> {
    return this.http.put<Bebida>(`${this.apiUrl}/${nombre}`, bebida);
  }

  deleteBebida(nombre: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${nombre}`);
  }
}
