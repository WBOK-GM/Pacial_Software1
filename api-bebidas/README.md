
# API de Bebidas - VirtualCoffee

## Descripción

API REST desarrollada con Python y FastAPI para gestionar el menú de bebidas de la cafetería VirtualCoffee.

## Tecnologías

* Python 3.11+
* FastAPI 0.104.1
* Pydantic para validaciones
* pytest para testing
* pytest-cov para cobertura
* pylint y mypy para análisis estático

## Estructura del Proyecto

```
api-bebidas/
├── app/
│   ├── __init__.py
│   ├── main.py              # Punto de entrada de la aplicación
│   ├── models.py            # Modelos Pydantic
│   ├── routes.py            # Endpoints de la API
│   └── database.py          # Gestión de datos (en memoria)
├── tests/
│   ├── __init__.py
│   ├── test_menu.py         # Tests para operaciones del menú
│   └── test_validations.py  # Tests para validaciones
├── requirements.txt         # Dependencias del proyecto
├── .pylintrc                # Configuración de pylint
├── mypy.ini                 # Configuración de mypy
└── README.md
```

## Instalación

### 1. Crear entorno virtual

```bash
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

### 2. Instalar dependencias

```bash
pip install -r requirements.txt
```

## Ejecución

### Modo desarrollo

```bash
uvicorn app.main:app --reload --port 8000
```

La API estará disponible en: `http://localhost:8000`

Documentación interactiva: `http://localhost:8000/docs`

## Testing (TDD)

### Ejecutar todos los tests

```bash
pytest
```

### Ejecutar tests con cobertura

```bash
pytest --cov=app --cov-report=html --cov-report=term
```

El reporte HTML se generará en `htmlcov/index.html`

### Ejecutar tests específicos

```bash
# Tests del menú
pytest tests/test_menu.py

# Tests de validaciones
pytest tests/test_validations.py
```

### Ver cobertura detallada

```bash
pytest --cov=app --cov-report=term-missing
```

## Análisis Estático

### Pylint

```bash
pylint app
```

### Mypy (type checking)

```bash
mypy app
```

## Endpoints de la API

### GET /

Endpoint de bienvenida

**Response:**

```json
{
  "message": "Bienvenido a VirtualCoffee API - Menú de Bebidas",
  "version": "1.0.0"
}
```

### GET /menu

Obtener lista completa del menú

**Response:**

```json
[
  {
    "name": "Café Americano",
    "description": "Café negro suave",
    "price": 2.50,
    "available": true
  }
]
```

### GET /menu/{name}

Obtener una bebida específica por nombre

**Response:**

```json
{
  "name": "Café Americano",
  "description": "Café negro suave",
  "price": 2.50,
  "available": true
}
```

### POST /menu

Agregar nueva bebida al menú

**Request Body:**

```json
{
  "name": "Cappuccino",
  "description": "Café con espuma de leche",
  "price": 3.50,
  "available": true
}
```

**Response:**

```json
{
  "name": "Cappuccino",
  "description": "Café con espuma de leche",
  "price": 3.50,
  "available": true
}
```

### PUT /menu/{name}

Actualizar una bebida existente

**Request Body:**

```json
{
  "price": 3.75,
  "available": false
}
```

### DELETE /menu/{name}

Eliminar una bebida del menú

**Response:**

```json
{
  "message": "Bebida eliminada exitosamente"
}
```

## Validaciones Implementadas

* **Nombre:** Requerido, no puede estar vacío
* **Precio:** Debe ser mayor a 0
* **Descripción:** Opcional, máximo 200 caracteres
* **Available:** Booleano, por defecto true
* **Duplicados:** No se permiten bebidas con el mismo nombre

## Códigos de Estado HTTP

* `200 OK` - Operación exitosa
* `201 Created` - Bebida creada exitosamente
* `400 Bad Request` - Datos inválidos o bebida duplicada
* `404 Not Found` - Bebida no encontrada
* `422 Unprocessable Entity` - Error de validación

---

## 🧪 Resultados de Pruebas

### Pylint

* **Puntaje obtenido:** `9.54 / 10`
* **Indicador:** Alta calidad de código.
* **Advertencias solucionadas:** Espaciado, nombres de variables y estilo general.

**Advertencias persistentes:**

* `E1101: Instance of 'FieldInfo' has no 'lower' member (no-member)` en `database.py`.

  * Motivo: Pylint no reconoce correctamente propiedades dinámicas de modelos Pydantic.
  * Justificación: El código funciona correctamente y los tests lo validan.
* `C0301: Line too long (105/100)` en `models.py`.

  * Motivo: Mantener un ejemplo de configuración legible sin dividir líneas.

**Reglas desactivadas:**
No se desactivaron reglas de Pylint. En caso de hacerlo, sería únicamente por compatibilidad con Pydantic o para preservar claridad en ejemplos y docstrings.

---

### Mypy

* **Resultado:** Sin errores de tipado detectados.
* **Advertencia:** `[annotation-unchecked]`, indicando que no se revisan cuerpos de funciones sin tipado explícito.

  * Se considera suficiente el nivel actual de chequeo de tipos, pudiendo ampliarse con `--check-untyped-defs` si se requiere un análisis más estricto.

---

### Coverage.py

* **Cobertura total alcanzada:** `94%`

* **Archivos con cobertura completa (100%):**

  * `__init__.py`
  * `database.py`
  * `main.py`
  * `routes.py`

* **Archivo con menor cobertura:**

  * `models.py` → 85% (principalmente validaciones excepcionales difíciles de disparar).

**Conclusión:**
La cobertura refleja un testing robusto que valida tanto las rutas principales como las validaciones de negocio. Las pequeñas brechas están justificadas por casos atípicos de validación Pydantic.

---

## 📈 Conclusiones Generales

El conjunto de herramientas de calidad —**pylint**, **mypy** y **pytest-cov**— permitió:

* Mejorar la consistencia y legibilidad del código.
* Detectar y documentar advertencias justificadas.
* Garantizar una cobertura sólida y pruebas confiables.

El proyecto presenta un equilibrio adecuado entre calidad, mantenibilidad y claridad, cumpliendo los objetivos de robustez y buenas prácticas de desarrollo.
