package com.restfull.api.dtos.book;

import com.restfull.api.dtos.user.UserResponseDTO;
import com.restfull.api.entities.Book;
import com.restfull.api.entities.BookReader;
import com.restfull.api.entities.Bookmark;
import com.restfull.api.entities.User;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;


@Getter
@Setter
class BookmarkResponseDTO {
    private Long key;
    private String name;
    private String cfi;
    private Date date;

    public BookmarkResponseDTO(Bookmark bookmark){
        this.key = bookmark.getId();
        this.name = bookmark.getName();
        this.cfi = bookmark.getCfi();
        this.date = bookmark.getDate();
    }
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
    }
}
