package com.restfull.api.dtos;

import lombok.Getter;

@Getter
public class AuthResponseDTO {

    private String token;

    public AuthResponseDTO(String token) {
        super();
        this.token = token;
    }

}
