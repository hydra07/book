package com.restfull.api.controllers;

import com.restfull.api.dtos.book.AuthorRequestDTO;
import com.restfull.api.dtos.book.AuthorResponseDTO;
import com.restfull.api.services.AuthorService;
import com.restfull.api.services.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;


@RestController
@RequestMapping("/author")
public class AuthorController {

    @Autowired
    private AuthorService authorService;
    @Autowired
    private BookService bookService;

    @GetMapping("/getAll")
    public ResponseEntity<?> getAll() {
        try {
            return ResponseEntity.ok(authorService.findAll()
                    .stream()
                    .map(AuthorResponseDTO::new)
                    .collect(Collectors.toList()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> get(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(new AuthorResponseDTO(authorService.findById(id)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody AuthorRequestDTO dto) {
        try {
            authorService.createAuthor(dto);
            return ResponseEntity.ok("Successfully added!");
//            return ResponseEntity.ok(new AuthorResponseDTO(authorService.createAuthor(dto)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody AuthorRequestDTO dto) {
        try {
            authorService.update(id, dto);
            return ResponseEntity.ok("Successfully updated!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @DeleteMapping("/delete/{id}")  // delete author by id
    public ResponseEntity<?> delete(@PathVariable Long id) {
              authorService.deleteBookByAuthorID(id);
            authorService.deleteAuthor(id);
            return ResponseEntity.ok("Successfully deleted!");


    }
}
