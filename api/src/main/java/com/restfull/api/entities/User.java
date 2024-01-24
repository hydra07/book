package com.restfull.api.entities;

import java.io.Serializable;
import java.util.*;
import java.util.stream.Collectors;

import jakarta.persistence.criteria.Predicate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.restfull.api.dtos.user.UserDTO;
import com.restfull.api.enums.Role;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "users")
public class User implements Serializable, UserDetails {
    @Setter
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "gen_users_id")
    @SequenceGenerator(name = "gen_users_id", sequenceName = "seq_users_id", allocationSize = 1)
    private Long id;

    @Setter
    @Getter
    @Column(nullable = false, length = 50)
    private String name;

    @Setter
    @Getter
    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Setter
    @Getter
    @Column(nullable = false, length = 60)
    private String password;

    @Setter
    @Getter
    @Column(nullable = true, length = 300)
    private String avatar;

    @Setter
    @Getter
    @Column(nullable = true, length = 10)
    private String phone;

    @Setter
    @Getter
    @Column(nullable = true, length = 1)
    private boolean gender;

    @Setter
    @Getter
    @ManyToMany(mappedBy = "followedBook",fetch = FetchType.EAGER)
    private Set<Book> followedBooks = new HashSet<>();

    @Column(name = "role")
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "users_role")
    private Set<Integer> roles = new HashSet<>(Arrays.asList(Role.USER.getId()));

    public User() {
        super();
    }

    // Simple User
    public User(String name, String email, String password, String phone) {
        super();
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
    }

    public User(Long id, String name, String email, String password, Set<Role> roles) {
        super();
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.setRoles(roles);
    }

    public User(String name, String email, String password) {
        super();
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public User(String name, String email, String password, String phone, String avatar, Boolean gender) {
        super();
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.avatar = avatar;
        this.gender = gender;
    }

    public User(UserDTO dto) {
        this(dto.getName(), dto.getEmail(), dto.getPassword(), dto.getPhone(), dto.getAvatar(), dto.getGender());
        this.setId(dto.getId());
        // this.setStringRoles(dto.getRoles());
    }

    // -----------------FOLLOW BOOK---------------------------------------------------------------------------------------
    public Set<String>  getBooksString(){
        return this.followedBooks.stream().map(Book::getTitle).collect(Collectors.toSet());
    }
    // -----------------ROLE-----------------------------------------------------------------------------------------------
    public Set<Role> getRoles() {
        return roles.stream().map(r -> Role.fromId(r)).collect(Collectors.toSet());
    }

    public void setRoles(Set<Role> roles) {
        if (roles == null || roles.isEmpty())
            this.roles.clear();
        else
            this.roles = roles.stream().map(Role::getId).collect(Collectors.toSet());
    }

    public void setStringRoles(Set<String> roles) {
        if (roles == null || roles.isEmpty())
            this.roles.clear();
        else
            this.roles = roles.stream().map(s -> Role.fromDescription(s).getId()).collect(Collectors.toSet());
    }

    public void addRole(Role role) {
        this.roles.add(role.getId());
    }

    // ---------------Auth---------------------------------------------------------------------------------------------------
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream()
                .map(r -> new SimpleGrantedAuthority(Role.fromId(r).name()))
                .collect(Collectors.toSet());
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String toString() {
        return "User [id=" + id + ", name=" + name + ", email=" + email +
                ", phone=" + phone + ", avatar=" + avatar + ", roles=" + getRoles() + "]";
        // return "User [id=" + id + ", name=" + name + ", email=" + email + ", roles="
        // + getRoles() + "]";
    }
}
