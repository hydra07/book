package com.restfull.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.restfull.api.dtos.auth.AuthRequestDTO;
import com.restfull.api.dtos.auth.AuthResponseDTO;
import com.restfull.api.dtos.auth.GoogleRequestDTO;
import com.restfull.api.dtos.auth.RegisterRequestDTO;
import com.restfull.api.entities.User;

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

        return new AuthResponseDTO(
                jwtService.generateToken(user.getEmail()), "Registered successfully"
                );
    }

    public AuthResponseDTO authenticate(AuthRequestDTO dto) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        dto.getEmail(),
                        dto.getPassword()));

        final User user = userService.findByEmail(dto.getEmail());
        return new AuthResponseDTO(jwtService.generateToken(user.getEmail()), "Authenticated successfully");
    }

    public AuthResponseDTO authenticateGoogle(GoogleRequestDTO dto){
        User user;
        try {
            user = userService.findByEmail(dto.getEmail());
        } catch (Exception e){
            user = null;
        }
        if(user == null){
            // create user
            user = new User();
            user.setName(dto.getName());
            user.setEmail(dto.getEmail());
            user.setPassword(passwordEncoder.encode(dto.getPassword()));
            user.setAvatar(dto.getAvatar());
            user.setPhone(dto.getPhone());
            user = userService.create(user);
            return new AuthResponseDTO(
                    jwtService.generateToken(user.getEmail()), "Registered successfully"
            );
        } else {
            // authenticate user
//            System.out.println(dto.getEmail() + user.getPassword());
//            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(dto.getEmail(),dto.getPassword()));
//            return new AuthResponseDTO(jwtService.generateToken(user.getEmail()), "Authenticated successfully");
            return new AuthResponseDTO(jwtService.generateToken(user.getEmail()), "Authenticated successfully");
        }
    }

}

