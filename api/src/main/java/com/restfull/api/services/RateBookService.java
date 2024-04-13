package com.restfull.api.services;

import com.restfull.api.entities.RateBook;
import com.restfull.api.enums.Rate;
import com.restfull.api.repositories.RateBookRepository;
import com.restfull.api.utils.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.restfull.api.entities.Book;
import com.restfull.api.entities.User;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class RateBookService {
    @Autowired
    private RateBookRepository repository;


    public RateBook findById(Long id){
        return repository.findById(id).orElseThrow(
                () -> new NotFoundException("Not found: " + id)
        );
    }

    public RateBook save(RateBook rateBook){
        return repository.save(rateBook);
    }

    public void delete(Long id){
        repository.deleteById(id);
    }

    public RateBook update(RateBook rateBook){
        return repository.save(rateBook);
    }

    public Set<Rate> findAllRatesByBook(Book book){
        List<RateBook> rateBooks = repository.findAllByBook(book);
        return rateBooks.stream().map(RateBook::getRate).collect(Collectors.toSet());
    }

    public RateBook findByBookAndUser(User user, Book book){
        return repository.findByBookAndUser(book,user).orElseThrow(
                () -> new NotFoundException("Not found: " + user + " " + book)
        );
    }

    public RateBook rateBook(User user, Book book, int rate){
        RateBook rateBook = new RateBook(user, book, Rate.valueOf(rate));
        return repository.save(rateBook);
    }

    public RateBook updateRateBook(User user, Book book, int rate){
        RateBook rateBook = findByBookAndUser(user, book);
        rateBook.setRate(Rate.valueOf(rate));
        return update(rateBook);
    }


    public void deleteRateBook(User user, Book book){
        RateBook rateBook = findByBookAndUser(user, book);
        delete(rateBook.getId());
    }

    public boolean isRated(User user, Book book){
        return repository.findByBookAndUser(book, user).isPresent();
    }
}
