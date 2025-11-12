package backend_springboot;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/orders")
public class OrderController {
    private List<Order> orders = new ArrayList<>();

    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        if(order.getName() == null || order.getName().isEmpty()) throw new RuntimeException("Nombre requerido");
        if(order.getSize() == null || order.getSize().isEmpty()) throw new RuntimeException("Tamaño requerido");
        // Aquí iría la validación con API de bebidas (mockup)
        orders.add(order);
        return order;
    }
    @GetMapping
    public List<Order> getOrders() {
        return orders;
    }
}

class Order {
    private String name;
    private String size;
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getSize() { return size; }
    public void setSize(String size) { this.size = size; }
}
