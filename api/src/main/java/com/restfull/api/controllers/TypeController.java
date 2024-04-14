package com.restfull.api.controllers;

import com.restfull.api.dtos.book.TypeResponseDTO;
import com.restfull.api.dtos.book.BookRequestDTO;
import com.restfull.api.dtos.book.BookResponseDTO;
import com.restfull.api.dtos.book.TypeRequestDTO;
import com.restfull.api.entities.Type;
import com.restfull.api.services.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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

//    @PostMapping("/add")
//    public ResponseEntity<?> add(@RequestBody TypeRequestDTO type) {
//        try {
//            System.out.println(type.toString());
//            typeService.createNewType(type);
//            return ResponseEntity.ok( type.getName()+" successfully added!");
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }
//
//
//    @PostMapping("/getBookByType")
//    public ResponseEntity<?> getBookByType(@RequestBody TypeRequestDTO type) {
//        try {
//            List<BookResponseDTO> bookDTOs  = typeService.getBookByType(type).stream().map(BookResponseDTO::new).collect(Collectors.toList());
//            if(bookDTOs.isEmpty()){
//                throw new Exception("No books found for the given type! Try another type!");
//            }
//            return ResponseEntity.ok(bookDTOs);
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getBook(@PathVariable Long id){
        try {
            Type type = typeService.getTypeById(id);
            return ResponseEntity.ok(new TypeResponseDTO(type));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/new")
    public ResponseEntity<?> newType(@RequestBody TypeRequestDTO dto) {
        try {
            Type type = typeService.createType(dto);
//            return ResponseEntity.ok(new TypeResponseDTO(type));
            return ResponseEntity.ok("Successfully added!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateType(@RequestBody TypeRequestDTO dto) {
        try {
            Type type = typeService.update(dto);
//            return ResponseEntity.ok(new TypeResponseDTO(type));
            return ResponseEntity.ok("Successfully updated!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteType(@PathVariable Long id) {
        try {
            typeService.delete(id);
//            return ResponseEntity.ok(new TypeResponseDTO(type));
            return ResponseEntity.ok("Deleted successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
