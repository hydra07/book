package com.restfull.api.dtos.auth;


import lombok.Getter;
import lombok.Setter;

import java.security.SecureRandom;
import java.util.Random;

@Getter
@Setter
public class GoogleRequestDTO {
//    private static final Random RANDOM = new SecureRandom();
//    private static final int PASSWORD_LENGTH = 10;
//    private static final String ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    private String name;
    private String email;
//    private String password;
    private String avatar;
    private String phone;

    public GoogleRequestDTO(String name, String email, String avatarUrl, String phone) {
        super();
        this.name = name;
        this.email = email;
//        this.password = generatePassword();
        this.avatar = avatarUrl;
        this.phone = phone;
    }

//    private String generatePassword() {
//        StringBuilder returnValue = new StringBuilder(PASSWORD_LENGTH);
//        for (int i = 0; i < PASSWORD_LENGTH; i++) {
//            returnValue.append(ALPHABET.charAt(RANDOM.nextInt(ALPHABET.length())));
//        }
//        return new String(returnValue);
//    }
}
