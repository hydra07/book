package com.restfull.api.entities;

import com.restfull.api.dtos.book.BookmarkRequestDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;


@Entity
@Getter
@Setter
@NoArgsConstructor
public class Bookmark {

    @Id
    private Long id;
    private String name;
    private String cfi;
    private Date date;

    public Bookmark(int key, String name, String cfi, Date date) {
        this.id = (long) key;
        this.name = name;
        this.cfi = cfi;
        this.date = date;
    }

    public Bookmark(BookmarkRequestDTO dto){
        this.id = dto.getKey();
        this.name = dto.getName();
        this.cfi = dto.getCfi();
        this.date = dto.getDate();
    }
}

