"""Modelos Pydantic para la API de Bebidas."""

from typing import Optional
from pydantic import BaseModel, Field, field_validator


class BebidaBase(BaseModel):
    """Modelo base para una bebida."""

    name: str = Field(..., min_length=1, max_length=100, description="Nombre de la bebida")
    description: Optional[str] = Field(
        None, max_length=200, description="Descripción de la bebida"
    )
    price: float = Field(..., gt=0, description="Precio de la bebida (debe ser mayor a 0)")
    available: bool = Field(default=True, description="Disponibilidad de la bebida")
    category: Optional[str] = Field(None, max_length=50, description="Categoría de la bebida (opcional)")
    stock: Optional[int] = Field(0, ge=0, description="Cantidad en stock (opcional)")

    @field_validator("name")
    @classmethod
    def validate_name(cls, value: str) -> str:
        if not value or not value.strip():
            raise ValueError("El nombre no puede estar vacío")
        return value.strip()

    @field_validator("price")
    @classmethod
    def validate_price(cls, value: float) -> float:
        if value <= 0:
            raise ValueError("El precio debe ser mayor a 0")
        return round(value, 2)

    @field_validator("available", mode='before')
    @classmethod
    def validate_available(cls, value):
        """Validador estricto: solo acepta True/False."""
        if value is None:
            return True  # default
        if isinstance(value, bool):
            return value
        raise ValueError("El campo 'available' debe ser booleano (True/False) y no admite strings.")


class Bebida(BebidaBase):
    """Modelo completo de una bebida."""

    model_config = {
        "json_schema_extra": {
            "example": {
                "name": "Café Americano",
                "description": "Café negro suave y aromático",
                "price": 2.50,
                "available": True,
                "category": "cafe",
                "stock": 20,
            }
        }
    }


class BebidaUpdate(BaseModel):
    """Modelo para actualizar una bebida (todos los campos opcionales)."""

    name: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = Field(None, max_length=200)
    price: Optional[float] = Field(None, gt=0)
    available: Optional[bool] = None
    category: Optional[str] = Field(None, max_length=50)
    stock: Optional[int] = Field(None, ge=0)

    @field_validator("name")
    @classmethod
    def validate_name(cls, value: Optional[str]) -> Optional[str]:
        if value is not None and (not value or not value.strip()):
            raise ValueError("El nombre no puede estar vacío")
        return value.strip() if value else None

    @field_validator("price")
    @classmethod
    def validate_price(cls, value: Optional[float]) -> Optional[float]:
        if value is not None:
            if value <= 0:
                raise ValueError("El precio debe ser mayor a 0")
            return round(value, 2)
        return None

    @field_validator("available", mode='before')
    @classmethod
    def validate_available(cls, value: Optional[bool]):
        """Validador estricto: solo acepta True/False o None."""
        if value is None:
            return None
        if isinstance(value, bool):
            return value
        raise ValueError("El campo 'available' debe ser booleano (True/False) y no admite strings.")
