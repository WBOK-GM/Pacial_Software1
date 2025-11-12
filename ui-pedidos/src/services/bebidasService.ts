import axios from 'axios';
import {type  BebidasResponse } from '../types';

// Datos de ejemplo para desarrollo
const BEBIDAS_MOCK: BebidasResponse = [
  { id: 1, nombre: 'Coca Cola', precio: 2.50, descripcion: 'Refresco de cola', stock: 50, categoria: 'refresco' },
  { id: 2, nombre: 'Agua Mineral', precio: 1.50, descripcion: 'Agua purificada', stock: 100, categoria: 'agua' },
  { id: 3, nombre: 'Jugo de Naranja', precio: 3.00, descripcion: 'Jugo natural', stock: 30, categoria: 'jugo' },
  { id: 4, nombre: 'Café', precio: 2.00, descripcion: 'Café americano', stock: 40, categoria: 'cafe' },
  { id: 5, nombre: 'Té Helado', precio: 2.50, descripcion: 'Té helado de limón', stock: 25, categoria: 'te' },
  { id: 6, nombre: 'Smoothie de Fresa', precio: 4.00, descripcion: 'Smoothie natural de fresa', stock: 20, categoria: 'smoothie' }
];

// Obtener todas las bebidas desde api-bebidas (Python)
export const getBebidas = async (): Promise<BebidasResponse> => {
  try {
    const response = await axios.get<BebidasResponse>('http://localhost:8000/bebidas', {
      timeout: 2000 // 2 segundos de timeout
    });
    return response.data;
  } catch (error) {
    // En desarrollo/preview, usar datos mock sin mostrar error
    console.info('Usando datos de ejemplo (API no disponible)');
    return BEBIDAS_MOCK;
  }
};