import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bebida-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bebida-form.component.html',
  styleUrls: ['./bebida-form.component.css']
})
export class BebidaFormComponent {
  nuevaBebida = {
    nombre: '',
    descripcion: '',
    precio: 0,
    disponible: true
  };

  onSubmit() {
    console.log('Bebida enviada:', this.nuevaBebida);
  }
}
