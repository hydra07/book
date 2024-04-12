package com.restfull.api.dtos.book;

import com.restfull.api.entities.Author;
import com.restfull.api.entities.Book;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthorDTO {
    private Long id;
    private String name;
    private String description;
    private Set<String> books;

    public AuthorDTO(Author author) {
        this.id = author.getId();
        this.name = author.getName();
        this.description = author.getDescription();
        this.books = author.getBooks().stream().map(Book::getTitle).collect(Collectors.toSet());
    }
}