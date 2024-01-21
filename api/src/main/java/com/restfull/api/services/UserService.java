package com.restfull.api.services;

import com.restfull.api.dtos.UserDTO;
import com.restfull.api.entities.User;
import com.restfull.api.enums.Role;
import com.restfull.api.repositories.UserRepository;
import com.restfull.api.utils.NotFoundException;
import com.restfull.api.utils.DuplicationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public User findById(Long id) {
        return repository.findById(id).orElseThrow(
                () -> new NotFoundException("User not found: " + id));
    }

    public User findByEmail(String email) {
        return repository.findByEmail(email).orElseThrow(
                () -> new NotFoundException("User not found: " + email));
    }

    public List<User> findAll() {
        return repository.findAll();
    }

    public User create(User User) {
        User.setId(null);
        User.addRole(Role.USER);
        checkEmailDuplication(User);
        return repository.save(User);
    }

    public UserDTO create(UserDTO dto) {
        return new UserDTO(create(new User(dto)));
    }

    public User update(User User) {
        checkEmailDuplication(User);
        User p = findById(User.getId());
        p.setName(User.getName());
        p.setEmail(User.getEmail());
        p.setRoles(User.getRoles());
        return repository.save(p);
    }

    public void delete(Long id) {
        final User p = findById(id);
        repository.delete(p);
    }

    private void checkEmailDuplication(User User) {
        final String email = User.getEmail();
        if (email != null && email.length() > 0) {
            final Long id = User.getId();
            final User p = repository.findByEmail(email).orElse(null);
            if (p != null && Objects.equals(p.getEmail(), email) && !Objects.equals(p.getId(), id)) {
                throw new DuplicationException("Email duplication: " + email);
            }
        }
    }
}
