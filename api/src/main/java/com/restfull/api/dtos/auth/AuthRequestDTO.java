package com.restfull.api.dtos.auth;


import lombok.Data;

@Data
public class AuthRequestDTO {
    private String email;
    private String password;
}
