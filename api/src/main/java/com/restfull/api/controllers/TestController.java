package com.restfull.api.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restfull.api.dtos.HeaderRequestDTO;
import com.restfull.api.dtos.book.BookDTO;
import com.restfull.api.dtos.book.TypeDTO;
import com.restfull.api.dtos.user.UserDTO;
import com.restfull.api.entities.Book;
import com.restfull.api.entities.User;
import com.restfull.api.services.BookService;
import com.restfull.api.services.FollowService;
import com.restfull.api.services.ImageService;
import com.restfull.api.services.JwtService;
import com.restfull.api.services.TypeService;
import com.restfull.api.services.UserService;

import io.jsonwebtoken.Claims;

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

    @Autowired
    private ImageService imageService;

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
    public ResponseEntity<UserDTO> claimsUser(@RequestHeader("Authorization") String token) {
        // if (token != null && token.startsWith("Bearer ")) token = token.substring(7);
        token = jwtService.validateRequestHeader(token);
        return ResponseEntity.ok(new UserDTO(jwtService.getUser(token)));
    }

    @PostMapping("/token/profile")
    public ResponseEntity<String> editProfile(@RequestBody UserDTO userDTO) {
        try {
            String phone = userDTO.getPhone();
            if (phone.length() != 10)
                return ResponseEntity.badRequest().body("Phone number must be 10 digits");

            User user = new User(userDTO);
            userService.update(user);
            return ResponseEntity.ok("Profile edited!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/token/addFollow")
    public ResponseEntity<String> addFollow(@RequestHeader("Authorization") String token,
            @RequestBody UserDTO userDTO) {
        try {
            token = jwtService.validateRequestHeader(token);
            User user = jwtService.getUser(token);
            User _user = new User(userDTO);
            followService.follow(user, _user);
            // System.out.println(followService.isFollowing(user.getId(), _user.getId()));
            return ResponseEntity.ok("Follower added!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/token/unFollow")
    public ResponseEntity<String> unFollow(@RequestHeader("Authorization") String token, @RequestBody UserDTO userDTO) {
        try {
            token = jwtService.validateRequestHeader(token);
            User user = jwtService.getUser(token);
            User _user = new User(userDTO);
            followService.unfollow(user, _user);
            // System.out.println(followService.isFollowing(user.getId(), _user.getId()));
            return ResponseEntity.ok("Follower removed!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/token/getFollower")
    public ResponseEntity<List<UserDTO>> getFollowers(@RequestHeader("Authorization") String token) {
        try {
            token = jwtService.validateRequestHeader(token);
            User user = jwtService.getUser(token);
            List<User> followers = followService.findAllFollowersByUserId(user.getId());

            return ResponseEntity.ok(followers.stream().map(UserDTO::new).collect(Collectors.toList()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/token/addType")
    public ResponseEntity<?> addType(@RequestBody TypeDTO typeDTO) {
        try {
            typeService.createType(typeDTO);
            return ResponseEntity.ok("Type added!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/token/getType")
    public ResponseEntity<?> getType(){
        try {
            return ResponseEntity.ok(typeService.getAllTypes());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/token/addBook")
    public ResponseEntity<String> addBook(@RequestBody BookDTO bookDTO) {
        System.out.println(bookDTO);
        try {
            System.out.println(bookDTO);
            Book book = new Book(bookDTO);
//            book.setTypes(typeService.getTypeByString(bookDTO.getTypes()));
//            book.setImages(imageService.getImageByString(bookDTO.getImages()));
            imageService.getImageByString(bookDTO.getImages()).forEach(book::addImage);
            System.out.println(book);
            bookService.create(book);
            return ResponseEntity.ok("Book added!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @GetMapping("/token/getBook")
    public ResponseEntity<?> getBook() {
        try {
            List<Book> books = bookService.findAll();
            System.out.println(books);
            books.forEach(book -> {
                System.out.println(book.getTypes());
                System.out.println(book.getImages());
            });
            return ResponseEntity.ok(books.stream().map(BookDTO::new).toList());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

}