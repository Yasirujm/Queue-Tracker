package com.example.queue_token_app.service;

import com.example.queue_token_app.dto.UserResponse;
import com.example.queue_token_app.dto.UserSignUpRequest;

public interface UserService {
    
    /**
     * Register a new user
     * @param signUpRequest User signup data
     * @return UserResponse containing user details
     */
    UserResponse signUp(UserSignUpRequest signUpRequest);
    
    /**
     * Check if email already exists
     * @param email Email to check
     * @return true if exists, false otherwise
     */
    boolean existsByEmail(String email);
    
    /**
     * Check if username already exists
     * @param username Username to check
     * @return true if exists, false otherwise
     */
    boolean existsByUsername(String username);
}
