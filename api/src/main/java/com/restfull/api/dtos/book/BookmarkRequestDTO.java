package com.restfull.api.dtos.book;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.restfull.api.entities.Book;
import com.restfull.api.entities.Bookmark;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookmarkRequestDTO {
//    @JsonProperty("key")
    private Long key;
//    @JsonProperty("name")
    private String name;
//    @JsonProperty("cfi")
    private String cfi;
//    @JsonProperty("date")
    private String date;

    public BookmarkRequestDTO(Bookmark bookmark){
        this.key = bookmark.getId();
        this.name = bookmark.getName();
        this.cfi = bookmark.getCfi();
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
//        LocalDateTime dateTime = LocalDateTime.parse(thí;, formatter);
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        this.date = formatter.format(bookmark.getDate());
    }

}
