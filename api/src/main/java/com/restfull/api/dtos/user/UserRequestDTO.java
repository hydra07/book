package com.restfull.api.dtos.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequestDTO {
    private Long id;
    private String name;
    private String email;
    private String password;
    private String image;
    private String phone;
    private boolean gender;
}

