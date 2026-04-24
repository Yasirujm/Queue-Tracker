package com.example.queue_token_app.security;

import org.springframework.web.bind.annotation.*;
import com.example.queue_token_app.security.EncryptedDataStorage;

@RestController
@RequestMapping("/api/encryption")
public class EncryptionController {

    private static final String PASSWORD = "changeThisSecurely";

    @PostMapping("/encrypt")
    public String encrypt(@RequestBody String data) {
        return EncryptedDataStorage.encrypt(data, PASSWORD);
    }

    @PostMapping("/decrypt")
    public String decrypt(@RequestBody String encrypted) {
        return EncryptedDataStorage.decrypt(encrypted, PASSWORD);
    }
}
