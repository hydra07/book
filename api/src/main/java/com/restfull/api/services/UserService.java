package com.restfull.api.services;


import com.restfull.api.entities.User;
import com.restfull.api.enums.Role;
import com.restfull.api.repositories.UserRepository;
import com.restfull.api.utils.DuplicationException;
import com.restfull.api.utils.NotFoundException;
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

//    public UserDTO create(UserDTO dto) {
//        return new UserDTO(create(new User(dto)));
//    }

    public User update(User user) {
        checkPhoneDuplication(user);
        User _user = findByEmail(user.getEmail());
        _user.setName(user.getName());
        _user.setPhone(user.getPhone());
        _user.setAvatar(user.getAvatar());
        _user.setGender(user.isGender());
        return repository.save(_user);
    }

    public User updatePassword(User user) {
        User _user = findByEmail(user.getEmail());
        _user.setPassword(user.getPassword());
        return repository.save(_user);
    }

//    /**
//     * @param dto UserRequestDTO
//     * no update password/email/
//     * @return
//     */
//    @Transactional
//    public User update(UserRequestDTO dto) {
//        User user = findById(dto.getId());
//        user.setName(dto.getName());
//        user.setPhone(dto.getPhone());
//        user.setAvatar(dto.getImage());
//        checkPhoneDuplication(user);
//        return repository.save(user);
//    }

//    public User resetPassword(User user) {
//        User _user = findByEmail(user.getEmail());
//        if (isPasswordMatches(user.getPassword(), _user.getPassword())) {
//            _user.setPassword(encodePassword(user.getPassword()));
//        } else {
//            throw new NotFoundException("Password not match");
//        }
//        return repository.save(_user);
//    }

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
//    private boolean isPasswordMatches(String rawPassword, String encodedPassword) {
//        return passwordEncoder.matches(rawPassword, encodedPassword);
//    }
//
//    private String encodePassword(String password) {
//        return passwordEncoder.encode(password);
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

    public void checkPhoneDuplication(User user) {
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
