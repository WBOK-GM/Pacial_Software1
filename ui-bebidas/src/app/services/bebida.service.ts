import { Injectable } from '@angular/core';
import { Bebida } from '../models/bebida.model';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BebidaService {
  private bebidas: Bebida[] = [
    { id: 1, nombre: 'Agua', descripcion: 'Agua mineral', precio: 15, disponible: true },
    { id: 2, nombre: 'Coca-Cola', descripcion: 'Bebida gaseosa', precio: 30, disponible: true }
  ];

  getBebidas(): Observable<Bebida[]> {
    return of(this.bebidas);
  }
  addBebida(bebida: Bebida): void {
    this.bebidas.push(bebida);
  }
}
