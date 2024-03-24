package com.restfull.api.repositories;

import com.restfull.api.entities.Book;
import com.restfull.api.entities.BookReader;
import com.restfull.api.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface BookReaderRepository extends JpaRepository<BookReader, Long> {

    Optional<BookReader> findBookReaderById(Long id);
    Optional<BookReader> findByUserIdAndBookId(Long userId, Long bookId);
    Optional<BookReader> findByUserAndBook(User user, Book book);
    List<BookReader> findAllByUser(User user);
    List<BookReader> findAllByUserId(Long userId);
    List<BookReader> findAllByBook(Book book);
    List<BookReader> findAllByBookId(Long bookId);
}
