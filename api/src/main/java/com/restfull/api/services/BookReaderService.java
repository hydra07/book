package com.restfull.api.services;


import com.restfull.api.entities.Book;
import com.restfull.api.entities.BookReader;
import com.restfull.api.entities.Bookmark;
import com.restfull.api.entities.User;
import com.restfull.api.repositories.BookReaderRepository;
import com.restfull.api.utils.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class BookReaderService {
    @Autowired
    private BookReaderRepository repository;

    @Autowired
    private UserService userService;

    @Autowired
    private BookService bookService;

    @Autowired
    private BookmarkService bookmarkService;

    private BookReader findBookReader(Long id){
        return repository.findBookReaderById(id).orElseThrow(
                () -> new NotFoundException("BookReader not found: " + id)
        );
    }

    private BookReader findBookReader(User user, Book book){
        return repository.findByUserAndBook(user, book).orElseThrow(
                () -> new NotFoundException("BookReader not found: " + user.getId() + " - " + book.getId())
        );
    }

    public BookReader findBookReader(Long userId, Long bookId){
        return repository.findByUserIdAndBookId(userId, bookId).orElseThrow(
                () -> new NotFoundException("BookReader not found: " + userId + " - " + bookId)
        );
    }
    public BookReader save(BookReader bookReader){
        return repository.save(bookReader);
    }


    /**
     * Hàm này có tác dụng init khi đọc sách, update accessCount và lastAccess
     *
     */
    public BookReader readBook(Long userId, Long bookId){
        try {
            BookReader bookReader = findBookReader(userId, bookId);
            bookReader.setAccessCount(bookReader.getAccessCount() + 1);
            bookReader.setLastAccess(new Date());
            return repository.save(bookReader);
        } catch (NotFoundException e) {
            BookReader bookReader = new BookReader(userService.findById(userId), bookService.findById(bookId));
            bookReader.setAccessCount(1);
            bookReader.setLastAccess(new Date());
            return repository.save(bookReader);
        }
    }

    public BookReader updateBookReader(BookReader bookReader){
        return repository.save(bookReader);
    }
    public List<BookReader> getBookReaderByUserId(Long userId) {
        return repository.findAllByUserId(userId);
    }

    public List<BookReader> getBookReaderByBookId(Long bookId){
        return repository.findAllByBookId(bookId);
    }

    public String setCurrentCfi (User user, Book book, String newCurrentCfi){
        BookReader bookReader = findBookReader(user, book);
        bookReader.setLastCurrentCfi(newCurrentCfi);
        repository.save(bookReader);
        return newCurrentCfi;
    }

    public boolean isBookmarkInBookReader(BookReader bookReader, Bookmark bookmark){
        return bookReader.getBookmarks().contains(bookmark);
    }
    public void addBookmark(BookReader bookReader, Bookmark bookmark){
        bookReader.addBookmark(bookmark);
        repository.save(bookReader);
    }

    public void removeBookmark(BookReader bookReader, Bookmark bookmark){
        bookReader.getBookmarks().remove(bookmark);
        repository.save(bookReader);
    }


}
