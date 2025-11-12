import pytest
from fastapi.testclient import TestClient
from backend_fastapi.app import app

client = TestClient(app)
def test_add_bebida_ok():
    res = client.post("/menu", json={"name": "Cafe", "size": "Small", "price": 1.5})
    assert res.status_code == 200
    assert res.json()["name"] == "Cafe"

def test_add_bebida_fail():
    res = client.post("/menu", json={"name": "", "size": "Small", "price": -1})
    assert res.status_code == 400
    assert "Datos inválidos" in res.text

def test_get_menu():
    client.post("/menu", json={"name": "Te", "size": "Medio", "price": 2})
    res = client.get("/menu")
    assert res.status_code == 200
    assert any(b["name"] == "Te" for b in res.json())

def test_get_bebida_not_found():
    res = client.get("/menu/noexiste")
    assert res.status_code == 404
    assert "Bebida no encontrada" in res.text
