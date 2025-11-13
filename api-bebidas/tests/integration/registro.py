import requests

def test_registro_y_pedido_cross_api():
    # Paso 1: Registrar bebida en FastAPI
    bebida = {
        "name": "Mocka Test",
        "description": "Prueba integración cross API",
        "price": 5.0,
        "available": True,
        "category": "test",
        "stock": 20,
    }
    r_bebida = requests.post("http://localhost:8000/menu", json=bebida)
    assert r_bebida.status_code == 201

    # Paso 2: Hacer pedido en Java usando ese nombre de bebida
    pedido = {
        "customerName": "Integrador",
        "items": [
            {
                "bebidaName": "Mocka Test",
                "quantity": 2
            }
        ]
    }
    r_pedido = requests.post("http://localhost:8080/orders", json=pedido)
    assert r_pedido.status_code in (200, 201)
    data = r_pedido.json()
    assert data["customerName"] == "Integrador"
    assert data["items"][0]["bebidaName"] == "Mocka Test"
