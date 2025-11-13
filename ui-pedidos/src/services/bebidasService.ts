import api from './apiBebidas';
import type { Bebida } from '../types';

/**
 * Obtener todas las bebidas
 * GET /menu
 */
export const obtenerBebidas = async (): Promise<Bebida[]> => {
  const response = await api.get('/menu');
  return response.data;
};

/**
 * Obtener una bebida por nombre
 * GET /menu/{name}
 */
export const obtenerBebidaPorNombre = async (name: string): Promise<Bebida> => {
  const response = await api.get(`/menu/${encodeURIComponent(name)}`);
  return response.data;
};

/**
 * Crear una nueva bebida
 * POST /menu
 */
export const crearBebida = async (bebida: Bebida): Promise<Bebida> => {
  const response = await api.post('/menu', bebida);
  return response.data;
};

/**
 * Actualizar una bebida existente
 * PUT /menu/{name}
 */
export const actualizarBebida = async (
  name: string,
  bebida: Partial<Bebida>
): Promise<Bebida> => {
  const response = await api.put(`/menu/${encodeURIComponent(name)}`, bebida);
  return response.data;
};

/**
 * Eliminar una bebida
 * DELETE /menu/{name}
 */
export const eliminarBebida = async (name: string): Promise<void> => {
  await api.delete(`/menu/${encodeURIComponent(name)}`);
};
