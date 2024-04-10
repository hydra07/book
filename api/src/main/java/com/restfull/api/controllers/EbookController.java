package com.restfull.api.controllers;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import com.restfull.api.entities.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restfull.api.dtos.book.BookmarkRequestDTO;
import com.restfull.api.dtos.book.ReaderRequestDTO;
import com.restfull.api.dtos.book.ReaderResponseDTO;
import com.restfull.api.entities.BookReader;
import com.restfull.api.entities.Bookmark;
import com.restfull.api.entities.User;
import com.restfull.api.services.BookReaderService;
import com.restfull.api.services.JwtService;

@RestController
@RequestMapping("/ebook")
public class EbookController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private BookReaderService bookReaderService;

    @GetMapping("/fetch/{id}")
    public ResponseEntity<?> fetchBook(@RequestHeader("Authorization") String token, @PathVariable Long id) {
        try {
            User user = jwtService.getUser(jwtService.validateRequestHeader(token));
            BookReader bookReader = bookReaderService.readBook(user.getId(), id);
            ReaderResponseDTO res = new ReaderResponseDTO(bookReader);
            return ResponseEntity.ok(res);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/read/{id}")
    public ResponseEntity<?> readBook(@RequestHeader("Authorization") String token, @PathVariable Long id,
            @RequestBody ReaderRequestDTO dto) {
        try {
            User user = jwtService.getUser(jwtService.validateRequestHeader(token));
            BookReader bookReader = bookReaderService.readBook(user.getId(), id);
            System.out.println(dto.toString());
//            if (dto.getBookmarks() != null) {
//                bookReader.setBookmarks(dto.getBookmarks().stream().map(Bookmark::new).toList());
//            }
            // bookReader.setLastCurrentCfi(dto.getLastCurrentCfi());
            bookReader.setChapterName(dto.getChapterName());
            bookReader.setCurrentPage(dto.getCurrentPage());
            bookReader.setTotalPage(dto.getTotalPage());
            bookReader.setStartCfi(dto.getStartCfi());
            bookReader.setEndCfi(dto.getEndCfi());
            bookReader.setBase(dto.getBase());
            bookReaderService.updateBookReader(bookReader);
            ReaderResponseDTO res = new ReaderResponseDTO(bookReader);
            return ResponseEntity.ok(res);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

//    @PostMapping("/bookmark")
//    public ResponseEntity<?> addBookmark(@RequestHeader("Authorization") String token,
//            @RequestBody List<BookmarkRequestDTO> lsDto) {
//        List<Bookmark> bookmarks = lsDto.stream().map(Bookmark::new).toList();
//
////          List<Bookmark> bm = lsDto.stream()
////                .map(Bookmark::new)
////                .toList();
////          List<BookmarkRequestDTO> rs = bm.stream().map(BookmarkRequestDTO::new).toList();
//
//        return ResponseEntity.ok(rs);
//    }

    @PostMapping("/bookmark/{id}")
    public ResponseEntity<?> addBookmark(@RequestHeader("Authorization") String token, @PathVariable Long id, @RequestBody ReaderRequestDTO dto){
        User user = jwtService.getUser(jwtService.validateRequestHeader(token));
        BookReader bookReader = bookReaderService.findBookReader(user.getId(), id);
        if (dto.getBookmarks() != null) {
            bookReader.setBookmarks(dto.getBookmarks().stream().map(Bookmark::new).toList());
        }
        bookReaderService.updateBookReader(bookReader);
        return ResponseEntity.ok(new ReaderResponseDTO(bookReader));
    }

    @PostMapping("/bookmark/demo")
    public ResponseEntity<?> testBookmark(@RequestBody BookmarkRequestDTO dto) {
        return ResponseEntity.ok(dto);
    }
}
