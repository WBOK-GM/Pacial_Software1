from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

app = FastAPI()

class Bebida(BaseModel):
    name: str
    size: str
    price: float

menu = []

@app.get("/menu", response_model=List[Bebida])
def get_menu():
    return menu

@app.post("/menu", response_model=Bebida)
def add_bebida(bebida: Bebida):
    if not bebida.name or bebida.price <= 0:
        raise HTTPException(status_code=400, detail="Datos inválidos")
    menu.append(bebida)
    return bebida

@app.get("/menu/{name}", response_model=Bebida)
def get_bebida(name: str):
    for bebida in menu:
        if bebida.name.lower() == name.lower():
            return bebida
    raise HTTPException(status_code=404, detail="Bebida no encontrada")
