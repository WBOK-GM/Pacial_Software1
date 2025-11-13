import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BebidaService } from '../../services/bebida.service'; // Importa el servicio
import { Bebida } from '../../models/bebida.model';

@Component({
  selector: 'app-bebida-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bebida-form.component.html',
  styleUrls: ['./bebida-form.component.css']
})
export class BebidaFormComponent {
  nuevaBebida: Bebida = {
    name: '',
    description: '',
    price: 0,
    available: true,
    category: '',
    stock: 0
  };

  @Output() ngSubmitEvent = new EventEmitter<Bebida>();
  @Output() cancel = new EventEmitter<void>();

  constructor(private bebidaService: BebidaService) {}

  onSubmit() {
    this.bebidaService.createBebida(this.nuevaBebida).subscribe({
      next: (bebidaCreada) => {
        this.ngSubmitEvent.emit(bebidaCreada);
        // Limpia el formulario solo si fue exitoso
        this.nuevaBebida = {
          name: '',
          description: '',
          price: 0,
          available: true,
          category: '',
          stock: 0
        };
      },
      error: (error) => {
        alert('Error al agregar bebida');
        console.error(error);
      }
    });
  }

  onCancel() {
    this.cancel.emit();
  }
}
