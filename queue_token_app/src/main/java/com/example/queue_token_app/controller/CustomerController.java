package com.example.queue_token_app.controller;

import com.example.queue_token_app.dto.ApiResponse;
import com.example.queue_token_app.dto.CustomerRegistrationRequest;
import com.example.queue_token_app.dto.CustomerResponse;
import com.example.queue_token_app.service.CustomerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/customers")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class CustomerController {

    private final CustomerService customerService;

    /**
     * Customer registration endpoint
     * 
     * @param registrationRequest Customer registration data
     * @return ResponseEntity with CustomerResponse
     */
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<CustomerResponse>> registerCustomer(
            @Valid @RequestBody CustomerRegistrationRequest registrationRequest) {
        
        log.info("Received customer registration request for business: {}", 
                registrationRequest.getBusinessName());
        
        CustomerResponse customerResponse = customerService.registerCustomer(registrationRequest);
        
        ApiResponse<CustomerResponse> response = ApiResponse.success(
                "Customer registered successfully",
                customerResponse
        );
        
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /**
     * Get customer by ID
     * 
     * @param customerId Customer UUID
     * @return ResponseEntity with CustomerResponse
     */
    @GetMapping("/{customerId}")
    public ResponseEntity<ApiResponse<CustomerResponse>> getCustomer(
            @PathVariable UUID customerId) {
        
        log.info("Received request to get customer with ID: {}", customerId);
        
        CustomerResponse customerResponse = customerService.getCustomerById(customerId);
        
        ApiResponse<CustomerResponse> response = ApiResponse.success(
                "Customer retrieved successfully",
                customerResponse
        );
        
        return ResponseEntity.ok(response);
    }

    /**
     * Update customer information
     * 
     * @param customerId Customer UUID
     * @param registrationRequest Updated customer data
     * @return ResponseEntity with updated CustomerResponse
     */
    @PutMapping("/{customerId}")
    public ResponseEntity<ApiResponse<CustomerResponse>> updateCustomer(
            @PathVariable UUID customerId,
            @Valid @RequestBody CustomerRegistrationRequest registrationRequest) {
        
        log.info("Received request to update customer with ID: {}", customerId);
        
        CustomerResponse customerResponse = customerService.updateCustomer(customerId, registrationRequest);
        
        ApiResponse<CustomerResponse> response = ApiResponse.success(
                "Customer updated successfully",
                customerResponse
        );
        
        return ResponseEntity.ok(response);
    }

    /**
     * Delete customer
     * 
     * @param customerId Customer UUID
     * @return ResponseEntity with success message
     */
    @DeleteMapping("/{customerId}")
    public ResponseEntity<ApiResponse<Void>> deleteCustomer(
            @PathVariable UUID customerId) {
        
        log.info("Received request to delete customer with ID: {}", customerId);
        
        customerService.deleteCustomer(customerId);
        
        ApiResponse<Void> response = ApiResponse.success(
                "Customer deleted successfully",
                null
        );
        
        return ResponseEntity.ok(response);
    }

    /**
     * Check if email exists
     * 
     * @param email Email to check
     * @return ResponseEntity with boolean result
     */
    @GetMapping("/check-email")
    public ResponseEntity<ApiResponse<Boolean>> checkEmail(
            @RequestParam String email) {
        
        boolean exists = customerService.existsByEmail(email);
        
        ApiResponse<Boolean> response = ApiResponse.success(
                exists ? "Email already exists" : "Email available",
                exists
        );
        
        return ResponseEntity.ok(response);
    }

    /**
     * Check if phone number exists
     * 
     * @param phoneNo Phone number to check
     * @return ResponseEntity with boolean result
     */
    @GetMapping("/check-phone")
    public ResponseEntity<ApiResponse<Boolean>> checkPhoneNo(
            @RequestParam String phoneNo) {
        
        boolean exists = customerService.existsByPhoneNo(phoneNo);
        
        ApiResponse<Boolean> response = ApiResponse.success(
                exists ? "Phone number already exists" : "Phone number available",
                exists
        );
        
        return ResponseEntity.ok(response);
    }
}
