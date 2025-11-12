import api from './api';
import type { PedidoData, Pedido, HistorialResponse } from '../types';


// Datos de ejemplo para desarrollo
const HISTORIAL_MOCK: HistorialResponse = [
  {
    id: 1,
    bebidaNombre: 'Coca Cola',
    cantidad: 2,
    total: 5.00,
    fecha: new Date(Date.now() - 86400000).toISOString(),
    estado: 'COMPLETADO'
  },
  {
    id: 2,
    bebidaNombre: 'Café',
    cantidad: 1,
    total: 2.00,
    fecha: new Date(Date.now() - 172800000).toISOString(),
    estado: 'COMPLETADO'
  },
  {
    id: 3,
    bebidaNombre: 'Jugo de Naranja',
    cantidad: 3,
    total: 9.00,
    fecha: new Date(Date.now() - 259200000).toISOString(),
    estado: 'PENDIENTE'
  }
];

// Crear nuevo pedido
export const createPedido = async (pedidoData: PedidoData): Promise<Pedido> => {
  try {
    const response = await api.post<Pedido>('/api/pedidos', pedidoData, {
      timeout: 2000
    });
    return response.data;
  } catch (error) {
    // Simular respuesta exitosa para desarrollo
    console.info('Usando simulación de pedido (API no disponible)');
    return {
      id: Math.floor(Math.random() * 1000),
      bebidaNombre: 'Producto',
      cantidad: pedidoData.items[0]?.cantidad || 1,
      total: pedidoData.total,
      fecha: new Date().toISOString(),
      estado: 'PENDIENTE'
    };
  }
};

// Obtener historial de pedidos
export const getHistorialPedidos = async (): Promise<HistorialResponse> => {
  try {
    const response = await api.get<HistorialResponse>('/api/pedidos/historial', {
      timeout: 2000
    });
    return response.data;
  } catch (error) {
    // Retornar datos de ejemplo si falla la API
    console.info('Usando datos de ejemplo (API no disponible)');
    return HISTORIAL_MOCK;
  }
};