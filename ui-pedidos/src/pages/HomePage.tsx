import React from 'react';
import { OrderForm } from '../components/OrderForm';
import { Coffee, Sparkles, TrendingUp } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="mb-12 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent blur-3xl -z-10" />
        
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
          <Sparkles className="size-4 text-primary" />
          <span className="text-sm text-primary">Sistema de Pedidos en Línea</span>
        </div>
        
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="p-3 bg-gradient-to-br from-primary to-primary/60 rounded-2xl shadow-xl">
            <Coffee className="size-10 text-primary-foreground" />
          </div>
          <h1 className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Bebidas Deliciosas
          </h1>
        </div>
        
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Explora nuestro catálogo de bebidas y realiza tu pedido de manera rápida y sencilla
        </p>

        {/* Stats */}
        <div className="flex justify-center gap-8 mt-8">
          <div className="text-center">
            <p className="text-3xl font-semibold text-primary">6+</p>
            <p className="text-sm text-muted-foreground">Bebidas</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-semibold text-primary">100%</p>
            <p className="text-sm text-muted-foreground">Natural</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-semibold text-primary">24/7</p>
            <p className="text-sm text-muted-foreground">Disponible</p>
          </div>
        </div>
      </div>
      
      <OrderForm />
    </div>
  );
};