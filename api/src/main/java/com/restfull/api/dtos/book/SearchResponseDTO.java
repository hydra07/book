package com.restfull.api.dtos.book;

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
    private List<BookDTO> books;
    private List<AuthorDTO> authors;
    private List<TypeDTO> types;
}
