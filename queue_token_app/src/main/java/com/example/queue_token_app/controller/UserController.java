package com.example.queue_token_app.controller;

import com.example.queue_token_app.dto.ApiResponse;
import com.example.queue_token_app.dto.UserResponse;
import com.example.queue_token_app.dto.UserSignUpRequest;
import com.example.queue_token_app.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    /**
     * User signup endpoint
     * 
     * @param signUpRequest User signup data
     * @return ResponseEntity with UserResponse
     */
    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<UserResponse>> signUp(
            @Valid @RequestBody UserSignUpRequest signUpRequest) {
        
        log.info("Received signup request for email: {}", signUpRequest.getEmail());
        
        UserResponse userResponse = userService.signUp(signUpRequest);
        
        ApiResponse<UserResponse> response = ApiResponse.success(
                "User registered successfully",
                userResponse
        );
        
        return new ResponseEntity<>(response, HttpStatus.CREATED);
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
        
        boolean exists = userService.existsByEmail(email);
        
        ApiResponse<Boolean> response = ApiResponse.success(
                exists ? "Email already exists" : "Email available",
                exists
        );
        
        return ResponseEntity.ok(response);
    }

    /**
     * Check if username exists
     * 
     * @param username Username to check
     * @return ResponseEntity with boolean result
     */
    @GetMapping("/check-username")
    public ResponseEntity<ApiResponse<Boolean>> checkUsername(
            @RequestParam String username) {
        
        boolean exists = userService.existsByUsername(username);
        
        ApiResponse<Boolean> response = ApiResponse.success(
                exists ? "Username already taken" : "Username available",
                exists
        );
        
        return ResponseEntity.ok(response);
    }
}
