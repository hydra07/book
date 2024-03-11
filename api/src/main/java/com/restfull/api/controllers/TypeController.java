package com.restfull.api.controllers;

import com.restfull.api.dtos.book.TypeResponseDTO;
import com.restfull.api.dtos.book.BookRequestDTO;
import com.restfull.api.dtos.book.TypeRequestDTO;
import com.restfull.api.entities.Type;
import com.restfull.api.services.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/type")
public class TypeController {

    @Autowired
    private TypeService typeService;

    @GetMapping("/getAll")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(typeService.getAllTypes().stream().map(TypeResponseDTO::new).collect(Collectors.toList()));
    }

    @GetMapping("/getList")
    public ResponseEntity<?> getList() {
        return ResponseEntity.ok(typeService.getAllTypes().stream().map(Type::getName).collect(Collectors.toList()));
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody TypeRequestDTO type) {
        try {
            System.out.println(type.toString());
            typeService.createNewType(type);
            return ResponseEntity.ok( type.getName()+" successfully added!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/addBookToType")
    public ResponseEntity<?> addBookToType(@RequestBody TypeRequestDTO type, @RequestBody BookRequestDTO book) {
        try {
            typeService.addBookToType(type, book);
           return ResponseEntity.ok("Successfully added!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
