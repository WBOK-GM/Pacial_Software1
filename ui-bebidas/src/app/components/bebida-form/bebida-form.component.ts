import { Component, Output, EventEmitter } from '@angular/core';
import { Bebida } from '../../models/bebida.model';

@Component({
  selector: 'app-bebida-form',
  templateUrl: './bebida-form.component.html',
  styleUrls: ['./bebida-form.component.css']
})
export class BebidaFormComponent {
  nuevaBebida: Bebida = { id: 0, nombre: '', descripcion: '', precio: 0, disponible: true };
  @Output() agregar = new EventEmitter<Bebida>();

  onSubmit() {
    this.agregar.emit(this.nuevaBebida);
    this.nuevaBebida = { id: 0, nombre: '', descripcion: '', precio: 0, disponible: true };
  }
}
