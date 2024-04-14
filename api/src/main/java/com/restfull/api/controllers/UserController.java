package com.restfull.api.controllers;

import com.restfull.api.dtos.user.UserRequestDTO;
import com.restfull.api.dtos.user.UserResetPasswordDTO;
import com.restfull.api.dtos.user.UserResponseDTO;
import com.restfull.api.entities.User;
import com.restfull.api.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService service;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private BookService bookService;
    @Autowired
    private AuthService authService;
    @Autowired
    private FollowService followService;

    @GetMapping("/getAll")
    public ResponseEntity<?> findAll() {
        final List<User> users = service.findAll();
        final List<UserResponseDTO> dtos = users.stream().map(UserResponseDTO::new).toList();
        return ResponseEntity.ok(dtos);
    }
//    public ResponseEntity<UserDTO> create(@RequestBody UserDTO dto) {
//        dto.setPassword(passwordEncoder.encode(dto.getPassword()));
//        return ResponseEntity.ok(service.create(dto));
//    }
//    public ResponseEntity<UserDTO> update(@RequestBody UserDTO dto) {
//        dto.setPassword(passwordEncoder.encode(dto.getPassword()));
//        return ResponseEntity.ok(service.create(dto));
//    }

    @GetMapping("/getUser")
    public ResponseEntity<?> getUser(@RequestHeader("Authorization") String token) {
        token = jwtService.validateRequestHeader(token);
        return ResponseEntity.ok(new UserResponseDTO(jwtService.getUser(token)));
    }

    @PostMapping("/profile")
    public ResponseEntity<?> profile(@RequestHeader("Authorization") String token, @RequestBody UserRequestDTO dto) {
        try {
            User user = jwtService.getUser(jwtService.validateRequestHeader(token));
            user.setPhone(dto.getPhone());
            service.checkPhoneDuplication(user);
            user.setName(dto.getName());
            user.setAvatar(dto.getImage());
            user.setGender(dto.isGender());
            return ResponseEntity.ok(new UserResponseDTO(service.update(user)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/resetPassword")
    public ResponseEntity<?> resetPassword(@RequestHeader("Authorization") String token, @RequestBody UserResetPasswordDTO dto) {
        try {
            User user = jwtService.getUser(jwtService.validateRequestHeader(token));
            user.setPassword(dto.getPassword());
            return ResponseEntity.ok(new UserResponseDTO(authService.resetPassword(dto)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

//    @PostMapping("/followBook/{id}")
//    public ResponseEntity<?> followBook(@RequestHeader("Authorization") String token, @PathVariable Long id) {
//        try {
//            User user = jwtService.getUser(jwtService.validateRequestHeader(token));
//            Book book = bookService.findById(id);
//            bookService.addFollowedUser(book, user);
//            return ResponseEntity.ok(new UserResponseDTO(service.findById(user.getId())));
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }

//    @PostMapping("/unfollowBook/{id}")
//    public ResponseEntity<?> unfollowBook(@RequestHeader("Authorization") String token, @PathVariable Long id) {
//        try {
//            User user = jwtService.getUser(jwtService.validateRequestHeader(token));
//            Book book = bookService.findById(id);
//            bookService.removeFollowedUser(book, user);
//            return ResponseEntity.ok(new UserResponseDTO(service.findById(user.getId())));
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }

//    @GetMapping("/getFollower")
//    public ResponseEntity<?> getFollower(@RequestHeader("Authorization") String token) {
//        try {
//            User user = jwtService.getUser(jwtService.validateRequestHeader(token));
//            List<Follow> followers = followService.getFollowers(user);
//            UserResponseDTO userResponseDTO = new UserResponseDTO(user);
//            userResponseDTO.setFollowers(followers);
//            return ResponseEntity.ok(userResponseDTO);
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }
//
//    @GetMapping("/getFollowing")
//    public ResponseEntity<?> getFollowing(@RequestHeader("Authorization") String token) {
//        try {
//            User user = jwtService.getUser(jwtService.validateRequestHeader(token));
//            List<Follow> following = followService.getFollowing(user);
//            UserResponseDTO userResponseDTO = new UserResponseDTO(user);
//            userResponseDTO.setFollowing(following);
//            return ResponseEntity.ok(userResponseDTO);
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }

    @GetMapping("/isFollowing/{id}")
    public ResponseEntity<?> isFollowing(@RequestHeader("Authorization") String token, @PathVariable Long id) {
        try {
            User follower = jwtService.getUser(jwtService.validateRequestHeader(token));
            User followed = service.findById(id);
            System.out.println(follower.getEmail() + " following " + followed.getEmail());
            return ResponseEntity.ok(followService.isFollowing(follower, followed));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/follow/{id}")
    public ResponseEntity<?> following(@RequestHeader("Authorization") String token, @PathVariable Long id) {
        try {
            User follower = jwtService.getUser(jwtService.validateRequestHeader(token));
            User followed = service.findById(id);
            followService.follow(follower, followed);
            return ResponseEntity.ok("Following successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/unfollow/{id}")
    public ResponseEntity<?> unfollowing(@RequestHeader("Authorization") String token, @PathVariable Long id) {
        try {
            User follower = jwtService.getUser(jwtService.validateRequestHeader(token));
            User followed = service.findById(id);
            followService.unfollow(follower, followed);
            return ResponseEntity.ok("Unfollowing successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


}

