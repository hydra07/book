package com.restfull.api.services;

import com.restfull.api.dtos.AuthRequestDTO;
import com.restfull.api.dtos.AuthResponseDTO;
import com.restfull.api.dtos.RegisterRequestDTO;
import com.restfull.api.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    public AuthResponseDTO register(RegisterRequestDTO dto) {

        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        user = userService.create(user);

        return new AuthResponseDTO(jwtService.generateToken(user.getEmail()));
    }

    public AuthResponseDTO authenticate(AuthRequestDTO dto) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        dto.getEmail(),
                        dto.getPassword()));

        final User user = userService.findByEmail(dto.getEmail());
        return new AuthResponseDTO(jwtService.generateToken(user.getEmail()));
    }



}

