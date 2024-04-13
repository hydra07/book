package com.restfull.api.repositories;

import com.restfull.api.entities.Book;
import com.restfull.api.entities.RateBook;
import com.restfull.api.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RateBookRepository extends JpaRepository<RateBook, Long> {
    Optional<RateBook> findByBookAndUser(Book book, User user);

    List<RateBook> findAllByBook(Book book);

//    List<RateBook> findAllByFollowed(User followed);
}
