package com.restfull.api.repositories;

import com.restfull.api.entities.Author;
import com.restfull.api.entities.Book;
import com.restfull.api.entities.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    @Query("SELECT b FROM Book b WHERE b.title LIKE %:keyword% or b.title like '_%keyword%'")
    List<Book> searchByName(@Param("keyword") String keyword);

    @Query("SELECT a FROM Author a WHERE a.name LIKE %:keyword%")

    List<Author> searchByAuthor(@Param("keyword") String keyword);

    @Query("SELECT t FROM Type t WHERE t.name LIKE %:keyword%")

    List<Type> searchByType(@Param("keyword") String keyword);

    // ...
    Optional<Book> findById(long id);

    @Transactional
    @Modifying
    @Query("UPDATE Book  b SET b.views = :views WHERE b.id = :id")
    void updateViews(@Param("id") Long id, @Param("views") Long views);

}
