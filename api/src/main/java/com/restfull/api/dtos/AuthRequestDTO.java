package com.restfull.api.dtos;


import lombok.Data;

@Data
public class AuthRequestDTO {
    private String email;
    private String password;
}
