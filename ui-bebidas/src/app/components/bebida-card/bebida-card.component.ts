import { Component, Input } from '@angular/core';
import { Bebida } from '../../models/bebida.model';

@Component({
  selector: 'app-bebida-card',
  templateUrl: './bebida-card.component.html',
  styleUrls: ['./bebida-card.component.css']
})
export class BebidaCardComponent {
  @Input() bebida!: Bebida;
}
