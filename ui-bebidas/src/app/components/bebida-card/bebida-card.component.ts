import { Component, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-bebida-card',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './bebida-card.component.html',
  styleUrls: ['./bebida-card.component.css']
})
export class BebidaCardComponent {
  @Input() bebida: any;
}
