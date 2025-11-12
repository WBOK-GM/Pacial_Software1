package com.virtualcoffee.repository;

import com.virtualcoffee.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByCustomerNameIgnoreCase(String customerName);
}