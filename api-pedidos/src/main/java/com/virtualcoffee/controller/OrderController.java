package com.virtualcoffee.controller;

import com.virtualcoffee.dto.CreateOrderRequest;
import com.virtualcoffee.dto.OrderResponse;
import com.virtualcoffee.model.Order;
import com.virtualcoffee.model.OrderStatus;
import com.virtualcoffee.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    // POST /orders: crear pedido
    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(@RequestBody CreateOrderRequest request) {
        try {
            Order order = orderService.createOrder(request.getCustomerName(), request.getItems());
            double total = orderService.calculateTotal(order);
            return ResponseEntity.status(HttpStatus.CREATED).body(OrderResponse.from(order, total));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().build();
        }
    }

    // GET /orders: listar todos los pedidos
    @GetMapping
    public List<OrderResponse> getAllOrders() {
        return orderService.getAllOrders().stream()
                .map(o -> OrderResponse.from(o, orderService.calculateTotal(o)))
                .toList();
    }

    // GET /orders/{id}: consultar pedido por id
    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse> getOrderById(@PathVariable Long id) {
        Optional<Order> opt = orderService.getOrderById(id);
        return opt
                .map(order -> ResponseEntity.ok(OrderResponse.from(order, orderService.calculateTotal(order))))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // PUT /orders/{id}/status: actualizar estado
    @PutMapping("/{id}/status")
    public ResponseEntity<OrderResponse> updateOrderStatus(
            @PathVariable Long id,
            @RequestParam OrderStatus status
    ) {
        try {
            Order order = orderService.updateOrderStatus(id, status);
            double total = orderService.calculateTotal(order);
            return ResponseEntity.ok(OrderResponse.from(order, total));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    // GET /orders/customer/{name}: pedidos de un cliente
    @GetMapping("/customer/{name}")
    public List<OrderResponse> getOrdersByCustomer(@PathVariable String name) {
        return orderService.getOrdersByCustomer(name).stream()
                .map(o -> OrderResponse.from(o, orderService.calculateTotal(o)))
                .toList();
    }
}
