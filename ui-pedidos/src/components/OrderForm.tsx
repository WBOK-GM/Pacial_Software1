import React, { useState } from 'react';
import { useBebidas } from '../hooks/useBebidas';
import { usePedidos } from '../hooks/usePedidos';
import { BeverageCard } from './BeverageCard';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ShoppingCart, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { type Bebida } from '../types';

interface CarritoItem extends Bebida {
  cantidad: number;
}

export const OrderForm: React.FC = () => {
  const { bebidas, loading: loadingBebidas } = useBebidas();
  const { realizarPedido, loading: loadingPedido } = usePedidos();
  const [carrito, setCarrito] = useState<CarritoItem[]>([]);

  const agregarAlCarrito = (bebida: Bebida): void => {
    const itemExistente = carrito.find(item => item.name === bebida.name);
    
    if (itemExistente) {
      setCarrito(carrito.map(item =>
        item.name === bebida.name
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ));
      toast.success(`${bebida.name} agregado al carrito`);
    } else {
      setCarrito([...carrito, { ...bebida, cantidad: 1 }]);
      toast.success(`${bebida.name} agregado al carrito`);
    }
  };

  const eliminarDelCarrito = (name: string): void => {
    setCarrito(carrito.filter(item => item.name !== name));
    toast.info('Producto eliminado del carrito');
  };

  const actualizarCantidad = (name: string, nuevaCantidad: number): void => {
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(name);
      return;
    }

    setCarrito(carrito.map(item =>
      item.name === name
        ? { ...item, cantidad: nuevaCantidad }
        : item
    ));
  };

  const calcularTotal = (): number => {
    return carrito.reduce((total, item) => total + (item.price * item.cantidad), 0);
  };

  const handleRealizarPedido = async (): Promise<void> => {
    if (carrito.length === 0) {
      toast.error('El carrito está vacío');
      return;
    }

    try {
      const pedidoData = {
      customerName: "NombreCliente",
      items: carrito.map(item => ({
      bebidaName: item.name,      // Cambia bebidaNombre por bebidaName
      quantity: item.cantidad,    // Cambia cantidad por quantity
      unitPrice: item.price
      })),
      total: calcularTotal(),
    };

      await realizarPedido(pedidoData);
      toast.success('¡Pedido realizado con éxito!');
      setCarrito([]);
    } catch (error) {
      toast.error('Error al realizar el pedido');
    }
  };

  if (loadingBebidas) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Catálogo de Bebidas */}
      <div className="lg:col-span-2">
        <div className="mb-6">
          <h2 className="mb-2">Catálogo de Bebidas</h2>
          <p className="text-muted-foreground">Selecciona tus bebidas favoritas del menú</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bebidas.map(bebida => (
            <BeverageCard
              key={bebida.name}
              bebida={bebida}
              onSelect={agregarAlCarrito}
            />
          ))}
        </div>
      </div>

      {/* Carrito */}
      <div className="lg:col-span-1">
        <div className="sticky top-24">
          <Card className="p-6 shadow-2xl border-2 bg-gradient-to-br from-background to-primary/5 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-primary to-primary/60 rounded-xl">
                <ShoppingCart className="size-5 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h3>Tu Carrito</h3>
                <p className="text-xs text-muted-foreground">Revisa tu pedido</p>
              </div>
              {carrito.length > 0 && (
                <Badge variant="secondary" className="text-lg px-3 py-1 shadow-lg">
                  {carrito.length}
                </Badge>
              )}
            </div>

            <Separator className="mb-6" />

            {carrito.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex p-4 bg-muted rounded-full mb-4">
                  <ShoppingCart className="size-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground mb-2">Carrito vacío</p>
                <p className="text-sm text-muted-foreground">Agrega bebidas para comenzar</p>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
                  {carrito.map(item => (
                    <div key={item.name} className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            ${item.price ? item.price.toFixed(2) : 'N/D'} c/u
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => eliminarDelCarrito(item.name)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 rounded-lg"
                            onClick={() => actualizarCantidad(item.name, item.cantidad - 1)}
                          >
                            -
                          </Button>
                          <span className="w-12 text-center font-medium">{item.cantidad}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 rounded-lg"
                            onClick={() => actualizarCantidad(item.name, item.cantidad + 1)}
                          >
                            +
                          </Button>
                        </div>
                        <span className="font-semibold text-primary">
                          ${(item.price * item.cantidad).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="mb-6" />

                <div className="space-y-6">
                  <div className="flex justify-between items-center p-4 bg-primary/10 rounded-xl">
                    <span className="font-medium">Total a pagar:</span>
                    <span className="text-2xl font-semibold text-primary">
                      ${calcularTotal().toFixed(2)}
                    </span>
                  </div>

                  <Button 
                    className="w-full h-12 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-base" 
                    onClick={handleRealizarPedido}
                    disabled={loadingPedido}
                  >
                    {loadingPedido ? (
                      <>
                        <Loader2 className="size-5 mr-2 animate-spin" />
                        Procesando...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="size-5 mr-2" />
                        Confirmar Pedido
                      </>
                    )}
                  </Button>
                </div>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
