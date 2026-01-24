package com.example.queue_token_app.service.impl;

import com.example.queue_token_app.dto.CustomerRegistrationRequest;
import com.example.queue_token_app.dto.CustomerResponse;
import com.example.queue_token_app.entity.Customer;
import com.example.queue_token_app.repository.CustomerRepository;
import com.example.queue_token_app.service.CustomerService;
import com.example.queue_token_app.utils.exceptions.DuplicateResourceException;
import com.example.queue_token_app.utils.exceptions.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;

    @Override
    @Transactional
    public CustomerResponse registerCustomer(CustomerRegistrationRequest registrationRequest) {
        log.info("Processing customer registration for business: {}", registrationRequest.getBusinessName());

        // Validate if email already exists (if provided)
        if (registrationRequest.getEmail() != null && !registrationRequest.getEmail().isEmpty()) {
            if (customerRepository.existsByEmail(registrationRequest.getEmail())) {
                log.warn("Registration failed: Email already exists - {}", registrationRequest.getEmail());
                throw new DuplicateResourceException("Email already registered");
            }
        }

        // Validate if phone number already exists (if provided)
        if (registrationRequest.getPhoneNo() != null && !registrationRequest.getPhoneNo().isEmpty()) {
            if (customerRepository.existsByPhoneNo(registrationRequest.getPhoneNo())) {
                log.warn("Registration failed: Phone number already exists - {}", registrationRequest.getPhoneNo());
                throw new DuplicateResourceException("Phone number already registered");
            }
        }

        // Validate that at least email or phone is provided
        if ((registrationRequest.getEmail() == null || registrationRequest.getEmail().isEmpty()) &&
            (registrationRequest.getPhoneNo() == null || registrationRequest.getPhoneNo().isEmpty())) {
            log.warn("Registration failed: Neither email nor phone number provided");
            throw new IllegalArgumentException("Either email or phone number must be provided");
        }

        // Create new customer entity
        Customer customer = new Customer();
        customer.setBusinessName(registrationRequest.getBusinessName());
        customer.setEmail(registrationRequest.getEmail());
        customer.setPhoneNo(registrationRequest.getPhoneNo());
        customer.setAddress(registrationRequest.getAddress());
        customer.setLocationUrl(registrationRequest.getLocationUrl());

        // Save customer to database
        Customer savedCustomer = customerRepository.save(customer);
        log.info("Customer successfully registered with ID: {}", savedCustomer.getCustomerId());

        // Convert to response DTO
        return convertToResponse(savedCustomer);
    }

    @Override
    public CustomerResponse getCustomerById(UUID customerId) {
        log.info("Fetching customer with ID: {}", customerId);
        
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> {
                    log.warn("Customer not found with ID: {}", customerId);
                    return new ResourceNotFoundException("Customer not found with ID: " + customerId);
                });
        
        return convertToResponse(customer);
    }

    @Override
    public boolean existsByEmail(String email) {
        return customerRepository.existsByEmail(email);
    }

    @Override
    public boolean existsByPhoneNo(String phoneNo) {
        return customerRepository.existsByPhoneNo(phoneNo);
    }

    @Override
    @Transactional
    public CustomerResponse updateCustomer(UUID customerId, CustomerRegistrationRequest registrationRequest) {
        log.info("Updating customer with ID: {}", customerId);

        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> {
                    log.warn("Customer not found with ID: {}", customerId);
                    return new ResourceNotFoundException("Customer not found with ID: " + customerId);
                });

        // Check if email is being changed and if new email already exists
        if (registrationRequest.getEmail() != null && 
            !registrationRequest.getEmail().equals(customer.getEmail())) {
            if (customerRepository.existsByEmail(registrationRequest.getEmail())) {
                log.warn("Update failed: Email already exists - {}", registrationRequest.getEmail());
                throw new DuplicateResourceException("Email already registered");
            }
        }

        // Check if phone is being changed and if new phone already exists
        if (registrationRequest.getPhoneNo() != null && 
            !registrationRequest.getPhoneNo().equals(customer.getPhoneNo())) {
            if (customerRepository.existsByPhoneNo(registrationRequest.getPhoneNo())) {
                log.warn("Update failed: Phone number already exists - {}", registrationRequest.getPhoneNo());
                throw new DuplicateResourceException("Phone number already registered");
            }
        }

        // Update customer fields
        customer.setBusinessName(registrationRequest.getBusinessName());
        customer.setEmail(registrationRequest.getEmail());
        customer.setPhoneNo(registrationRequest.getPhoneNo());
        customer.setAddress(registrationRequest.getAddress());
        customer.setLocationUrl(registrationRequest.getLocationUrl());

        Customer updatedCustomer = customerRepository.save(customer);
        log.info("Customer successfully updated with ID: {}", updatedCustomer.getCustomerId());

        return convertToResponse(updatedCustomer);
    }

    @Override
    @Transactional
    public void deleteCustomer(UUID customerId) {
        log.info("Deleting customer with ID: {}", customerId);

        if (!customerRepository.existsById(customerId)) {
            log.warn("Customer not found with ID: {}", customerId);
            throw new ResourceNotFoundException("Customer not found with ID: " + customerId);
        }

        customerRepository.deleteById(customerId);
        log.info("Customer successfully deleted with ID: {}", customerId);
    }

    /**
     * Convert Customer entity to CustomerResponse DTO
     */
    private CustomerResponse convertToResponse(Customer customer) {
        return CustomerResponse.builder()
                .customerId(customer.getCustomerId())
                .businessName(customer.getBusinessName())
                .email(customer.getEmail())
                .phoneNo(customer.getPhoneNo())
                .address(customer.getAddress())
                .locationUrl(customer.getLocationUrl())
                .joinDate(customer.getJoinDate())
                .build();
    }
}
