package com.restfull.api.dtos;

public class AuthResponseDTO {

    private String token;

    public AuthResponseDTO(String token) {
        super();
        this.token = token;
    }

    public String getToken() {
        return token;
    }

}
