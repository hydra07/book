package com.restfull.api.dtos.book;


import com.restfull.api.entities.Author;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthorResponseDTO {
    private Long id;
    private String name;
    private String description;
    Set<BookShort> books = new HashSet<>();

    public AuthorResponseDTO(Author author){
        this.id = author.getId();
        this.name = author.getName();
        this.description = author.getDescription();
        this.books = author.getBooks()
                .stream()
                .map(BookShort::new)
                .collect(Collectors.toSet());
    }

}
