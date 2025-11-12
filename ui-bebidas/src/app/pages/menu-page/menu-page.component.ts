import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BebidaListComponent } from '../../components/bebida-list/bebida-list.component';

@Component({
  selector: 'app-menu-page',
  standalone: true,
  imports: [CommonModule, BebidaListComponent],
  template: `
    <div class="menu-container">
      <div class="menu-header">
        <div>
          <h1>Catálogo de Bebidas</h1>
          <p>Selecciona tus bebidas favoritas del menú</p>
        </div>
        <button class="btn-add">+ Agregar Nueva</button>
      </div>
      <app-bebida-list></app-bebida-list>
    </div>
  `,
  styles: [`
    .menu-container {
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    .menu-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    h1 {
      font-size: 2rem;
      font-weight: bold;
      margin: 0;
      color: #1a1a1a;
    }

    .menu-header p {
      color: #666;
      margin: 0.5rem 0 0 0;
    }

    .btn-add {
      background-color: #000;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 500;
      transition: background-color 0.2s;
    }

    .btn-add:hover {
      background-color: #333;
    }
  `]
})
export class MenuPageComponent {}
