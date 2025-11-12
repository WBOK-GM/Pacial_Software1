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

    @field_validator("name")
    @classmethod
    def validate_name(cls, value: str) -> str:
        """Validar que el nombre no esté vacío y no tenga solo espacios."""
        if not value or not value.strip():
            raise ValueError("El nombre no puede estar vacío")
        return value.strip()

    @field_validator("price")
    @classmethod
    def validate_price(cls, value: float) -> float:
        """Validar que el precio sea positivo."""
        if value <= 0:
            raise ValueError("El precio debe ser mayor a 0")
        # Redondear a 2 decimales
        return round(value, 2)


class Bebida(BebidaBase):
    """Modelo completo de una bebida."""

    class Config:
        """Configuración del modelo."""
        json_schema_extra = {
            "example": {
                "name": "Café Americano",
                "description": "Café negro suave y aromático",
                "price": 2.50,
                "available": True,
            }
        }


class BebidaUpdate(BaseModel):
    """Modelo para actualizar una bebida (todos los campos opcionales)."""

    name: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = Field(None, max_length=200)
    price: Optional[float] = Field(None, gt=0)
    available: Optional[bool] = None

    @field_validator("name")
    @classmethod
    def validate_name(cls, value: Optional[str]) -> Optional[str]:
        """Validar que el nombre no esté vacío si se proporciona."""
        if value is not None and (not value or not value.strip()):
            raise ValueError("El nombre no puede estar vacío")
        return value.strip() if value else None

    @field_validator("price")
    @classmethod
    def validate_price(cls, value: Optional[float]) -> Optional[float]:
        """Validar que el precio sea positivo si se proporciona."""
        if value is not None:
            if value <= 0:
                raise ValueError("El precio debe ser mayor a 0")
            return round(value, 2)
        return None
