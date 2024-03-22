package com.restfull.api.dtos.book;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookAndTypeRequestDTO {
    private BookRequestDTO book;
    private TypeRequestDTO type;
}
