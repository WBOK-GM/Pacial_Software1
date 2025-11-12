export interface Bebida {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  stock: number;
  imagen?: string;
}

export interface PedidoData {
  items: {
    bebidaId: number;
    cantidad: number;
  }[];
  total: number;
}

export interface Pedido {
  id: number;
  items: {
    bebidaId: number;
    cantidad: number;
  }[];
  total: number;
  fecha: string;
  estado: string;
}
