package com.restfull.api.services;

import com.restfull.api.dtos.book.BookDTO;
import com.restfull.api.entities.Book;
import com.restfull.api.entities.Image;
import com.restfull.api.entities.Type;
import com.restfull.api.repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import com.restfull.api.utils.NotFoundException;
import java.util.List;
import java.util.Set;

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

//    public Book update(Book book){
//        Book _book = findById(book.getId());
//        _book.setTitle(book.getTitle());
//        _book.setDescription(book.getDescription());
//        _book.setImages(book.getImages());
//        _book.setPrice(book.getPrice());
//        _book.setCreatedAt(book.getCreatedAt());
//        _book.setLastUpdateAt(book.getLastUpdateAt());
////        _book.setTypes(book.getTypes());
//        return repository.save(_book);
//    }

    public Book update(Book book){
        Book _book = findById(book.getId());
        _book.setTitle(book.getTitle());
        _book.setDescription(book.getDescription());
        _book.setImages(book.getImages());
        _book.setPrice(book.getPrice());
        _book.setCreatedAt(book.getCreatedAt());
        _book.setLastUpdateAt(book.getLastUpdateAt());
        _book.setTypes(book.getTypes());
        return repository.save(_book);
    }

    public void delete(Long id) {
        Book book = findById(id);
        repository.delete(book);
    }

    public void addTypeString(Book book, Set<String> types){
        for(String type: types){
            if (typeService.getTypeByName(type) == null){
                typeService.create(new Type(type,book));
            }
            book.getTypes().add(typeService.getTypeByName(type));
        }
        repository.save(book);
    }

    public void setTypeFromString(Book book, Set<String> types){
        book.getTypes().clear();
        addTypeString(book,types);
    }

    public void setImagefromString(Book book, List<String> images){
        book.getImages().clear();
        images.forEach(image -> book.getImages().add(new Image(image,book)));
        repository.save(book);
    }

    public void createBook(BookDTO bookDTO){
        Book book = new Book(bookDTO);
        System.out.println(book);
        book.setTypes(typeService.getTypeByString(bookDTO.getTypes()));
        book.setImages(imageService.getImageByString(bookDTO.getImages()));
//        book.setTypes(typeService.getTypesByStringType(bookDTO.getTypes(),book));
//        bookDTO.getImages().forEach(
//                image -> book.getImages().add(new Image(image,book))
//        );
//        addTypeString(book,bookDTO.getTypes());
//        setImagefromString(book,bookDTO.getImages());
//        BookDTO.getTypes().forEach(System.out::println);
//        create(book);
        System.out.println(book);
    }
}
