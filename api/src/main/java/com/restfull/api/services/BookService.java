package com.restfull.api.services;

import com.restfull.api.dtos.book.BookRequestDTO;
import com.restfull.api.entities.Book;
import com.restfull.api.entities.User;
import com.restfull.api.enums.Status;
import com.restfull.api.repositories.BookRepository;
import com.restfull.api.utils.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookService {

    @Autowired
    private BookRepository repository;

    @Autowired
    private TypeService typeService;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthorService authorService;

    public List<Book> findAll() {
        return repository.findAll();
    }

    public Book findById(Long id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException("Book not found: " + id));
    }

    public List<Book> searchBook(String keyword) {
        try {
            return repository.searchByName(keyword);
        } catch (Exception e) {
            throw new NotFoundException("Books with the given keyword not found.");
        }
    }

    public Book create(Book book) {
        return repository.save(book);
    }

    @Transactional
    public Book createBook(BookRequestDTO bookDto) {
        Book _book = new Book();
        _book.setTitle(bookDto.getTitle());
        _book.setAuthor(authorService.findById(bookDto.getAuthorId()));
        _book.setDescription(bookDto.getDescription());
        _book.setTypes(
                bookDto.getTypesId().stream().map(id -> typeService.getTypeById(id)).collect(Collectors.toSet()));
        _book.setPrice(bookDto.getPrice());
        _book.setCreatedAt(bookDto.getCreatedAt());
        _book.setLastUpdateAt(bookDto.getLastUpdateAt());
        _book.setUrl(bookDto.getUrl());
        _book.setStatus(Status.valueOf(bookDto.getStatus()));
        _book.setImageUrl(bookDto.getImageUrl());
        return repository.save(_book);

    }

    public Book update(Book book) {
        Book _book = findById(book.getId());
        _book.setTitle(book.getTitle());
        _book.setDescription(book.getDescription());
        _book.setImageUrl(book.getImageUrl());
        _book.setPrice(book.getPrice());
        _book.setCreatedAt(book.getCreatedAt());
        _book.setLastUpdateAt(book.getLastUpdateAt());
        _book.setFollowedBook(book.getFollowedBook());
        _book.setTypes(book.getTypes());
        return repository.save(_book);
    }

    public void delete(Long id) {
        Book book = findById(id);
        repository.delete(book);
    }

    public void increaseViews(Long id) {
        Book book = findById(id);
        book.incrementViews();
        repository.updateViews(id, book.getViews());

        // update(book);
    }

    public void addFollowedUser(Book book, User user) {
        book.getFollowedBook().add(user);
        update(book);
    }

    public void removeFollowedUser(Book book, User user) {
        book.getFollowedBook().removeIf(_user -> _user.getId().equals(user.getId()));
        update(book);
    }

    public String isUserFollowedBook(User user, Book book) {
        return " " + user.getFollowedBooks().contains(book) + book.getFollowedBook().contains(user) + " ";
    }

    // @Transactional
    // public void createBook(BookDTO bookDTO){
    // Book book = new Book(bookDTO);
    // repository.save(book);
    // book = setTypeByString(bookDTO.getTypes(), book);
    // book = setImageByString(bookDTO.getImages(), book);
    // update(book);
    // }
}
