import { useState } from 'react';
import { createPedido, getHistorialPedidos } from '../services/pedidosService';
import type { PedidoData, Pedido } from '../types';

interface UsePedidosReturn {
  realizarPedido: (pedido: PedidoData) => Promise<Pedido>;
  obtenerHistorial: () => Promise<Pedido[]>;
  loading: boolean;
  error: string | null;
}

export const usePedidos = (): UsePedidosReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const realizarPedido = async (pedido: PedidoData): Promise<Pedido> => {
    setLoading(true);
    setError(null);
    try {
      const resultado = await createPedido(pedido);
      return resultado;
    } catch (err) {
      const mensaje = err instanceof Error ? err.message : 'Error desconocido al crear pedido';
      setError(mensaje);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const obtenerHistorial = async (): Promise<Pedido[]> => {
    setLoading(true);
    setError(null);
    try {
      const historial = await getHistorialPedidos();
      return historial;
    } catch (err) {
      const mensaje = err instanceof Error ? err.message : 'Error desconocido al obtener historial';
      setError(mensaje);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { realizarPedido, obtenerHistorial, loading, error };
};
