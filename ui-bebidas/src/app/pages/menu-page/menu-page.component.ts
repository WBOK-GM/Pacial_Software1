import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BebidaListComponent } from '../../components/bebida-list/bebida-list.component';
import { BebidaFormComponent } from '../../components/bebida-form/bebida-form.component';
import { Bebida } from '../../models/bebida.model';

@Component({
  selector: 'app-menu-page',
  standalone: true,
  imports: [CommonModule, BebidaListComponent, BebidaFormComponent],
  template: `
    <div class="menu-container">
      <div class="menu-header">
        <div>
          <h1>Catálogo de Bebidas</h1>
          <p>Selecciona tus bebidas favoritas del menú</p>
        </div>
        <button class="btn-add" (click)="toggleForm()">
          {{ showForm ? 'Cerrar' : '+ Agregar Nueva' }}
        </button>
      </div>
      <app-bebida-form 
        *ngIf="showForm" 
        (ngSubmitEvent)="onNuevaBebida($event)"
        (cancel)="toggleForm()"
      ></app-bebida-form>
      <app-bebida-list #lista></app-bebida-list>
    </div>
  `,
  styles: [`
    .menu-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
    }
    .menu-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    .menu-header h1 {
      margin: 0;
      font-size: 2rem;
    }
    .menu-header p {
      margin: 0.5rem 0 0 0;
      color: #666;
    }
    .btn-add {
      background: #000;
      color: #fff;
      border: none;
      border-radius: 8px;
      padding: 0.6rem 1.2rem;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.16s;
    }
    .btn-add:hover {
      background: #333;
    }
  `]
})
export class MenuPageComponent implements AfterViewInit {
  showForm = false;

  @ViewChild(BebidaListComponent) bebidaList!: BebidaListComponent;

  ngAfterViewInit() {
    // Aquí puedes hacer algo cuando la vista esté lista, si necesitas
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  onNuevaBebida(nuevaBebida: Bebida) {
    this.showForm = false;
    this.bebidaList.loadBebidas();
  }
}
