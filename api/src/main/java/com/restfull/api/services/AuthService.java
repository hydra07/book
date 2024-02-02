package com.restfull.api.services;

import com.restfull.api.dtos.auth.*;
import com.restfull.api.dtos.user.UserResetPasswordDTO;
import com.restfull.api.dtos.user.UserResponseDTO;
import com.restfull.api.entities.User;
import com.restfull.api.utils.NotFoundException;
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
        return new AuthResponseDTO(jwtService.generateToken(user.getEmail()), "Registered successfully");
    }

    public AuthResponseDTO authenticate(AuthRequestDTO dto) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword()));
        final User user = userService.findByEmail(dto.getEmail());
        return new AuthResponseDTO(jwtService.generateToken(user.getEmail()), "Authenticated successfully");
    }

    public AuthDTO login(AuthRequestDTO dto) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword()));
        final User user = userService.findByEmail(dto.getEmail());
        return new AuthDTO(jwtService.generateToken(user.getEmail()), "Authenticated successfully", new UserResponseDTO(user));
    }

    public AuthResponseDTO authenticateGoogle(GoogleRequestDTO dto) {
        User user;
        try {
            user = userService.findByEmail(dto.getEmail());
        } catch (Exception e) {
            user = null;
        }
        if (user == null) {
            // create user
            user = new User();
            user.setName(dto.getName());
            user.setEmail(dto.getEmail());
            user.setPassword(passwordEncoder.encode(dto.getPassword()));
            user.setAvatar(dto.getAvatar());
            user.setPhone(dto.getPhone());
            user = userService.create(user);
            return new AuthResponseDTO(jwtService.generateToken(user.getEmail()), "Registered successfully");
        } else {
            // authenticate user
//            System.out.println(dto.getEmail() + user.getPassword());
//            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(dto.getEmail(),dto.getPassword()));
//            return new AuthResponseDTO(jwtService.generateToken(user.getEmail()), "Authenticated successfully");
            return new AuthResponseDTO(jwtService.generateToken(user.getEmail()), "Authenticated successfully");
        }
    }

    public User resetPassword(UserResetPasswordDTO user) {
        User _user = userService.findByEmail(user.getEmail());
        if (isPasswordMatches(user.getPassword(), _user.getPassword())) {
            _user.setPassword(passwordEncoder.encode(user.getNewPassword()));
        } else {
            throw new NotFoundException("Password not match");
        }
        return userService.updatePassword(_user);
    }

    private boolean isPasswordMatches(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
}

