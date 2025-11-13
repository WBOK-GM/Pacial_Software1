import React, { useState, useEffect } from 'react';
import { usePedidos } from '../hooks/usePedidos';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Calendar, Package, Loader2 } from 'lucide-react';
import type { Pedido, EstadoPedido } from '../types';

export const OrderHistory: React.FC = () => {
  const { obtenerHistorial, loading } = usePedidos();
  const [historial, setHistorial] = useState<Pedido[]>([]);

  useEffect(() => {
    const cargarHistorial = async () => {
      try {
        const data = await obtenerHistorial();
        setHistorial(data);
      } catch (error) {
        console.error('Error al cargar historial');
      }
    };

    cargarHistorial();
  }, []);

  const getEstadoBadgeVariant = (estado: EstadoPedido): "default" | "secondary" | "destructive" | "outline" => {
    switch (estado) {
      case 'DELIVERED':
        return 'default';
      case 'PENDING':
        return 'secondary';
      case 'CANCELLED':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const formatearFecha = (fecha?: string): string => {
    if (!fecha) return "Sin fecha";
    const parsed = new Date(fecha.includes(' ') ? fecha.replace(' ', 'T') : fecha);
    return !isNaN(parsed.valueOf())
      ? parsed.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
      : "Sin fecha";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="mb-2">Historial de Pedidos</h2>
        <p className="text-muted-foreground">
          Revisa el estado y detalles de todos tus pedidos anteriores
        </p>
      </div>

      {historial.length === 0 ? (
        <Card className="p-16 text-center shadow-xl border-2 bg-gradient-to-br from-background to-primary/5">
          <div className="inline-flex p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl mb-6">
            <Package className="size-16 text-primary" />
          </div>
          <h3 className="mb-3">No hay pedidos previos</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Cuando realices tu primer pedido, aparecerá aquí con todos los detalles
          </p>
        </Card>
      ) : (
        <div className="grid gap-6">
          {historial.map((pedido, index) => (
            <Card
              key={pedido.id}
              className="p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/30 bg-gradient-to-br from-background to-background/50 backdrop-blur-sm"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Info Principal */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl">
                      <Package className="size-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3>Pedido #{pedido.id}</h3>
                        <Badge variant={getEstadoBadgeVariant(pedido.status)} className="shadow-md">
                          {pedido.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="size-4" />
                        <span>{formatearFecha(pedido.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  <Separator className="mb-4" />

                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Productos:</p>
                    {pedido.items && pedido.items.length > 0 ? (
                      pedido.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Package className="size-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{item.bebidaName}</p>
                            <p className="text-sm text-muted-foreground">Cantidad: {item.quantity}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-muted-foreground">Sin productos</div>
                    )}
                  </div>
                </div>

                {/* Total */}
                <div className="lg:text-right">
                  <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20">
                    <p className="text-sm text-muted-foreground mb-2">Total Pagado</p>
                    <p className="text-3xl font-semibold text-primary">
                      ${pedido.total?.toFixed(2) ?? '0.00'}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
