package com.restfull.api.dtos.auth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthResponseDTO {
    private String token;
    private String message;

    public AuthResponseDTO(String token, String message) {
        super();
        this.token = token;
        this.message = message;
    }
}
