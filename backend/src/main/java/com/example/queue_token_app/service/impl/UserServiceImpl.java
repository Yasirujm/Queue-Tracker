package com.example.queue_token_app.service.impl;

import com.example.queue_token_app.dto.UserResponse;
import com.example.queue_token_app.dto.UserSignUpRequest;
import com.example.queue_token_app.entity.User;
import com.example.queue_token_app.repository.UserRepository;
import com.example.queue_token_app.service.UserService;
import com.example.queue_token_app.utils.exceptions.DuplicateResourceException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public UserResponse signUp(UserSignUpRequest signUpRequest) {
        log.info("Processing signup request for email: {}", signUpRequest.getEmail());

        // Validate if email already exists
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            log.warn("Signup failed: Email already exists - {}", signUpRequest.getEmail());
            throw new DuplicateResourceException("Email already registered");
        }

        // Validate if username already exists
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            log.warn("Signup failed: Username already exists - {}", signUpRequest.getUsername());
            throw new DuplicateResourceException("Username already taken");
        }

        // Create new user entity
        User user = new User();
        user.setUsername(signUpRequest.getUsername());
        user.setEmail(signUpRequest.getEmail());
        user.setPasswordHash(passwordEncoder.encode(signUpRequest.getPassword()));

        // Save user to database
        User savedUser = userRepository.save(user);
        log.info("User successfully registered with ID: {}", savedUser.getUserId());

        // Convert to response DTO
        return convertToResponse(savedUser);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    /**
     * Convert User entity to UserResponse DTO
     */
    private UserResponse convertToResponse(User user) {
        return UserResponse.builder()
                .userId(user.getUserId())
                .username(user.getUsername())
                .email(user.getEmail())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
