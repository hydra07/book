package com.restfull.api.dtos.book;

import com.restfull.api.entities.Book;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookDTO {
    private Long id;
    private String title;
    private String description;
    private String imageUrl;
    private Set<String> types;
    private String status;
    private Double price;
    private Set<String> followedUsers;
    private Set<Integer> rate;
    private Date createdAt;
    private Date lastUpdateAt;
    private String url;

    public BookDTO(Book book) {
        this.id = book.getId();
        this.title = book.getTitle();
        this.description = book.getDescription();
        this.imageUrl = book.getImageUrl();

        this.types = book.getTypesString();
        this.status = book.getStatus().toString();
        this.followedUsers = book.getFollowedUsersString();
        this.rate = book.getRateString();
        this.createdAt = book.getCreatedAt();
        this.lastUpdateAt = book.getLastUpdateAt();
        this.url = book.getUrl();
    }
}
