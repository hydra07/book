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
    private List<BookResponseDTO> books;
    private List<AuthorResponseDTO> authors;
    private List<TypeResponseDTO> types;
}
