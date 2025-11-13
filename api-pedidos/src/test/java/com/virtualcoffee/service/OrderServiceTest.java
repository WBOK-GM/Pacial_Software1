package com.virtualcoffee.service;
import com.virtualcoffee.client.BebidaClient;
import com.virtualcoffee.model.BebidaDTO;
import com.virtualcoffee.model.Order;
import com.virtualcoffee.model.OrderItem;
import com.virtualcoffee.model.OrderStatus;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class OrderServiceTest {

    private BebidaClient bebidaClient;
    private OrderService orderService;

    @BeforeEach
    void setUp() {
        bebidaClient = mock(BebidaClient.class);
        orderService = new OrderService(bebidaClient);
    }

    @Test
    void testCreateOrder_BebidaNoExiste() {
        // Arrange
        OrderItem item = new OrderItem("Fanta", 1, 123.0);
        when(bebidaClient.getBebidaByName("Fanta"))
                .thenThrow(HttpClientErrorException.NotFound.class);

        // Assert
        IllegalArgumentException exception = assertThrows(
            IllegalArgumentException.class,
            () -> orderService.createOrder("Juan", List.of(item))
        );
        assertTrue(exception.getMessage().contains("no existe"));
    }

    @Test
    void testCreateOrder_BebidaNoDisponible() {
        // Arrange
        BebidaDTO bebidaIndisponible = new BebidaDTO();
        bebidaIndisponible.setName("Café");
        bebidaIndisponible.setAvailable(false);
        bebidaIndisponible.setPrice(3.0);

        OrderItem item = new OrderItem("Café", 1, 3.0);
        when(bebidaClient.getBebidaByName("Café")).thenReturn(bebidaIndisponible);

        IllegalArgumentException exception = assertThrows(
            IllegalArgumentException.class,
            () -> orderService.createOrder("Carlos", List.of(item))
        );
        assertTrue(exception.getMessage().contains("no está disponible"));
    }

    @Test
    void testCreateOrder_Success() {
        // Arrange
        BebidaDTO bebida = new BebidaDTO();
        bebida.setName("Café Americano");
        bebida.setAvailable(true);
        bebida.setPrice(2.5);

        OrderItem item = new OrderItem("Café Americano", 2, 2.5);
        when(bebidaClient.getBebidaByName("Café Americano")).thenReturn(bebida);

        // Act
        Order order = orderService.createOrder("Ana", List.of(item));

        // Assert
        assertEquals("Ana", order.getCustomerName());
        assertEquals(OrderStatus.NEW, order.getStatus());
        assertEquals(2, order.getItems().get(0).getQuantity());
        assertEquals("Café Americano", order.getItems().get(0).getBebidaName());
    }
}
