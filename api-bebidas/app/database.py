"""Gestión de datos en memoria para la API de Bebidas."""

from typing import Dict, List, Optional
from app.models import Bebida


class BebidaDatabase:
    """Base de datos en memoria para bebidas."""

    def __init__(self):
        """Inicializar la base de datos con algunas bebidas de ejemplo."""
        self._bebidas: Dict[str, Bebida] = {}
        self._initialize_sample_data()

    def _initialize_sample_data(self):
        """Inicializar con datos de ejemplo."""
        sample_bebidas = [
            Bebida(
                name="Café Americano",
                description="Café negro suave y aromático",
                price=2.50,
                available=True,
            ),
            Bebida(
                name="Cappuccino",
                description="Café con espuma de leche cremosa",
                price=3.50,
                available=True,
            ),
            Bebida(
                name="Latte",
                description="Café con leche vaporizada",
                price=4.00,
                available=True,
            ),
            Bebida(
                name="Té Verde",
                description="Té verde natural",
                price=2.00,
                available=True,
            ),
        ]
        for bebida in sample_bebidas:
            self._bebidas[bebida.name.lower()] = bebida

    def get_all(self) -> List[Bebida]:
        """Obtener todas las bebidas."""
        return list(self._bebidas.values())

    def get_by_name(self, name: str) -> Optional[Bebida]:
        """Obtener una bebida por nombre."""
        return self._bebidas.get(name.lower())

    def exists(self, name: str) -> bool:
        """Verificar si una bebida existe."""
        return name.lower() in self._bebidas

    def add(self, bebida: Bebida) -> Bebida:
        """Agregar una nueva bebida."""
        if self.exists(bebida.name):
            raise ValueError(f"La bebida '{bebida.name}' ya existe en el menú")
        self._bebidas[bebida.name.lower()] = bebida
        return bebida

    def update(self, name: str, bebida_data: dict) -> Optional[Bebida]:
        """Actualizar una bebida existente."""
        bebida = self.get_by_name(name)
        if not bebida:
            return None

        # Actualizar solo los campos proporcionados
        for key, value in bebida_data.items():
            if value is not None and hasattr(bebida, key):
                setattr(bebida, key, value)

        return bebida

    def delete(self, name: str) -> bool:
        """Eliminar una bebida."""
        key = name.lower()
        if key in self._bebidas:
            del self._bebidas[key]
            return True
        return False

    def clear(self):
        """Limpiar toda la base de datos (útil para testing)."""
        self._bebidas.clear()

    def reset(self):
        """Resetear a datos de ejemplo."""
        self.clear()
        self._initialize_sample_data()


# Instancia global de la base de datos
db = BebidaDatabase()
