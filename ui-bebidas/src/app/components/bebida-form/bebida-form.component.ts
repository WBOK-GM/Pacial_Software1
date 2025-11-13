import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
    available: true
  };

  onSubmit() {
    console.log('Bebida enviada:', this.nuevaBebida);
  }
}
