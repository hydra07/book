package com.restfull.api.dtos.book;

import com.restfull.api.dtos.user.UserResponseDTO;
import com.restfull.api.entities.Book;
import com.restfull.api.entities.BookReader;
import com.restfull.api.entities.Bookmark;
import com.restfull.api.entities.User;
import lombok.Getter;
import lombok.Setter;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;


@Getter
@Setter
class BookmarkResponseDTO {
    private Long key;
    private String name;
    private String cfi;
    private String date;

    public BookmarkResponseDTO(Bookmark bookmark){
        this.key = bookmark.getId();
        this.name = bookmark.getName();
        this.cfi = bookmark.getCfi();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        this.date = formatter.format(bookmark.getDate());
//        this.date = bookmark.getDate();
    }
}

@Getter
@Setter
class CurrentPage {
    private String chapterName;
    private Integer currentPage;
    private Integer totalPage;
    private String startCfi;
    private String endCfi;
    private String base;
}


@Getter
@Setter
public class ReaderResponseDTO {
    private Long id;
    private UserResponseDTO user;
    private BookResponseDTO book;
    private String lastCurrentCfi;
    private Date lastAccess;
    private int accessCount;
    private CurrentPage currentPage;
    private List<BookmarkResponseDTO> bookmarks;


    public ReaderResponseDTO (Long id, UserResponseDTO user, BookResponseDTO book, int accessCount){
        this.id = id;
        this.user = user;
        this.book = book;
        this.accessCount = accessCount;
    }

    public ReaderResponseDTO (BookReader bookReader){
        this.id = bookReader.getId();
        this.user = new UserResponseDTO(bookReader.getUser());
        this.book = new BookResponseDTO(bookReader.getBook());
        this.accessCount = bookReader.getAccessCount();
        this.lastCurrentCfi = bookReader.getLastCurrentCfi();
        this.lastAccess = bookReader.getLastAccess();
        this.bookmarks = bookReader.getBookmarks().stream().map(BookmarkResponseDTO::new).toList();
        // CurrentPage
        CurrentPage currentPage = new CurrentPage();
        currentPage.setChapterName(bookReader.getChapterName());
        currentPage.setCurrentPage(bookReader.getCurrentPage());
        currentPage.setTotalPage(bookReader.getTotalPage());
        currentPage.setStartCfi(bookReader.getStartCfi());
        currentPage.setEndCfi(bookReader.getEndCfi());
        currentPage.setBase(bookReader.getBase());
        this.currentPage = currentPage;
    }
}
