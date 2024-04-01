package com.restfull.api.entities;

import java.text.ParseException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

import com.restfull.api.dtos.book.BookmarkRequestDTO;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    public Bookmark(BookmarkRequestDTO dto) {
        this.id = dto.getKey();
        this.name = dto.getName();
        this.cfi = dto.getCfi();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime dateTime = LocalDateTime.parse(dto.getDate(), formatter);
        this.date = Date.from(dateTime.atZone(java.time.ZoneId.systemDefault()).toInstant());

        // SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        // Date date = formatter.parse(dto.getDate());
        // this.date = new Date(String.valueOf(formatter.parse(dto.getDate())));
        // System.out.println(this.date);
        // this.date = dto.getDate();
    }
}
