import { Component, Input } from '@angular/core';
import { Bebida } from '../../models/bebida.model';

@Component({
  selector: 'app-bebida-list',
  templateUrl: './bebida-list.component.html',
  styleUrls: ['./bebida-list.component.css']
})
export class BebidaListComponent {
  @Input() bebidas: Bebida[] = [];
}
