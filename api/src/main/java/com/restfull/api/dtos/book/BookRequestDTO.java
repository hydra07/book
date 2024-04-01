package com.restfull.api.dtos.book;

import lombok.Getter;
import lombok.Setter;

import java.util.*;

@Getter
@Setter
public class BookRequestDTO {
    private Long id;
    private String title;
    private Long authorId;
    private String description;
    private Set<Long> typesId = new HashSet<>();
    private double price;
    private Date createdAt;
    private Date lastUpdateAt;
    private String url;
    private String status;
    private String imageUrl;
    
}
