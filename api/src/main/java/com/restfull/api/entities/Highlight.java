package com.restfull.api.entities;

import com.restfull.api.dtos.book.BookmarkRequestDTO;
import com.restfull.api.dtos.book.HighlightRequestDTO;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Highlight {
    @Id
    private Long id;
    private String cfiRange;
    private String color;
    private Date createAt;

    @Column(columnDefinition = "NVARCHAR(MAX)")
    private String content;
//    private String note;
    @Column(columnDefinition = "NVARCHAR(1000)")
    private String chapterName;

    private Long pageNum;


    public Highlight(HighlightRequestDTO dto) {
        this.id = dto.getKey();
        this.cfiRange = dto.getCfiRange();
        this.color = dto.getColor();
        this.content = dto.getContent();
        this.chapterName = dto.getChapterName();
        this.pageNum = dto.getPageNum();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime dateTime = LocalDateTime.parse(dto.getCreateAt(), formatter);
        this.createAt = Date.from(dateTime.atZone(java.time.ZoneId.systemDefault()).toInstant());

        // SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        // Date date = formatter.parse(dto.getDate());
        // this.date = new Date(String.valueOf(formatter.parse(dto.getDate())));
        // System.out.println(this.date);
        // this.date = dto.getDate();
    }
}
