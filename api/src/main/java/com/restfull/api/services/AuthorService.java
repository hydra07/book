package com.restfull.api.services;

import com.restfull.api.dtos.book.AuthorRequestDTO;
import com.restfull.api.entities.Author;
import com.restfull.api.repositories.AuthorRepository;
import com.restfull.api.utils.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthorService {

    @Autowired
    private AuthorRepository repository;

    public List<Author> findAll() {
        return repository.findAll();
    }

    public Author findById(Long id) {
        return repository.findById(id).orElseThrow(
                () -> new NotFoundException("Author not found: " + id));
    }

    public Author create(Author author) {
        return repository.save(author);
    }

    public Author createAuthor(AuthorRequestDTO dto){
        Author author = new Author(dto.getName(), dto.getDescription());
        return repository.save(author);
    }

    public Author update(Long id, AuthorRequestDTO dto) {
//        Author author = findById(dto.getId());
        Author author = findById(id);
        author.setName(dto.getName());
        author.setDescription(dto.getDescription());
        return repository.save(author);
    }
    public void delete(Long id) {
        Author author = findById(id);
        repository.delete(author);
    }
}
