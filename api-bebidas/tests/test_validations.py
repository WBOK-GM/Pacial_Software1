"""Tests para las validaciones de datos."""

import pytest
from fastapi import status


class TestNameValidation:
    """Tests para validación del nombre."""

    def test_name_cannot_be_empty(self, client):
        """El nombre no puede estar vacío."""
        bebida = {"name": "", "price": 3.00}
        response = client.post("/menu", json=bebida)
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

    def test_name_cannot_be_only_spaces(self, client):
        """El nombre no puede ser solo espacios."""
        bebida = {"name": "   ", "price": 3.00}
        response = client.post("/menu", json=bebida)
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

    def test_name_is_required(self, client):
        """El nombre es un campo requerido."""
        bebida = {"price": 3.00}
        response = client.post("/menu", json=bebida)
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

    def test_name_max_length(self, client):
        """El nombre no puede exceder 100 caracteres."""
        bebida = {"name": "A" * 101, "price": 3.00}
        response = client.post("/menu", json=bebida)
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

    def test_name_is_trimmed(self, client):
        """El nombre debe ser trimmed (espacios removidos)."""
        bebida = {"name": "  Espresso  ", "price": 2.50}
        response = client.post("/menu", json=bebida)
        assert response.status_code == status.HTTP_201_CREATED
        assert response.json()["name"] == "Espresso"


class TestPriceValidation:
    """Tests para validación del precio."""

    def test_price_must_be_positive(self, client):
        """El precio debe ser mayor a 0."""
        bebida = {"name": "Bebida Test", "price": -1.00}
        response = client.post("/menu", json=bebida)
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

    def test_price_cannot_be_zero(self, client):
        """El precio no puede ser cero."""
        bebida = {"name": "Bebida Test", "price": 0}
        response = client.post("/menu", json=bebida)
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

    def test_price_is_required(self, client):
        """El precio es un campo requerido."""
        bebida = {"name": "Bebida Test"}
        response = client.post("/menu", json=bebida)
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

    def test_price_accepts_decimals(self, client):
        """El precio debe aceptar decimales."""
        bebida = {"name": "Bebida Test", "price": 3.75}
        response = client.post("/menu", json=bebida)
        assert response.status_code == status.HTTP_201_CREATED
        assert response.json()["price"] == 3.75

    def test_price_is_rounded_to_two_decimals(self, client):
        """El precio debe redondearse a 2 decimales."""
        bebida = {"name": "Bebida Test", "price": 3.999}
        response = client.post("/menu", json=bebida)
        assert response.status_code == status.HTTP_201_CREATED
        # Debe redondearse a 4.00
        assert response.json()["price"] == 4.0


class TestDescriptionValidation:
    """Tests para validación de la descripción."""

    def test_description_is_optional(self, client):
        """La descripción es opcional."""
        bebida = {"name": "Bebida Test", "price": 3.00}
        response = client.post("/menu", json=bebida)
        assert response.status_code == status.HTTP_201_CREATED

    def test_description_max_length(self, client):
        """La descripción no puede exceder 200 caracteres."""
        bebida = {
            "name": "Bebida Test",
            "description": "A" * 201,
            "price": 3.00,
        }
        response = client.post("/menu", json=bebida)
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

    def test_description_accepts_valid_text(self, client):
        """Debe aceptar descripciones válidas."""
        bebida = {
            "name": "Bebida Test",
            "description": "Una deliciosa bebida",
            "price": 3.00,
        }
        response = client.post("/menu", json=bebida)
        assert response.status_code == status.HTTP_201_CREATED
        assert response.json()["description"] == "Una deliciosa bebida"


class TestAvailableValidation:
    """Tests para validación de disponibilidad."""

    def test_available_defaults_to_true(self, client):
        """available debe ser True por defecto."""
        bebida = {"name": "Bebida Test", "price": 3.00}
        response = client.post("/menu", json=bebida)
        assert response.status_code == status.HTTP_201_CREATED
        assert response.json()["available"] is True

    def test_available_accepts_false(self, client):
        """Debe aceptar available como False."""
        bebida = {"name": "Bebida Test", "price": 3.00, "available": False}
        response = client.post("/menu", json=bebida)
        assert response.status_code == status.HTTP_201_CREATED
        assert response.json()["available"] is False

    def test_available_must_be_boolean(self, client):
        """available debe ser booleano."""
        bebida = {"name": "Bebida Test", "price": 3.00, "available": "yes"}
        response = client.post("/menu", json=bebida)
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY


class TestUpdateValidations:
    """Tests para validaciones en actualizaciones."""

    def test_update_with_invalid_price(self, client):
        """No debe permitir actualizar con precio inválido."""
        response = client.put("/menu/Latte", json={"price": -5.00})
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

    def test_update_with_empty_name(self, client):
        """No debe permitir actualizar con nombre vacío."""
        response = client.put("/menu/Latte", json={"name": ""})
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

    def test_update_with_valid_data(self, client):
        """Debe permitir actualizar con datos válidos."""
        response = client.put(
            "/menu/Latte", json={"price": 4.25, "description": "Nuevo sabor"}
        )
        assert response.status_code == status.HTTP_200_OK
        bebida = response.json()
        assert bebida["price"] == 4.25
        assert bebida["description"] == "Nuevo sabor"
