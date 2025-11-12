import { Component } from '@angular/core';
import { BebidaListComponent } from '../../components/bebida-list/bebida-list.component';

@Component({
  selector: 'app-menu-page',
  standalone: true,
  imports: [BebidaListComponent],
  template: `
    <h1>Menú</h1>
    <app-bebida-list></app-bebida-list>
  `
})
export class MenuPageComponent {}
