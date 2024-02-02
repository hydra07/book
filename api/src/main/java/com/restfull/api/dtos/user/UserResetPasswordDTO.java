package com.restfull.api.dtos.user;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserResetPasswordDTO {
    private Long id;
    private String email;
    private String password;
    private String newPassword;
}
