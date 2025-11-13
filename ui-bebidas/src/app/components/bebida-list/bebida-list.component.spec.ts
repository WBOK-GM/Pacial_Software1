import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BebidaListComponent } from './bebida-list.component';
import { BebidaService } from '../../services/bebida.service';
import { of, throwError } from 'rxjs';
import { BebidaCardComponent } from '../bebida-card/bebida-card.component';
import { By } from '@angular/platform-browser';

describe('BebidaListComponent', () => {
  let component: BebidaListComponent;
  let fixture: ComponentFixture<BebidaListComponent>;
  let bebidaServiceMock: jasmine.SpyObj<BebidaService>;
  const mockBebidas = [
    { name: 'Café Americano', description: '', price: 2.5, available: true, category: 'cafe', stock: 2 },
    { name: 'Latte', description: '', price: 4, available: true, category: 'cafe', stock: 1 }
  ];

  beforeEach(async () => {
    bebidaServiceMock = jasmine.createSpyObj('BebidaService', ['getBebidas', 'deleteBebida']);
    await TestBed.configureTestingModule({
      imports: [BebidaListComponent, BebidaCardComponent],
      providers: [{ provide: BebidaService, useValue: bebidaServiceMock }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BebidaListComponent);
    component = fixture.componentInstance;
    bebidaServiceMock.getBebidas.and.returnValue(of(mockBebidas));
    fixture.detectChanges();
  });

  it('should create and load bebidas on init', () => {
    expect(component).toBeTruthy();
    expect(bebidaServiceMock.getBebidas).toHaveBeenCalled();
    expect(component.bebidas.length).toBe(2);
    expect(component.bebidas[0].name).toBe('Café Americano');
  });

  it('should handle error on bebidas load', () => {
    bebidaServiceMock.getBebidas.and.returnValue(throwError(() => new Error('fail')));
    spyOn(console, 'error');
    component.loadBebidas();
    expect(console.error).toHaveBeenCalledWith('Error cargando bebidas:', jasmine.any(Error));
  });

  it('should confirm and delete bebida', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    bebidaServiceMock.deleteBebida.and.returnValue(of(void 0));
    // Preload bebidas
    component.bebidas = JSON.parse(JSON.stringify(mockBebidas));
    fixture.detectChanges();

    component.deleteBebida('Latte');
    expect(bebidaServiceMock.deleteBebida).toHaveBeenCalledWith('Latte');
    expect(component.bebidas.some(b => b.name === 'Latte')).toBeFalse();
  });

  it('should not delete bebida if confirm is false', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    bebidaServiceMock.deleteBebida.and.returnValue(of(void 0));
    component.bebidas = JSON.parse(JSON.stringify(mockBebidas));
    fixture.detectChanges();

    component.deleteBebida('Latte');
    expect(bebidaServiceMock.deleteBebida).not.toHaveBeenCalled();
    expect(component.bebidas.some(b => b.name === 'Latte')).toBeTrue();
  });

  it('should handle error on delete', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    bebidaServiceMock.deleteBebida.and.returnValue(throwError(() => new Error('fail')));
    spyOn(console, 'error');
    component.bebidas = JSON.parse(JSON.stringify(mockBebidas));
    fixture.detectChanges();

    component.deleteBebida('Latte');
    expect(console.error).toHaveBeenCalledWith('Error eliminando bebida:', jasmine.any(Error));
    // Latte debería seguir en la lista (porque el borrado falló)
    expect(component.bebidas.some(b => b.name === 'Latte')).toBeTrue();
  });
});
