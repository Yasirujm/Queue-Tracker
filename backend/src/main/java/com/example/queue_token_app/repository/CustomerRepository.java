package com.example.queue_token_app.repository;

import com.example.queue_token_app.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, UUID> {
    
    Optional<Customer> findByEmail(String email);
    
    Optional<Customer> findByPhoneNo(String phoneNo);
    
    boolean existsByEmail(String email);
    
    boolean existsByPhoneNo(String phoneNo);
}
