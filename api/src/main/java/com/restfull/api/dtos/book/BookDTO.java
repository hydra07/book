package com.restfull.api.dtos.book;

import com.restfull.api.entities.Book;
import com.restfull.api.entities.User;
import com.restfull.api.enums.Rate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookDTO {
    private Long id;
    private String title;
    private String description;
    private List<String> images;
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
        this.images = book.getImagesString();
        this.types = book.getTypesString();
        this.status = book.getStatus().toString();
        this.price = book.getPrice();
        this.followedUsers = book.getFollowedUsersString();
        this.rate = book.getRateString();
        this.createdAt = book.getCreatedAt();
        this.lastUpdateAt = book.getLastUpdateAt();
        this.url = book.getUrl();
    }

}
