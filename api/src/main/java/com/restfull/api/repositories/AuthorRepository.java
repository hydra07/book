package com.restfull.api.repositories;

import com.restfull.api.entities.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {
    @Query("SELECT a.name FROM Author a WHERE a.name LIKE %:keyword%")
    List<Author> searchByAuthor(@Param("keyword") String keyword);
    Optional<Author> findById(long id);


    @Transactional
    @Modifying
    @Query("delete from Book b where b.author.id = :authorId")
    void deleteByAuthorId(@Param("authorId") Long authorId);


    @Modifying
    @Transactional
    @Query("delete from Author a where a.id = :id")


    void deleteAuthor(@Param("id") Long id);
}
