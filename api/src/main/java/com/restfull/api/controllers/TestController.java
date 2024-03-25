package com.restfull.api.controllers;

import com.restfull.api.dtos.HeaderRequestDTO;
import com.restfull.api.dtos.book.BookDTO;
import com.restfull.api.dtos.book.TypeDTO;
import com.restfull.api.dtos.book.TypeRequestDTO;
import com.restfull.api.dtos.user.UserResponseDTO;
import com.restfull.api.entities.Book;
import com.restfull.api.entities.Type;
import com.restfull.api.entities.User;
import com.restfull.api.services.*;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/test")
public class TestController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserService userService;

    @Autowired
    private FollowService followService;

    @Autowired
    private BookService bookService;

    @Autowired
    private TypeService typeService;

    // check connection
    @GetMapping("/ok")
    public ResponseEntity<String> ok() {
        return ResponseEntity.ok("Test ok!");
    }

    // check error
    @GetMapping("/error")
    public ResponseEntity<String> error() {
        throw new RuntimeException("Test error!");
    }

    // check generate token with email
    @GetMapping("/token/gen")
    public ResponseEntity<String> genToken() {
        return ResponseEntity.ok(jwtService.generateToken("test@mail.com"));
    }

    // return claims with `post`
    @PostMapping("/token/claims")
    public ResponseEntity<Claims> claims(@RequestBody HeaderRequestDTO token) {
        return ResponseEntity.ok(jwtService.getClaims(token.getToken()));
    }

    @PostMapping("/token/user")
    public ResponseEntity<User> user(@RequestBody HeaderRequestDTO token) {
        return ResponseEntity.ok(jwtService.getUser(token.getToken()));
    }

    @GetMapping("/token/user")
    public ResponseEntity<UserResponseDTO> claimsUser(@RequestHeader("Authorization") String token) {
        // if (token != null && token.startsWith("Bearer ")) token = token.substring(7);
        token = jwtService.validateRequestHeader(token);
        return ResponseEntity.ok(new UserResponseDTO(jwtService.getUser(token)));
    }

//    @PostMapping("/token/profile")
//    public ResponseEntity<String> editProfile(@RequestBody UserDTO userDTO) {
//        try {
//            String phone = userDTO.getPhone();
//            if (phone.length() != 10)
//                return ResponseEntity.badRequest().body("Phone number must be 10 digits");
//            User user = new User(userDTO);
//            userService.update(user);
//            return ResponseEntity.ok("Profile edited!");
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }

//    @PostMapping("/token/addFollow")
//    public ResponseEntity<String> addFollow(@RequestHeader("Authorization") String token,
//            @RequestBody UserDTO userDTO) {
//        try {
//            token = jwtService.validateRequestHeader(token);
//            User user = jwtService.getUser(token);
//            User _user = new User(userDTO);
//            followService.follow(user, _user);
//            // System.out.println(followService.isFollowing(user.getId(), _user.getId()));
//            return ResponseEntity.ok("Follower added!");
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }

//    @PostMapping("/token/unFollow")
//    public ResponseEntity<String> unFollow(@RequestHeader("Authorization") String token, @RequestBody UserDTO userDTO) {
//        try {
//            token = jwtService.validateRequestHeader(token);
//            User user = jwtService.getUser(token);
//            User _user = new User(userDTO);
//            followService.unfollow(user, _user);
//            // System.out.println(followService.isFollowing(user.getId(), _user.getId()));
//            return ResponseEntity.ok("Follower removed!");
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }

//    @GetMapping("/token/getFollower")
//    public ResponseEntity<List<UserDTO>> getFollowers(@RequestHeader("Authorization") String token) {
//        try {
//            token = jwtService.validateRequestHeader(token);
//            User user = jwtService.getUser(token);
//            List<User> followers = followService.findAllFollowersByUserId(user.getId());
//
//            return ResponseEntity.ok(followers.stream().map(UserDTO::new).collect(Collectors.toList()));
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body(null);
//        }
//    }

    @PostMapping("/token/addType")
    public ResponseEntity<?> addType(@RequestBody TypeRequestDTO typeDTO) {
        try {
            typeService.createType(typeDTO);
            return ResponseEntity.ok("Type added!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/token/getType")
    public ResponseEntity<?> getType() {
        try {
            List<Type> types = typeService.getAllTypes();
            return ResponseEntity.ok(types.stream().map(TypeDTO::new).collect(Collectors.toList()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

//    @PostMapping("/token/addBook")
//    public ResponseEntity<String> addBook(@RequestBody BookDTO bookDTO) {
//        System.out.println(bookDTO);
//        try {
//            bookService.createBook(bookDTO);
//            return ResponseEntity.ok("Book added!");
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }

    @GetMapping("/token/getBook")
    public ResponseEntity<?> getBook() {
        try {
            List<Book> books = bookService.findAll();
            List<BookDTO> bookDTOS = books.stream().map(BookDTO::new).toList();
            return ResponseEntity.ok(bookDTOS);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/token/getBook/{id}")
    public ResponseEntity<?> getBookById(@PathVariable("id") Long id) {
        try {
            return ResponseEntity.ok(new BookDTO(bookService.findById(id)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/token/followBook")
    public ResponseEntity<?> followBook(@RequestHeader("Authorization") String token, @RequestBody BookDTO bookDTO) {
        try {
            token = jwtService.validateRequestHeader(token);
            User user = jwtService.getUser(token);
            Book book = bookService.findById(bookDTO.getId());
            bookService.addFollowedUser(book, user);
            return ResponseEntity.ok("Book followed!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/token/unFollowBook")
    public ResponseEntity<?> unfollowBook(@RequestHeader("Authorization") String token, @RequestBody BookDTO bookDTO) {
        try {
            token = jwtService.validateRequestHeader(token);
            User user = jwtService.getUser(token);
            Book book = bookService.findById(bookDTO.getId());
            bookService.removeFollowedUser(book, user);
            return ResponseEntity.ok("Book unfollowed!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}