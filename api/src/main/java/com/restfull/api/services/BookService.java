package com.restfull.api.services;

import com.restfull.api.dtos.book.BookDTO;
import com.restfull.api.entities.Book;
import com.restfull.api.entities.Image;
import com.restfull.api.entities.Type;
import com.restfull.api.repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import com.restfull.api.utils.NotFoundException;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class BookService {

    @Autowired
    private BookRepository repository;

    @Autowired
    private TypeService typeService;

    @Autowired
    private ImageService imageService;

    public List<Book> findAll() {
        return repository.findAll();
    }

    public Book findById(Long id) {
        return repository.findById(id).orElseThrow(
                () -> new NotFoundException("Book not found: " + id));
    }

    public Book create(Book book) {
        return repository.save(book);
    }

    public Book update(Book book){
        Book _book = findById(book.getId());
        _book.setTitle(book.getTitle());
        _book.setDescription(book.getDescription());
        _book.setImages(book.getImages());
        _book.setPrice(book.getPrice());
        _book.setCreatedAt(book.getCreatedAt());
        _book.setLastUpdateAt(book.getLastUpdateAt());
        _book.setTypes(book.getTypes());
        System.out.println(_book);
        return repository.save(_book);
    }

    public void delete(Long id) {
        Book book = findById(id);
        repository.delete(book);
    }

    public void addType(Book book, Type type){
        book.getTypes().add(type);
        type.getBooks().add(book);
        update(book);
    }

    public void removeType(Book book, Type type){
        book.getTypes().remove(type);
        type.getBooks().remove(book);
        update(book);
    }

    public Book setTypeByString(Set<String> types, Book book){
        Set<Type> result = types.stream().map(
                type -> typeService.getTypeByName(type)
        ).collect(Collectors.toSet());
        book.setTypes(result);
        return book;
    }

    public Book setImageByString(List<String> images, Book book){
        List<Image> result = images.stream().map(
                image -> {
                    Image _image = imageService.getImageByPath(image);
                    if (_image == null){
                        return imageService.create(new Image(image, book));
                    }else {
                        _image.setBook(book);
                        return imageService.update(_image);
                    }
                }
        ).collect(Collectors.toList());
        book.setImages(result);
        return book;
    }

    @Transactional
    public void createBook(BookDTO bookDTO){
        Book book = new Book(bookDTO);
        repository.save(book);
        book = setTypeByString(bookDTO.getTypes(), book);
        book = setImageByString(bookDTO.getImages(), book);
        update(book);
    }
}
