package com.virtualcoffee.service;

import com.virtualcoffee.client.BebidaClient;
import com.virtualcoffee.model.BebidaDTO;
import com.virtualcoffee.model.Order;
import com.virtualcoffee.model.OrderItem;
import com.virtualcoffee.model.OrderStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class OrderService {

    private final BebidaClient bebidaClient;
    private final List<Order> orders = new ArrayList<>();
    private final AtomicLong idGenerator = new AtomicLong(1);

    public OrderService(BebidaClient bebidaClient) {
        this.bebidaClient = bebidaClient;
    }

    public Order createOrder(String customerName, List<OrderItem> items) {
        if (customerName == null || customerName.trim().isEmpty()) {
            throw new IllegalArgumentException("El nombre del cliente es requerido");
        }
        if (items == null || items.isEmpty()) {
            throw new IllegalArgumentException("El pedido debe tener al menos un item");
        }

        List<OrderItem> validatedItems = new ArrayList<>();
        for (OrderItem item : items) {
            if (item.getQuantity() <= 0) {
                throw new IllegalArgumentException("La cantidad debe ser mayor a 0");
            }
            try {
                BebidaDTO bebida = bebidaClient.getBebidaByName(item.getBebidaName());
                if (bebida == null) {
                    throw new IllegalArgumentException("La bebida '" + item.getBebidaName() + "' no existe");
                }
                if (!bebida.isAvailable()) {
                    throw new IllegalArgumentException("La bebida '" + item.getBebidaName() + "' no está disponible");
                }
                OrderItem validatedItem = new OrderItem(
                        bebida.getName(),
                        item.getQuantity(),
                        bebida.getPrice()
                );
                validatedItems.add(validatedItem);
            } catch (HttpClientErrorException.NotFound e) {
                throw new IllegalArgumentException("La bebida '" + item.getBebidaName() + "' no existe");
            }
        }

        Order order = new Order();
        order.setId(idGenerator.getAndIncrement());
        order.setCustomerName(customerName);
        order.setItems(validatedItems);
        order.setStatus(OrderStatus.NEW);
        order.setCreatedAt(LocalDateTime.now());
        order.setUpdatedAt(LocalDateTime.now());

        orders.add(order);
        return order;
    }

    public List<Order> getAllOrders() {
        return new ArrayList<>(orders);
    }

    public Optional<Order> getOrderById(Long id) {
        return orders.stream().filter(o -> o.getId().equals(id)).findFirst();
    }

    public List<Order> getOrdersByCustomer(String customerName) {
        return orders.stream().filter(o -> o.getCustomerName().equalsIgnoreCase(customerName)).toList();
    }

    public Order updateOrderStatus(Long id, OrderStatus status) {
        Order order = getOrderById(id).orElseThrow(() -> new IllegalArgumentException("Pedido no encontrado"));
        order.setStatus(status);
        order.setUpdatedAt(LocalDateTime.now());
        return order;
    }

    public double calculateTotal(Order order) {
        return order.getItems().stream().mapToDouble(i -> i.getUnitPrice() * i.getQuantity()).sum();
    }
}
