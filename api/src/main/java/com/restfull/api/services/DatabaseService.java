package com.restfull.api.services;

import com.restfull.api.entities.User;
import com.restfull.api.enums.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class DatabaseService {
    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void initializeDatabase() {

        System.out.println("Initializing database...");

        final User user1 = new User("Emma", "emma@mail.com", passwordEncoder.encode("111"),"0987654321");
        final User user2 = new User("Jhon", "jhon@mail.com", passwordEncoder.encode("222"),"0987654322");
        final User admin = new User("Anna", "anna@mail.com", passwordEncoder.encode("333"),"0987654323");

        admin.addRole(Role.ADMIN);
        System.out.println(userService.create(user1));
        System.out.println(userService.create(user2));
        System.out.println(userService.create(admin));

        System.out.println("Database initialized!");
    }
}
