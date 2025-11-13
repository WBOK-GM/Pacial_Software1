import { useState, useEffect } from 'react';
import { obtenerBebidas } from '../services/bebidasService';
import type { Bebida } from '../types';

interface UseBebidasReturn {
  bebidas: Bebida[];
  loading: boolean;
  error: string | null;
}

export const useBebidas = (): UseBebidasReturn => {
  const [bebidas, setBebidas] = useState<Bebida[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBebidas = async () => {
      try {
        const data = await obtenerBebidas(); // <-- usa el nuevo servicio real
        setBebidas(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchBebidas();
  }, []);

  return { bebidas, loading, error };
};
