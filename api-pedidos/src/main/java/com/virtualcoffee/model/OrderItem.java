package com.virtualcoffee.model;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class OrderItem {
    private String bebidaName;
    private int quantity;
    private double unitPrice;
}