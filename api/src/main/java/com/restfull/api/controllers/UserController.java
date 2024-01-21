package com.restfull.api.controllers;

import com.restfull.api.dtos.UserDTO;
import com.restfull.api.entities.User;
import com.restfull.api.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
        final List<UserDTO> dtos = users.stream().map(p -> new UserDTO(p)).toList();
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

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

}

