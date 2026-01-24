package com.example.queue_token_app.service;

import com.example.queue_token_app.dto.CustomerRegistrationRequest;
import com.example.queue_token_app.dto.CustomerResponse;

import java.util.UUID;

public interface CustomerService {
    
    /**
     * Register a new customer
     * @param registrationRequest Customer registration data
     * @return CustomerResponse containing customer details
     */
    CustomerResponse registerCustomer(CustomerRegistrationRequest registrationRequest);
    
    /**
     * Get customer by ID
     * @param customerId Customer ID
     * @return CustomerResponse containing customer details
     */
    CustomerResponse getCustomerById(UUID customerId);
    
    /**
     * Check if email already exists
     * @param email Email to check
     * @return true if exists, false otherwise
     */
    boolean existsByEmail(String email);
    
    /**
     * Check if phone number already exists
     * @param phoneNo Phone number to check
     * @return true if exists, false otherwise
     */
    boolean existsByPhoneNo(String phoneNo);
    
    /**
     * Update customer information
     * @param customerId Customer ID
     * @param registrationRequest Updated customer data
     * @return CustomerResponse containing updated customer details
     */
    CustomerResponse updateCustomer(UUID customerId, CustomerRegistrationRequest registrationRequest);
    
    /**
     * Delete customer
     * @param customerId Customer ID to delete
     */
    void deleteCustomer(UUID customerId);
}
