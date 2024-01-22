package com.restfull.api.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restfull.api.dtos.user.UserDTO;
import com.restfull.api.entities.User;
import com.restfull.api.services.UserService;
@RestController
@RequestMapping("/user")
public class UserController { 
    @Autowired
    private UserService service;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @GetMapping("/getAll")
    public ResponseEntity<List<UserDTO>> findAll() {
        final List<User> users = service.findAll();
        final List<UserDTO> dtos = users.stream().map(UserDTO::new).toList();
        return ResponseEntity.ok(dtos);
    }
    public ResponseEntity<UserDTO> create(@RequestBody UserDTO dto) {
        dto.setPassword(passwordEncoder.encode(dto.getPassword()));
        return ResponseEntity.ok(service.create(dto));
    }
    public ResponseEntity<UserDTO> update(@RequestBody UserDTO dto) {
        dto.setPassword(passwordEncoder.encode(dto.getPassword()));
        return ResponseEntity.ok(service.create(dto));
    }

}

