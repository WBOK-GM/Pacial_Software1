import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BebidaCardComponent } from '../bebida-card/bebida-card.component';
import { BebidaService } from '../../services/bebida.service';
import { Bebida } from '../../models/bebida.model';

@Component({
  selector: 'app-bebida-list',
  standalone: true,
  imports: [CommonModule, BebidaCardComponent],
  templateUrl: './bebida-list.component.html',
  styleUrls: ['./bebida-list.component.css']
})
export class BebidaListComponent implements OnInit {
  bebidas: Bebida[] = [];

  constructor(private bebidaService: BebidaService) {}

  ngOnInit(): void {
    this.loadBebidas();
  }

  loadBebidas(): void {
    this.bebidaService.getBebidas().subscribe({
      next: (data) => {
        this.bebidas = data;
      },
      error: (error) => {
        console.error('Error cargando bebidas:', error);
      }
    });
  }

  deleteBebida(name: string): void {
    if (confirm('¿Estás seguro de eliminar esta bebida?')) {
      this.bebidaService.deleteBebida(name).subscribe({
        next: () => {
          this.bebidas = this.bebidas.filter(b => b.name !== name);
        },
        error: (error) => {
          console.error('Error eliminando bebida:', error);
        }
      });
    }
  }
}
