package com.restfull.api.utils;
import org.springframework.beans.factory.annotation.Value;
public class Hashed {

    @Value("${secret.key}")
    private String secretKey;

    public String generatePassword(String gmail) {
        String password = gmail + secretKey;
        return password;
    }
}
