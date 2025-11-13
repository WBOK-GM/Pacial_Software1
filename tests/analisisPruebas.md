Pruebas Backend python

 Resultados de Pruebas

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

# Analisis Jasmin

Total de especificaciones ejecutadas: 17

Especificaciones fallidas: 0

Estado: Todas las pruebas pasaron exitosamente

Seed de ejecución aleatoria utilizada: 33696

Detalles por componente y pruebas destacadas:

BebidaListComponent

Verificación de carga inicial y creación del componente.

Validación de que no se elimine una bebida si el usuario cancela la confirmación.

Manejo correcto de errores al eliminar bebidas o cargar la lista.

Confirmación y eliminación exitosa de la bebida, reflejando cambios en la lista.

App

Renderizado correcto del título.

Creación exitosa del componente principal.

BebidaFormComponent

Validación de que se emite evento ngSubmitEvent y se reinicia el formulario en envíos exitosos.

Creación y valores iniciales correctos del componente.

Muestra alerta y no reinicia formulario en caso de error del servicio.

Emisión correcta del evento de cancelación.

BebidaCardComponent

Emisión del evento onDelete con nombre correcto en clic de eliminación.

Creación correcta del componente.

Devolución de íconos correctos para diferentes tipos de bebidas, incluyendo casos por defecto.

Conclusión:
Los 17 casos de prueba implementados cubren un amplio rango de funcionalidades y comportamientos críticos del frontend de la aplicación UI Bebidas. La ausencia total de fallas indica una robusta calidad y estabilidad del código bajo las pruebas realizadas. Este resultado garantiza confianza para futuros desarrollos y despliegues.

![alt text](image.png)

Analisis JUnit 5 + Mockito (TDD)

[INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 3.993 s -- in com.virtualcoffee.api_pedidos.ApiPedidosApplicationTests
[INFO] Running com.virtualcoffee.service.OrderServiceTest
[INFO] Tests run: 3, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.175 s -- in com.virtualcoffee.service.OrderServiceTest
[INFO] 
[INFO] Results:
[INFO] 
[INFO] Tests run: 4, Failures: 0, Errors: 0, Skipped: 0
[INFO] 
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  7.767 s
[INFO] Finished at: 2025-11-13T04:46:22-05:00
[INFO] ------------------------------------------------------------------------

Service testeado con todos lo metodos