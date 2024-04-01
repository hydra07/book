package com.restfull.api.dtos.book;



import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

//import com.restfull.api.dtos.book.BookmarkRequestDTO;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class ReaderRequestDTO {
    private Long id;
    private Long userId;
    private Long bookId;
//    private String lastCurrentCfi;

    //Page
    private String chapterName;
    private int currentPage;
    private int totalPage;
    private String startCfi;
    private String endCfi;
    private String base;

    private Date lastAccess;
    private int accessCount;


//    @JsonProperty("bookmarks")
    private List<BookmarkRequestDTO> bookmarks;
}
