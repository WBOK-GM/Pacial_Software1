import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BebidaFormComponent } from '../../components/bebida-form/bebida-form.component';
import { BebidaListComponent } from '../../components/bebida-list/bebida-list.component';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule, BebidaFormComponent, BebidaListComponent],
  template: `
    <h1>Administrar Bebidas</h1>
    <app-bebida-form></app-bebida-form>
    <app-bebida-list></app-bebida-list>
  `
})
export class AdminPageComponent {}
