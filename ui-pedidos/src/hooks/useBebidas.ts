import { useState, useEffect } from 'react';
import { getBebidas } from '../services/bebidasService';
import { Bebida } from '../types';

interface UseBedidasReturn {
  bebidas: Bebida[];
  loading: boolean;
  error: string | null;
}

export const useBebidas = (): UseBedidasReturn => {
  const [bebidas, setBebidas] = useState<Bebida[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBebidas = async () => {
      try {
        const data = await getBebidas();
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
