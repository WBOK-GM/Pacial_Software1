export interface Bebida {
  name: string;        // Usar "name" en lugar de "id"
  description: string; // Usar "description" en lugar de "descripcion"
  price: number;       // Usar "price" en lugar de "precio"
  available: boolean;
  category?: string;   // Opcional, si lo incorporas para categoría
  stock?: number;      // Opcional, si lo incorporas para stock
}
