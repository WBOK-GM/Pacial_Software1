package com.virtualcoffee.dto;

import com.virtualcoffee.model.OrderItem;
import lombok.Data;
import java.util.List;

@Data
public class CreateOrderRequest {
    private String customerName;
    private List<OrderItem> items;
}