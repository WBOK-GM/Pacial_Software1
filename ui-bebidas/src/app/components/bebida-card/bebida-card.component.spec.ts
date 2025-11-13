import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BebidaCardComponent } from './bebida-card.component';
import { Bebida } from '../../models/bebida.model';

describe('BebidaCardComponent', () => {
  let component: BebidaCardComponent;
  let fixture: ComponentFixture<BebidaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BebidaCardComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BebidaCardComponent);
    component = fixture.componentInstance;
    component.bebida = {
      name: 'Café Americano',
      description: 'Café clásico',
      price: 2.5,
      available: true,
      category: 'cafe',
      stock: 10
    };
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
    expect(component.bebida.name).toBe('Café Americano');
  });

  it('should emit onDelete with bebida name when onDeleteClick called', () => {
    spyOn(component.onDelete, 'emit');
    component.onDeleteClick();
    expect(component.onDelete.emit).toHaveBeenCalledWith('Café Americano');
  });

  it('should return ☕ icon for café', () => {
    component.bebida.name = 'Café Americano';
    expect(component.getIcon()).toBe('☕');
    component.bebida.name = 'Cappuccino';
    expect(component.getIcon()).toBe('☕');
  });

  it('should return 🍵 icon for té', () => {
    component.bebida.name = 'Té Verde';
    expect(component.getIcon()).toBe('🍵');
  });

  it('should return 🥤 icon for jugo or smoothie', () => {
    component.bebida.name = 'Jugo de naranja';
    expect(component.getIcon()).toBe('🥤');
    component.bebida.name = 'Smoothie de fresa';
    expect(component.getIcon()).toBe('🥤');
  });

  it('should return default 🥤 icon for unknown bebida', () => {
    component.bebida.name = 'Refresco';
    expect(component.getIcon()).toBe('🥤');
  });
});
