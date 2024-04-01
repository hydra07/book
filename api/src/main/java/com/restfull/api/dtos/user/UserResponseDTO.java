package com.restfull.api.dtos.user;

import com.restfull.api.entities.Book;
import com.restfull.api.entities.Follow;
import com.restfull.api.entities.User;
import com.restfull.api.enums.Role;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Setter
@Getter
class BookInfor {
    private Long id;
    private String title;
    private String author;
    private String imageUrl;

    public BookInfor(Book book) {
        this.id = book.getId();
        this.title = book.getTitle();
        this.author = book.getAuthor().getName();
        this.imageUrl = book.getImageUrl();
    }
}

@Getter
@Setter
class UserFollow {
    private Long id;
    private String name;
    private String email;
    private String image;

    public UserFollow(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.image = user.getAvatar();
    }
}

@Getter
@Setter
public class UserResponseDTO {
    private Long id;
    private String name;
    private String email;
    private String image;
    private String phone;
    private Boolean gender;
    private Set<String> role;
    private Set<BookInfor> booksFollowing;
    private List<UserFollow> followers;
    private List<UserFollow> following;

    public UserResponseDTO(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.image = user.getAvatar();
        this.phone = user.getPhone();
        this.gender = user.isGender();
        this.role = user.getRoles().stream().map(Role::getDescription).collect(Collectors.toSet());
        this.booksFollowing = user.getFollowedBooks().stream().map(BookInfor::new).collect(Collectors.toSet());
    }

    public void setFollowers(List<Follow> followers) {
        this.followers = followers.stream().map(Follow::getFollower).map(UserFollow::new).collect(Collectors.toList());
    }

    public void setFollowing(List<Follow> following) {
        this.following = following.stream().map(Follow::getFollowed).map(UserFollow::new).collect(Collectors.toList());
    }

}
