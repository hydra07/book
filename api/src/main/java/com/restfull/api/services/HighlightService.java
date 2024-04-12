package com.restfull.api.services;

import com.restfull.api.entities.Highlight;
import com.restfull.api.repositories.HighlightRepository;
import com.restfull.api.utils.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HighlightService {
    @Autowired
    private HighlightRepository repository;

    public Highlight findById(Long id){
        return repository.findById(id).orElseThrow(
                () -> new NotFoundException("Highlight not found: " + id)
        );
    }

    public Highlight save(Highlight highlight){
        return repository.save(highlight);
    }
    public void delete(Long id){
        repository.deleteById(id);
    }
    public Highlight update(Highlight highlight){
        return repository.save(highlight);
    }
}
