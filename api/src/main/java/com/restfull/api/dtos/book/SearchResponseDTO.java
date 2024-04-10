package com.restfull.api.dtos.book;

import com.restfull.api.entities.Author;
import com.restfull.api.entities.Book;
import com.restfull.api.entities.Type;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SearchResponseDTO {
    private List<Book> books;
    private List<Author> authors;
    private List<Type> types;
}
