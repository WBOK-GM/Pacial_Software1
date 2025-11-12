import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Bebida } from '../../models/bebida.model';

@Component({
  selector: 'app-bebida-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bebida-card.component.html',
  styleUrls: ['./bebida-card.component.css']
})
export class BebidaCardComponent {
  @Input() bebida!: Bebida;
  @Output() onDelete = new EventEmitter<number>();

  getIcon(): string {
    const nombre = this.bebida.nombre.toLowerCase();
    
    if (nombre.includes('café') || nombre.includes('americano')) return '☕';
    if (nombre.includes('cappuccino')) return '☕';
    if (nombre.includes('té') || nombre.includes('verde')) return '🍵';
    if (nombre.includes('jugo') || nombre.includes('naranja')) return '🥤';
    if (nombre.includes('smoothie') || nombre.includes('fresa')) return '🥤';
    
    return '🥤'; // Icono por defecto
  }

  onDeleteClick(): void {
    this.onDelete.emit(this.bebida.id);
  }
}
