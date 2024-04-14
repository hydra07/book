package com.restfull.api.dtos.book;

import com.restfull.api.entities.Type;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TypeDTO {
    private Long id;
    private String name;
    private String description;
    private Set<String> books;

    public TypeDTO(Type type){
        this.id = type.getId();
        this.name = type.getName();
        this.description = type.getDescription();
        this.books = type.getBooksString();
    }
}
