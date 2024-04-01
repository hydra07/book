package com.restfull.api.controllers;

import com.restfull.api.dtos.book.BookRequestDTO;
import com.restfull.api.dtos.book.BookResponseDTO;
import com.restfull.api.services.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/book")
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping("/getAll")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(bookService.findAll().stream().map(BookResponseDTO::new).collect(Collectors.toList()));
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody BookRequestDTO book) {
        System.out.println(book.toString());
        return ResponseEntity.ok(new BookResponseDTO(bookService.createBook(book)));
    }

    @PostMapping("/find/{id}")
    public ResponseEntity<?> find(@PathVariable Long id) {
        return ResponseEntity.ok(new BookResponseDTO(bookService.findById(id)));
    }

    @GetMapping(value = "search")
    public ResponseEntity<?> search(@RequestParam(name = "keyword", defaultValue = "") String keyword) {
        return ResponseEntity.ok(bookService.searchBook(keyword));
    }
    // @GetMapping("/search")
    // public ResponseEntity<?> find(@RequestParam(name = "keyword", defaultValue =
    // "") String name) {

    // return ResponseEntity.ok(new BookResponseDTO(bookService.findByTitle("")));
    // }

    @PostMapping("/views/{id}")
    public ResponseEntity<?> views(@PathVariable Long id) {
        bookService.increaseViews(id);
        return ResponseEntity.ok(new BookResponseDTO(bookService.findById(id)));
    }

}
