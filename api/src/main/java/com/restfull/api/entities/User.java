package com.restfull.api.entities;

import com.restfull.api.enums.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Getter
@Setter
@Table(name = "users")
public class User implements Serializable, UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "gen_users_id")
    @SequenceGenerator(name = "gen_users_id", sequenceName = "seq_users_id", allocationSize = 1)
    private Long id;

    @Column(nullable = false, length = 50, columnDefinition = "NVARCHAR(250)")
    private String name;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false, length = 60)
    private String password;

    @Column(nullable = true, length = 300)
    private String avatar;

    @Column(nullable = true, length = 10)
    private String phone;

    @Column(nullable = true, columnDefinition = "BIT")
    private boolean gender;//true là nam, false là nữ

    @ManyToMany(mappedBy = "followedBook", fetch = FetchType.EAGER)
    private Set<Book> followedBooks = new HashSet<>();

    @Column(name = "role")
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "users_role")
    private Set<Integer> roles = new HashSet<>(Collections.singletonList(Role.USER.getId()));

    public User() {
        super();
    }

    // -----------------ROLE-----------------------------------------------------------------------------------------------
    public Set<Role> getRoles() {
        return roles.stream().map(Role::fromId).collect(Collectors.toSet());
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
