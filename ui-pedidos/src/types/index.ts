export interface Bebida {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  stock: number;
  imagen?: string;
}

export type BebidasResponse = Bebida[];

export interface PedidoItem {
  bebidaId: number;
  cantidad: number;
}

export interface PedidoData {
  items: PedidoItem[];
  total: number;
}

export interface Pedido {
  id: number;
  bebidaNombre: string;
  cantidad: number;
  total: number;
  fecha: string;
  estado: EstadoPedido;
}

export type EstadoPedido = 'PENDIENTE' | 'PREPARANDO' | 'COMPLETADO' | 'CANCELADO' | 'ENTREGADO' | 'LISTO';

export type HistorialResponse = Pedido[];

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export type Categoria = 'cafe' | 'te' | 'jugo' | 'smoothie' | 'refresco' | 'agua';
export type CategoriasResponse = Categoria[];


