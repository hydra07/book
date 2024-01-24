package com.restfull.api.dtos.user;

import com.restfull.api.entities.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private String password;
    private String avatar;
    private String phone;
    private Boolean gender;

//    private Set<String> roles = new HashSet<>();
//    public UserDTO(Long id, String name, String email, Set<String> roles) {
//        super();
//        this.id = id;
//        this.name = name;
//        this.email = email;
//        this.roles = roles;
//    }
    public UserDTO(Long id, String name, String email) {
        super();
        this.id = id;
        this.name = name;
        this.email = email;
    }
    public UserDTO(User user) {
        super();
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.avatar = user.getAvatar();
        this.phone = user.getPhone();
        this.gender = user.isGender();
    //        this.setRoles(user.getRoles());
    }
//    public void setRoles(Set<Role> roles) {
//        this.roles = roles.stream().map(Role::getDescription).collect(Collectors.toSet());
//    }
}
