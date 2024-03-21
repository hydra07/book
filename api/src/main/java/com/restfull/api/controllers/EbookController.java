package com.restfull.api.controllers;

import com.restfull.api.dtos.book.BookmarkRequestDTO;
import com.restfull.api.dtos.book.ReaderRequestDTO;
import com.restfull.api.dtos.book.ReaderResponseDTO;

import com.restfull.api.entities.BookReader;
import com.restfull.api.entities.Bookmark;
import com.restfull.api.entities.User;
import com.restfull.api.services.BookReaderService;
import com.restfull.api.services.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/ebook")
public class EbookController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private BookReaderService bookReaderService;

    @PostMapping("/read/{id}")
    public ResponseEntity<?> readBook(@RequestHeader("Authorization") String token, @PathVariable Long id, @RequestBody ReaderRequestDTO dto) {
        try {
            User user = jwtService.getUser(jwtService.validateRequestHeader(token));
            BookReader bookReader = bookReaderService.readBook(user.getId(), id);
            bookReader.setBookmarks(dto.getBookmarks().stream().map(Bookmark::new).collect(Collectors.toList()));
            bookReader.setLastCurrentCfi(dto.getLastCurrentCfi());
            bookReaderService.updateBookReader(bookReader);
            ReaderResponseDTO res = new ReaderResponseDTO(bookReader);
            return ResponseEntity.ok(res);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/bookmark")
    public ResponseEntity<?> addBookmark(@RequestHeader("Authorization") String token, @RequestBody List<BookmarkRequestDTO> lsDto){
        return ResponseEntity.ok(lsDto);
    }

    @PostMapping("/bookmark/demo")
    public ResponseEntity<?> testBookmark(@RequestBody BookmarkRequestDTO dto){
        return ResponseEntity.ok(dto);
    }
}
