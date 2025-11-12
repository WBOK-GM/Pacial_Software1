package com.virtualcoffee.dto;

import com.virtualcoffee.model.OrderItem;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.util.List;

@Data
public class CreateOrderRequest {
    @NotNull(message = "El nombre del cliente es obligatorio")
    @NotEmpty(message = "El nombre del cliente no puede estar vacío")
    private String customerName;

    @NotNull(message = "Debe enviar al menos un item en el pedido")
    @NotEmpty(message = "La lista de items no puede estar vacía")
    private List<@Valid OrderItem> items;
}
