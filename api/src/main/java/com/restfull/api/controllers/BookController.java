package com.restfull.api.controllers;

import com.restfull.api.dtos.book.*;
import com.restfull.api.entities.*;
import com.restfull.api.services.BookService;
import com.restfull.api.services.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/book")
public class BookController {

    // @Autowired
    // private UserService userService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private BookService bookService;

    @GetMapping("/getAll")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(bookService.findAll().stream().map(BookResponseDTO::new).collect(Collectors.toList()));
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody BookRequestDTO book) {
        bookService.createBook(book);
        return ResponseEntity.ok("Successfully added!");
    }

    @PostMapping("/find/{id}")
    public ResponseEntity<?> find(@PathVariable Long id) {
        return ResponseEntity.ok(new BookResponseDTO(bookService.findById(id)));
    }

    @GetMapping("/search")
    public ResponseEntity<SearchResponseDTO> searchBooks(
            @RequestParam(name = "keyword", defaultValue = "") String keyword) {
        List<BookDTO> foundBooksByTitle = bookService.searchBooksByTitle(keyword);
        List<AuthorDTO> foundAuthorsByBook = bookService.searchByAuthor(keyword);
        List<TypeDTO> foundTypesByBook = bookService.searchByType(keyword);
        return ResponseEntity.ok(new SearchResponseDTO(foundBooksByTitle, foundAuthorsByBook, foundTypesByBook));
    }

    @PostMapping("/views/{id}")
    public ResponseEntity<?> views(@PathVariable Long id) {
        bookService.increaseViews(id);
        return ResponseEntity.ok(new BookResponseDTO(bookService.findById(id)));
    }

    @GetMapping("/sorted-by-views")
    public ResponseEntity<List<BookResponseDTO>> sortedByViews() {
        List<Book> books = bookService.findAllSortedByViews();
        List<BookResponseDTO> bookResponseDTOs = books.stream().map(BookResponseDTO::new).collect(Collectors.toList());
        return ResponseEntity.ok(bookResponseDTOs);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateBook(@PathVariable Long id, @RequestBody BookRequestDTO book) {
        bookService.update(book);
        return ResponseEntity.ok(new BookResponseDTO(bookService.findById(id)));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.ok("Successfully deleted!");
    }

    @GetMapping("/comment/{id}")
    public ResponseEntity<?> comment(@PathVariable Long id) {
        List<Comment> comments = bookService.getComment(id);
        return ResponseEntity.ok(comments.stream().map(CommentDTO::new).collect(Collectors.toList()));
    }

    @PostMapping("/comment/{id}")
    public ResponseEntity<?> comment(@PathVariable Long id, @RequestHeader("Authorization") String token,
            @RequestBody CommentDTO dto) {
        try {
            User user = jwtService.getUser(jwtService.validateRequestHeader(token));
            Book book = bookService.findById(id);
            System.out.println(user.getEmail() + " : " + book.getTitle());
            Comment comment = bookService.addComment(book, user, dto);
            return ResponseEntity.ok(new CommentDTO(comment));
        } catch (Exception e) {
            // return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/addComment/{bookId}")
    public ResponseEntity<?> addComment(@PathVariable Long bookId, @RequestHeader("Authorization") String token,
            @RequestBody CommentDTO dto) {
        User user = jwtService.getUser(jwtService.validateRequestHeader(token));
        Book book = bookService.findById(bookId);
        Comment comment = bookService.newComment(book, user, dto);
        return ResponseEntity.ok(new CommentDTO(comment));

    }

    @PostMapping("/repyComment/{bookId}")
    public ResponseEntity<?> replyComment(@PathVariable Long bookId, @RequestHeader("Authorization") String token,
            @RequestBody CommentDTO dto) {
        User user = jwtService.getUser(jwtService.validateRequestHeader(token));
        Book book = bookService.findById(bookId);
        Comment comment = bookService.replyComment(dto.getParent().getId(), book, user, dto);
        return ResponseEntity.ok(new CommentDTO(comment));
    }

    @GetMapping("getRootComment/{bookId}")
    public ResponseEntity<?> getCommentById(@PathVariable Long bookId) {
        // Book book = bookService.findById(bookId);
        List<Comment> comments = bookService.getRootCommentByBookId(bookId);
        comments.stream().peek(comment -> System.out.println(comment.getId())).collect(Collectors.toList());
        return ResponseEntity.ok(comments.stream().map(CommentDTO::new).toList());
    }

    @GetMapping("getAllCommentByBook/{bookId}")
    public ResponseEntity<?> getAllCommentByBook(@PathVariable Long bookId) {
        List<Comment> comments = bookService.getCommentByBookId(bookId);
        return ResponseEntity.ok(comments.stream().map(CommentDTO::new).toList());
    }
    // @GetMapping("getTreeComment/{bookId}")
    // public ResponseEntity<?> getTreeComment(@PathVariable Long bookId){
    // List<Comment> comments = bookService.getCommentTreeByBookId(bookId);
    // return ResponseEntity.ok(comments.stream().map(CommentDTO::new).toList());
    // }
    // @PostMapping("/addTypeToBook/{bookId}")
    // public ResponseEntity<?> addTypeToBook(@PathVariable long bookId,
    // @RequestBody TypeRequestDTO typeDTO) {
    // try {
    // bookService.addTypeToBook(bookId, typeDTO);
    // return ResponseEntity.ok("Successfully added!");
    // } catch (Exception e) {
    // return ResponseEntity.badRequest().body(e.getMessage());
    // }
    // }

    // @PostMapping("/removeTypeFromBook/{bookId}")
    // public ResponseEntity<?> removeTypeFromBook(@RequestBody TypeRequestDTO
    // typeDTO, @PathVariable long bookId) {
    // try {
    // bookService.removeTypeFromBook(bookId, typeDTO);
    // return ResponseEntity.ok("Successfully removed!");
    // } catch (Exception e) {
    // return ResponseEntity.badRequest().body(e.getMessage());
    // }
    // }

}
