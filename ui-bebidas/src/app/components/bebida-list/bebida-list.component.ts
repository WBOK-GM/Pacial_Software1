import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BebidaCardComponent } from '../bebida-card/bebida-card.component';

@Component({
  selector: 'app-bebida-list',
  standalone: true,
  imports: [CommonModule, BebidaCardComponent],
  templateUrl: './bebida-list.component.html',
  styleUrls: ['./bebida-list.component.css']
})
export class BebidaListComponent {
  bebidas = [
    { nombre: 'Coca-Cola', precio: 3000, disponible: true },
    { nombre: 'Jugo de Naranja', precio: 2500, disponible: false },
  ];
}
