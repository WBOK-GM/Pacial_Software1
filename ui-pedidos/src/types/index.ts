// src/types/index.ts

// --- BEBIDAS ---
export interface Bebida {
  name: string;            // Identificador único (clave en la BD)
  description?: string;    // Opcional en FastAPI
  price: number;           // float positivo
  available: boolean;      // true / false
  categoria?: string;   // Opcional porque no viene del backend
  stock?: number; 
}

export type BebidasResponse = Bebida[];

// --- PEDIDOS ---
export interface PedidoItem {
  bebidaNombre: string;    // referencia por nombre
  cantidad: number;
}

export interface PedidoData {
  items: PedidoItem[];
  customerName: string;    // nombre del cliente, para crear pedido
}

export type EstadoPedido = 'PENDING' | 'DELIVERED' | 'CANCELLED';

export interface Pedido {
  id: number;
  customerName: string;
  items: PedidoItem[];
  total: number;
  orderDate: string;
  status: EstadoPedido;
}

export type HistorialResponse = Pedido[];

// --- API HELPERS ---
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
