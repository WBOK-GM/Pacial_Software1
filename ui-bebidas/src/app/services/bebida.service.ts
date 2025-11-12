import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bebida } from '../models/bebida.model';

@Injectable({
  providedIn: 'root'
})
export class BebidaService {
  private apiUrl = 'http://localhost:8080/api/bebidas'; // Ajusta según tu backend

  constructor(private http: HttpClient) {}

  getBebidas(): Observable<Bebida[]> {
    return this.http.get<Bebida[]>(this.apiUrl);
  }

  getBebida(id: number): Observable<Bebida> {
    return this.http.get<Bebida>(`${this.apiUrl}/${id}`);
  }

  createBebida(bebida: Bebida): Observable<Bebida> {
    return this.http.post<Bebida>(this.apiUrl, bebida);
  }

  updateBebida(id: number, bebida: Bebida): Observable<Bebida> {
    return this.http.put<Bebida>(`${this.apiUrl}/${id}`, bebida);
  }

  deleteBebida(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
