import api from './apiPedidos';
import type { Pedido, PedidoData } from '../types';

/**
 * Obtener todos los pedidos.
 * GET /orders
 */
export const getHistorialPedidos = async (): Promise<Pedido[]> => {
  const { data } = await api.get('/orders');
  return data;
};

/**
 * Crear un nuevo pedido.
 * POST /orders
 */
export const createPedido = async (pedido: PedidoData): Promise<Pedido> => {
  const { data } = await api.post('/orders', pedido);
  return data;
};

/**
 * Obtener un pedido por su ID.
 * GET /orders/{id}
 */
export const getPedidoById = async (id: number): Promise<Pedido> => {
  const { data } = await api.get(`/orders/${id}`);
  return data;
};

/**
 * Obtener pedidos por nombre del cliente.
 * GET /orders/customer/{name}
 */
export const getPedidosByCliente = async (nombre: string): Promise<Pedido[]> => {
  const { data } = await api.get(`/orders/customer/${nombre}`);
  return data;
};

/**
 * Actualizar el estado de un pedido.
 * PUT /orders/{id}/status?status=DELIVERED|PENDING|CANCELLED
 */
export const updateEstadoPedido = async (id: number, status: string): Promise<Pedido> => {
  const { data } = await api.put(`/orders/${id}/status`, null, {
    params: { status },
  });
  return data;
};
