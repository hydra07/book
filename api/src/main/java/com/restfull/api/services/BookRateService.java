package com.restfull.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restfull.api.entities.Book;
import com.restfull.api.entities.User;
import com.restfull.api.entities.BookRate;
import com.restfull.api.entities.Comment;
import com.restfull.api.enums.Rate;
import com.restfull.api.repositories.BookRateRepository;
import com.restfull.api.utils.NotFoundException;

import java.util.*;

@Service
public class BookRateService {
    @Autowired
    private BookRateRepository repository;

    public BookRate saveOrUpdate(BookRate bookRate) {
        return repository.save(bookRate);
    }

    public BookRate findById(Long id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException("Rate not found: " + id));
    }

    public BookRate findByUserIdAndBookId(Long bid, Long uID) {
            return repository.findByUserIdAndBookId(bid, uID).orElseThrow(() -> new NotFoundException("Rate not found"));
        }
    

    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public List<BookRate> getAll() {
        return repository.findAll();
    }

    public List<BookRate> getByBookId(Long bookId) {
        return repository.findByBookId(bookId);
    }

    public List<BookRate> getByUserId(Long userId) {
        return repository.findByUserId(userId);
    }

}
