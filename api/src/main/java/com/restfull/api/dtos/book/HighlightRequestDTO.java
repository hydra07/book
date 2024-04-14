package com.restfull.api.dtos.book;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HighlightRequestDTO {

    private Long key;
    private String cfiRange;
    private String content;
    private String color;
    private String createAt;
    private String chapterName;
    private Long pageNum;
}
