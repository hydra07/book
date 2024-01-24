package com.restfull.api.services;

import java.util.List;
import java.util.Objects;

import com.restfull.api.entities.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restfull.api.dtos.user.UserDTO;
import com.restfull.api.entities.User;
import com.restfull.api.enums.Role;
import com.restfull.api.repositories.UserRepository;
import com.restfull.api.utils.DuplicationException;
import com.restfull.api.utils.NotFoundException;

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

    public User update(User user) {
        checkPhoneDuplication(user);
        User _user = findByEmail(user.getEmail());
        System.out.println(_user.toString());
        System.out.println(user.toString());
        _user.setName(user.getName());
        _user.setPhone(user.getPhone());
        _user.setAvatar(user.getAvatar());
        return repository.save(_user);
    }
    //     public User update(User User) {
//         checkEmailDuplication(User);
//         User p = findById(User.getId());
//         p.setName(User.getName());
//         p.setEmail(User.getEmail());
// //        p.setRoles(User.getRoles());
//         return repository.save(p);
//     }

    public void delete(Long id) {
        final User _user = findById(id);
        repository.delete(_user);
    }


//    public User addFollower(String email, User user){
//        final User _user = findByEmail(email);
//        _user.addFollower(user);
//        System.out.println(_user.getFollowers());
//        return repository.save(_user);
//    }

    private void checkEmailDuplication(User User) {
        final String email = User.getEmail();
        if (!email.isEmpty()) {
            final Long id = User.getId();
            final User _user = repository.findByEmail(email).orElse(null);
            if (_user != null && Objects.equals(_user.getEmail(), email) && !Objects.equals(_user.getId(), id)) {
                throw new DuplicationException("Email duplication: " + email);
            }
        }
    }

    private void checkPhoneDuplication(User user) {
        final String phone = user.getPhone();
        if (!phone.isEmpty()) {
            final String email = user.getEmail();
            final User _user = repository.findByPhone(phone).orElse(null);
            if (_user != null && Objects.equals(_user.getPhone(), phone) && !Objects.equals(_user.getEmail(), email)) {
                throw new DuplicationException("Phone duplication: " + phone);
            }
        }
    }
}
