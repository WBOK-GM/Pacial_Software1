package com.virtualcoffee.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BebidaDTO {
    private String name;
    private String description;
    private double price;
    private boolean available;
    private String category;  
    private Integer stock;    
}
