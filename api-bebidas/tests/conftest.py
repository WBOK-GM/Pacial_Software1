"""Configuración y fixtures para pytest."""

import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.database import db


@pytest.fixture
def client():
    """Fixture para crear un cliente de prueba."""
    return TestClient(app)


@pytest.fixture(autouse=True)
def reset_database():
    """Reset de la base de datos antes de cada test."""
    db.reset()
    yield
    db.reset()


@pytest.fixture
def sample_bebida():
    """Fixture con datos de ejemplo para una bebida."""
    return {
        "name": "Mocha",
        "description": "Café con chocolate",
        "price": 4.50,
        "available": True,
    }
