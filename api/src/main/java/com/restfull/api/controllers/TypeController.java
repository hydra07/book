package com.restfull.api.controllers;

import com.restfull.api.dtos.book.TypeResponseDTO;
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
        System.out.println(type.toString());
        return ResponseEntity.ok(new TypeResponseDTO((typeService.createType(type))));
    }

    //Đại code
    // @PostMapping("/addBookToType")
    // public ResponseEntity<?> addBookToType(@RequestBody TypeRequestDTO type, BookRequestDTO book) {
    //     System.out.println(type.toString());

        
    //     return ResponseEntity.ok(new TypeResponseDTO((typeService.addBookToType(type, book))));     //error ngay khúc ni tại bên service trả 
    // }                                                                                               //về boolean mà t không biết phải làm như nào
    

}
