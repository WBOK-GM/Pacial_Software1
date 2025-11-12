package com.virtualcoffee.dto;

import com.virtualcoffee.model.Order;
import com.virtualcoffee.model.OrderItem;
import com.virtualcoffee.model.OrderStatus;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderResponse {
    private Long id;
    private String customerName;
    private List<OrderItem> items;
    private OrderStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private double total;

    public static OrderResponse from(Order order, double total) {
        OrderResponse r = new OrderResponse();
        r.setId(order.getId());
        r.setCustomerName(order.getCustomerName());
        r.setItems(order.getItems());
        r.setStatus(order.getStatus());
        r.setCreatedAt(order.getCreatedAt());
        r.setUpdatedAt(order.getUpdatedAt());
        r.setTotal(total);
        return r;
    }
}