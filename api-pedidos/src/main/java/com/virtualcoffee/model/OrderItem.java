package com.virtualcoffee.model;

import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class OrderItem {
    @NotNull(message = "El nombre de la bebida es obligatorio")
    @NotEmpty(message = "El nombre de la bebida no puede estar vacío")
    private String bebidaName;

    @Min(value = 1, message = "La cantidad debe ser mayor a 0")
    private int quantity;

    @Min(value = 0, message = "El precio debe ser positivo")
    private double unitPrice;
}
