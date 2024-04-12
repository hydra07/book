package com.restfull.api.repositories;

import com.restfull.api.entities.Book;
import com.restfull.api.entities.BookRate;
import com.restfull.api.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRateRepository extends JpaRepository<BookRate, Long> {

    Optional<BookRate> findRateById(Long id);

    Optional<BookRate> findByUserIdAndBookId(Long userId, Long bookId);

    List<BookRate> findByUser(User user);

    List<BookRate> findByUserId(Long userId);

    List<BookRate> findByBook(Book book);

    List<BookRate> findByBookId(Long bookId);
}
