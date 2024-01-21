package com.restfull.api.dtos;

import com.restfull.api.entities.User;
import com.restfull.api.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    @Setter
    private Long id;
    @Setter
    private String name;
    @Setter
    private String email;
    @Setter
    private String password;
    private Set<String> roles = new HashSet<>();

    public UserDTO(Long id, String name, String email, Set<String> roles) {
        super();
        this.id = id;
        this.name = name;
        this.email = email;
        this.roles = roles;
    }

    public UserDTO(User user) {
        super();
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.setRoles(user.getRoles());
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles.stream().map(Role::getDescription).collect(Collectors.toSet());
    }
}
