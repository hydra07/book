package com.restfull.api.repositories;

import com.restfull.api.entities.Book;
import com.restfull.api.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
//    List<Comment> findByBookId(Long id);
    List<Comment> findByBook(Book book);
}
