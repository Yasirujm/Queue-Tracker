package com.example.queue_token_app.security;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.SecureRandom;
import java.util.Base64;

public class EncryptedDataStorage {

    private static final String ALGORITHM = "AES/GCM/NoPadding";
    private static final int KEY_SIZE = 256;
    private static final int T_LEN = 128;
    private static final int IV_LENGTH = 12;

    // Generate a key from password
    private static SecretKey getKeyFromPassword(String password, byte[] salt) throws Exception {
        SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
        PBEKeySpec spec = new PBEKeySpec(password.toCharArray(), salt, 65536, KEY_SIZE);
        SecretKey tmp = factory.generateSecret(spec);
        return new SecretKeySpec(tmp.getEncoded(), "AES");
    }

    // Encrypt data
    public static String encrypt(String data, String password) {
        try {
            byte[] salt = new byte[16];
            byte[] iv = new byte[IV_LENGTH];
            SecureRandom random = new SecureRandom();
            random.nextBytes(salt);
            random.nextBytes(iv);

            SecretKey key = getKeyFromPassword(password, salt);

            Cipher cipher = Cipher.getInstance(ALGORITHM);
            GCMParameterSpec spec = new GCMParameterSpec(T_LEN, iv);
            cipher.init(Cipher.ENCRYPT_MODE, key, spec);

            byte[] encrypted = cipher.doFinal(data.getBytes());

            // Combine salt + iv + encrypted data
            byte[] combined = new byte[salt.length + iv.length + encrypted.length];
            System.arraycopy(salt, 0, combined, 0, salt.length);
            System.arraycopy(iv, 0, combined, salt.length, iv.length);
            System.arraycopy(encrypted, 0, combined, salt.length + iv.length, encrypted.length);

            return Base64.getEncoder().encodeToString(combined);

        } catch (Exception e) {
            throw new RuntimeException("Encryption failed", e);
        }
    }

    // Decrypt data
    public static String decrypt(String encryptedData, String password) {
        try {
            byte[] decoded = Base64.getDecoder().decode(encryptedData);

            byte[] salt = new byte[16];
            byte[] iv = new byte[IV_LENGTH];
            byte[] cipherText = new byte[decoded.length - 16 - IV_LENGTH];

            System.arraycopy(decoded, 0, salt, 0, 16);
            System.arraycopy(decoded, 16, iv, 0, IV_LENGTH);
            System.arraycopy(decoded, 16 + IV_LENGTH, cipherText, 0, cipherText.length);

            SecretKey key = getKeyFromPassword(password, salt);

            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.DECRYPT_MODE, key, new GCMParameterSpec(T_LEN, iv));

            byte[] decrypted = cipher.doFinal(cipherText);

            return new String(decrypted);

        } catch (Exception e) {
            throw new RuntimeException("Decryption failed", e);
        }
    }
}
