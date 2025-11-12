"""Tests para las operaciones del menú."""

import pytest
from fastapi import status


class TestGetMenu:
    """Tests para GET /menu."""

    def test_get_menu_returns_list(self, client):
        """El endpoint debe retornar una lista de bebidas."""
        response = client.get("/menu")
        assert response.status_code == status.HTTP_200_OK
        assert isinstance(response.json(), list)

    def test_get_menu_contains_sample_data(self, client):
        """El menú debe contener las bebidas de ejemplo."""
        response = client.get("/menu")
        menu = response.json()
        assert len(menu) == 4  # 4 bebidas de ejemplo
        nombres = [bebida["name"] for bebida in menu]
        assert "Café Americano" in nombres
        assert "Cappuccino" in nombres

    def test_get_menu_bebida_structure(self, client):
        """Cada bebida debe tener la estructura correcta."""
        response = client.get("/menu")
        menu = response.json()
        bebida = menu[0]
        assert "name" in bebida
        assert "description" in bebida
        assert "price" in bebida
        assert "available" in bebida


class TestGetBebidaByName:
    """Tests para GET /menu/{name}."""

    def test_get_existing_bebida(self, client):
        """Debe retornar una bebida existente."""
        response = client.get("/menu/Cappuccino")
        assert response.status_code == status.HTTP_200_OK
        bebida = response.json()
        assert bebida["name"] == "Cappuccino"
        assert bebida["price"] == 3.50

    def test_get_bebida_case_insensitive(self, client):
        """La búsqueda debe ser case insensitive."""
        response = client.get("/menu/cappuccino")
        assert response.status_code == status.HTTP_200_OK
        bebida = response.json()
        assert bebida["name"] == "Cappuccino"

    def test_get_nonexistent_bebida(self, client):
        """Debe retornar 404 para bebida inexistente."""
        response = client.get("/menu/BebidaInexistente")
        assert response.status_code == status.HTTP_404_NOT_FOUND
        assert "no encontrada" in response.json()["detail"].lower()


class TestAddBebida:
    """Tests para POST /menu."""

    def test_add_valid_bebida(self, client, sample_bebida):
        """Debe agregar una bebida válida."""
        response = client.post("/menu", json=sample_bebida)
        assert response.status_code == status.HTTP_201_CREATED
        bebida = response.json()
        assert bebida["name"] == sample_bebida["name"]
        assert bebida["price"] == sample_bebida["price"]

    def test_add_bebida_appears_in_menu(self, client, sample_bebida):
        """La bebida agregada debe aparecer en el menú."""
        client.post("/menu", json=sample_bebida)
        response = client.get("/menu")
        menu = response.json()
        nombres = [b["name"] for b in menu]
        assert sample_bebida["name"] in nombres

    def test_add_duplicate_bebida(self, client, sample_bebida):
        """No debe permitir agregar bebidas duplicadas."""
        client.post("/menu", json=sample_bebida)
        response = client.post("/menu", json=sample_bebida)
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert "ya existe" in response.json()["detail"].lower()

    def test_add_bebida_minimal_fields(self, client):
        """Debe permitir agregar bebida sin descripción."""
        bebida = {"name": "Jugo Natural", "price": 3.00}
        response = client.post("/menu", json=bebida)
        assert response.status_code == status.HTTP_201_CREATED


class TestUpdateBebida:
    """Tests para PUT /menu/{name}."""

    def test_update_bebida_price(self, client):
        """Debe actualizar el precio de una bebida."""
        response = client.put("/menu/Latte", json={"price": 4.50})
        assert response.status_code == status.HTTP_200_OK
        bebida = response.json()
        assert bebida["price"] == 4.50

    def test_update_bebida_availability(self, client):
        """Debe actualizar la disponibilidad."""
        response = client.put("/menu/Latte", json={"available": False})
        assert response.status_code == status.HTTP_200_OK
        bebida = response.json()
        assert bebida["available"] is False

    def test_update_nonexistent_bebida(self, client):
        """Debe retornar 404 al actualizar bebida inexistente."""
        response = client.put("/menu/Inexistente", json={"price": 5.00})
        assert response.status_code == status.HTTP_404_NOT_FOUND

    def test_update_without_data(self, client):
        """Debe requerir al menos un campo para actualizar."""
        response = client.put("/menu/Latte", json={})
        assert response.status_code == status.HTTP_400_BAD_REQUEST


class TestDeleteBebida:
    """Tests para DELETE /menu/{name}."""

    def test_delete_existing_bebida(self, client):
        """Debe eliminar una bebida existente."""
        response = client.delete("/menu/Latte")
        assert response.status_code == status.HTTP_200_OK
        assert "eliminada" in response.json()["message"].lower()

    def test_delete_bebida_removes_from_menu(self, client):
        """La bebida eliminada no debe aparecer en el menú."""
        client.delete("/menu/Latte")
        response = client.get("/menu/Latte")
        assert response.status_code == status.HTTP_404_NOT_FOUND

    def test_delete_nonexistent_bebida(self, client):
        """Debe retornar 404 al eliminar bebida inexistente."""
        response = client.delete("/menu/Inexistente")
        assert response.status_code == status.HTTP_404_NOT_FOUND


class TestRootEndpoints:
    """Tests para endpoints raíz."""

    def test_root_endpoint(self, client):
        """Debe retornar mensaje de bienvenida."""
        response = client.get("/")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert "message" in data
        assert "VirtualCoffee" in data["message"]

    def test_health_check(self, client):
        """Debe retornar estado de salud."""
        response = client.get("/health")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["status"] == "healthy"
        assert data["service"] == "api-bebidas"
