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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const realizarPedido = async (pedido: PedidoData): Promise<Pedido> => {
    setLoading(true);
    try {
      const resultado = await createPedido(pedido);
      return resultado;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const obtenerHistorial = async (): Promise<Pedido[]> => {
    setLoading(true);
    try {
      const historial = await getHistorialPedidos();
      return historial;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { realizarPedido, obtenerHistorial, loading, error };
};
