package com.restfull.api.services;

import com.restfull.api.dtos.book.CommentDTO;
import com.restfull.api.entities.Book;
import com.restfull.api.entities.Comment;
import com.restfull.api.repositories.CommentRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepository repository;

    public List<Comment> findAll() {
        return repository.findAll();
    }

    public List<Comment> findByBook(Book book) {
        return repository.findByBook(book);
    }


    public Comment create(Comment comment) {
        return repository.save(comment);
    }


}
