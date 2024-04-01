package com.restfull.api.services;

import com.restfull.api.entities.BookReader;
import com.restfull.api.entities.Bookmark;
import com.restfull.api.repositories.BookmarkRepository;
import com.restfull.api.utils.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookmarkService {

    @Autowired
    private BookmarkRepository repository;

    public Bookmark findById(Long id){
        return repository.findById(id).orElseThrow(
                () -> new NotFoundException("Bookmark not found: " + id)
        );
    }

    public Bookmark save(Bookmark bookmark){
        return repository.save(bookmark);
    }

    public void delete(Long id){
        repository.deleteById(id);
    }

    public Bookmark update(Bookmark bookmark){
        return repository.save(bookmark);
    }
}
