package com.restfull.api.dtos.book;

import com.restfull.api.entities.Book;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.text.SimpleDateFormat;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Setter
@Getter
@AllArgsConstructor
class BookAuthor {
    private Long id;
    private String name;
}

@Setter
@Getter
@AllArgsConstructor
class BookType {
    private Long id;
    private String name;
}

@Getter
@Setter
public class BookResponseDTO {
    private Long id;
    private String title;
    private BookAuthor author;
    private String description;
    private Set<BookType> types = new HashSet<>();
    private Long views;
    // private double price;
    private String createdAt;
    private String lastUpdateAt;
    private Double rating;
    private Long reviews;
    private String imageUrl;
    private String url;
    private String status;
    private String Comment;

    public BookResponseDTO(Book book) {
        this.id = book.getId();
        this.title = book.getTitle();
        this.author = new BookAuthor(book.getAuthor().getId(), book.getAuthor().getName());
        this.description = book.getDescription();
        this.types = book.getTypes()
                .stream()
                .map(type -> new BookType(type.getId(), type.getName())).collect(Collectors.toSet());
        this.views = book.getViews();
        // this.createdAt = book.getCreatedAt();
        // this.lastUpdateAt = book.getLastUpdateAt();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        this.createdAt = dateFormat.format(book.getCreatedAt());
        this.lastUpdateAt = dateFormat.format(book.getLastUpdateAt());
        this.rating = book.getAverageRate();
        this.reviews = (long) book.getRate().size();
        this.imageUrl = book.getImageUrl();
        this.url = book.getUrl();
        this.status = book.getStatus().toString();
    }
}
