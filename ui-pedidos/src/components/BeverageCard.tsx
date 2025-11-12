import React from 'react';
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Plus, Coffee, Droplet, Wine, Milk } from "lucide-react";
import { Bebida } from "../types";

interface BeverageCardProps {
  bebida: Bebida;
  onSelect: (bebida: Bebida) => void;
}

const getIconForCategory = (categoria?: string) => {
  switch (categoria) {
    case 'cafe':
      return <Coffee className="size-8 text-primary" />;
    case 'agua':
      return <Droplet className="size-8 text-blue-500" />;
    case 'jugo':
    case 'smoothie':
      return <Wine className="size-8 text-orange-500" />;
    case 'te':
      return <Milk className="size-8 text-green-500" />;
    default:
      return <Coffee className="size-8 text-primary" />;
  }
};

export const BeverageCard: React.FC<BeverageCardProps> = ({ bebida, onSelect }) => {
  return (
    <Card className="p-5 hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 hover:border-primary/50 bg-gradient-to-br from-background to-background/50 backdrop-blur-sm group overflow-hidden relative">
      {/* Efecto de brillo */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
      <div className="space-y-4 relative">
        {/* Icono superior */}
        <div className="flex justify-between items-start">
          <div className="p-3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl group-hover:scale-110 transition-transform duration-300">
            {getIconForCategory(bebida.categoria)}
          </div>
          <Badge 
            variant={bebida.stock > 10 ? "default" : "destructive"}
            className="shadow-lg"
          >
            {bebida.stock > 10 ? '✓ Disponible' : `Solo ${bebida.stock}`}
          </Badge>
        </div>

        {/* Contenido */}
        <div className="space-y-2">
          <h3 className="group-hover:text-primary transition-colors">{bebida.nombre}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2">{bebida.descripcion}</p>
        </div>
        
        {/* Footer */}
        <div className="flex justify-between items-center pt-2 border-t">
          <div>
            <p className="text-xs text-muted-foreground">Precio</p>
            <span className="text-primary text-xl font-semibold">${bebida.precio.toFixed(2)}</span>
          </div>
          <Button 
            size="lg" 
            onClick={() => onSelect(bebida)}
            disabled={bebida.stock === 0}
            className="rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <Plus className="size-5 mr-1" />
            Agregar
          </Button>
        </div>
      </div>
    </Card>
  );
};