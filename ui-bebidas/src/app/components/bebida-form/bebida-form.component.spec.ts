import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BebidaFormComponent } from './bebida-form.component';
import { BebidaService } from '../../services/bebida.service';
import { of, throwError } from 'rxjs';

describe('BebidaFormComponent', () => {
  let component: BebidaFormComponent;
  let fixture: ComponentFixture<BebidaFormComponent>;
  let mockBebidaService: jasmine.SpyObj<BebidaService>;

  beforeEach(async () => {
    mockBebidaService = jasmine.createSpyObj('BebidaService', ['createBebida']);

    await TestBed.configureTestingModule({
      imports: [BebidaFormComponent, FormsModule],
      providers: [{ provide: BebidaService, useValue: mockBebidaService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BebidaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component and reset initial values', () => {
    expect(component).toBeTruthy();
    expect(component.nuevaBebida).toEqual({
      name: '',
      description: '',
      price: 0,
      available: true,
      category: '',
      stock: 0
    });
  });

  it('should emit ngSubmitEvent and reset form on successful submit', () => {
    const bebidaMock = {
      name: 'Test',
      description: 'Test Desc',
      price: 5.5,
      available: true,
      category: 'cat',
      stock: 10
    };
    component.nuevaBebida = { ...bebidaMock };
    spyOn(component.ngSubmitEvent, 'emit');
    mockBebidaService.createBebida.and.returnValue(of(bebidaMock));

    component.onSubmit();

    expect(mockBebidaService.createBebida).toHaveBeenCalledWith(bebidaMock);
    expect(component.ngSubmitEvent.emit).toHaveBeenCalledWith(bebidaMock);
    expect(component.nuevaBebida.name).toBe('');
    expect(component.nuevaBebida.price).toBe(0);
  });

  it('should alert and not reset form on service error', () => {
    spyOn(window, 'alert');
    mockBebidaService.createBebida.and.returnValue(throwError(() => new Error('fail')));

    component.nuevaBebida = {
      name: 'Fallo',
      description: '',
      price: 2,
      available: true,
      category: '',
      stock: 1
    };

    component.onSubmit();

    expect(window.alert).toHaveBeenCalledWith('Error al agregar bebida');
    // El formulario NO se resetea porque el handler de error no lo hace
    expect(component.nuevaBebida.name).toBe('Fallo');
  });

  it('should emit cancel event', () => {
    spyOn(component.cancel, 'emit');
    component.onCancel();
    expect(component.cancel.emit).toHaveBeenCalled();
  });
});
