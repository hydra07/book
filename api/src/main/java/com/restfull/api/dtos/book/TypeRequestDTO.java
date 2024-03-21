package com.restfull.api.dtos.book;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TypeRequestDTO {

    private Long id;
    private String name;
    private boolean license;    //nên xem xét việc xóa license
    private String description;

}
