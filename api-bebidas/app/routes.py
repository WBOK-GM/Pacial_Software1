"""Rutas de la API de Bebidas."""

from typing import List
from fastapi import APIRouter, HTTPException, status
from app.models import Bebida, BebidaUpdate
from app.database import db

router = APIRouter(prefix="/menu", tags=["menu"])

@router.get("", response_model=List[Bebida])
async def get_menu():
    """Obtener todo el menú de bebidas."""
    return db.get_all()

@router.get("/{name}", response_model=Bebida)
async def get_bebida(name: str):
    """Obtener una bebida específica por nombre."""
    bebida = db.get_by_name(name)
    if not bebida:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Bebida '{name}' no encontrada en el menú",
        )
    return bebida

@router.post("", response_model=Bebida, status_code=status.HTTP_201_CREATED)
async def add_bebida(bebida: Bebida):
    """Agregar una nueva bebida al menú."""
    try:
        return db.add(bebida)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        ) from e

@router.put("/{name}", response_model=Bebida)
async def update_bebida(name: str, bebida_update: BebidaUpdate):
    """Actualizar una bebida existente."""
    # Convertir a diccionario excluyendo valores None
    update_data = bebida_update.model_dump(exclude_unset=True)

    if not update_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Debe proporcionar al menos un campo para actualizar",
        )

    bebida = db.update(name, update_data)
    if not bebida:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Bebida '{name}' no encontrada en el menú",
        )
    return bebida

@router.delete("/{name}")
async def delete_bebida(name: str):
    """Eliminar una bebida del menú."""
    if not db.delete(name):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Bebida '{name}' no encontrada en el menú",
        )
    return {"message": f"Bebida '{name}' eliminada exitosamente"}
