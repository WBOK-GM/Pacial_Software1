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
  @Output() onDelete = new EventEmitter<string>();

  getIcon(): string {
    const name = this.bebida.name.toLowerCase();

    if (name.includes('café') || name.includes('americano')) return '☕';
    if (name.includes('cappuccino')) return '☕';
    if (name.includes('té') || name.includes('verde')) return '🍵';
    if (name.includes('jugo') || name.includes('naranja')) return '🥤';
    if (name.includes('smoothie') || name.includes('fresa')) return '🥤';
    
    return '🥤'; // Icono por defecto
  }

  onDeleteClick(): void {
    this.onDelete.emit(this.bebida.name);
  }
}
