"""Punto de entrada principal de la API de Bebidas."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router

app = FastAPI(
    title="VirtualCoffee - API de Bebidas",
    description="API REST para gestionar el menú de bebidas",
    version="1.0.0",
)

# Configurar CORS para permitir peticiones desde la UI React en localhost:5173
origins = [
    "http://localhost:5173",  # Cambia aquí al origen real de tu frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Mejor especificar explícitamente para producción
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir rutas
app.include_router(router)

@app.get("/")
async def root():
    """Endpoint raíz de bienvenida."""
    return {
        "message": "Bienvenido a VirtualCoffee API - Menú de Bebidas",
        "version": "1.0.0",
        "docs": "/docs",
    }

@app.get("/health")
async def health_check():
    """Endpoint de verificación de salud."""
    return {"status": "healthy", "service": "api-bebidas"}
