package com.restfull.api.repositories;

import com.restfull.api.entities.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {
    @Query("SELECT a.name FROM Author a WHERE a.name LIKE %:keyword%")
    List<Author> searchByAuthor(@Param("keyword") String keyword);
    Optional<Author> findById(long id);
}
