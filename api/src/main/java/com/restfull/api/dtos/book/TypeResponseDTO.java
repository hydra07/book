package com.restfull.api.dtos.book;

import com.restfull.api.entities.Book;
import com.restfull.api.entities.Type;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Setter
@Getter
class BookShort {
    private Long id;
    private String title;
    private String Author;
    private String description;
    private Long views;
    private Double rating;
    private String status;
    private String imageUrl;

    public BookShort(Book book){
        this.id = book.getId();
        this.title = book.getTitle();
        this.Author = book.getAuthor().getName();
        this.description = book.getDescription();
        this.views = book.getViews();
        this.rating = book.getAverageBookRate();
        this.status = book.getStatus().toString();
        this.imageUrl = book.getImageUrl();
    }
}
@Getter
@Setter
@AllArgsConstructor
//@NoArgsConstructor
public class TypeResponseDTO {
    private Long id;
    private String name;
    private String description;
    private Set<BookShort> books = new HashSet<>();

    public TypeResponseDTO(Type type){
        this.id = type.getId();
        this.name = type.getName();
        this.description = type.getDescription();
        this.books = type.getBooks()
                .stream()
                .map(BookShort::new)
                .collect(Collectors.toSet());
    }
}
