package com.restfull.api.services;

import com.restfull.api.dtos.book.BookRequestDTO;
import com.restfull.api.dtos.book.TypeRequestDTO;
import com.restfull.api.entities.Type;
import com.restfull.api.entities.Book;
import com.restfull.api.repositories.TypeRepository;
import com.restfull.api.utils.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class TypeService {

    @Autowired
    private BookService bookService;

    @Autowired
    private TypeRepository repository;

    public List<Type> getAllTypes(){
        return repository.findAll();
    }

    public Type getTypeById(Long id) {
        return repository.findById(id).orElseThrow(
                () -> new NotFoundException("Type not found: " + id));
    }

    public Type getTypeByName(String name){
        return repository.findByName(name).orElseThrow(
                () -> new NotFoundException("Type not found: " + name)
                );
    }

    public Type create(Type type){
        return repository.save(type);
    }

    public Type createType(TypeRequestDTO typeDTO) {
        Type type = new Type(typeDTO.getName(), typeDTO.isLicense(), typeDTO.getDescription());
        return repository.save(type);
    }

    public Type createNewType(TypeRequestDTO typeDTO) {
        Type type = null;
        try {
            // Check if a Type with the same name already exists
            Type existingType = getTypeByName(typeDTO.getName());
            if (existingType != null) {
                throw new Exception("A type with the same name already exists.");
            }
            // Create a new Type entity
            type = new Type(typeDTO.getName(), typeDTO.isLicense(), typeDTO.getDescription());  
            // Save the new Type entity to the repository
            return repository.save(type);
    
        } catch (Exception e) {
            String errorMessage = "An error occurred while creating the new type: " + e.getMessage();
            throw new RuntimeException(errorMessage);
        }
    }

    public Type update(Type type){
        Type _type = getTypeById(type.getId());
        _type.setName(type.getName());
        _type.setDescription(type.getDescription());
        _type.setBooks(type.getBooks());
        return repository.save(_type);
    }

    public void delete(Long id) {
        Type type = getTypeById(id);
        repository.delete(type);
    }

    public Set<Type> getTypesByBookId(Long id) {
        return repository.findByBooksId(id);
    }

    public Type addBookToType(TypeRequestDTO typeDTO, BookRequestDTO bookDTO) {
        Type type = null;
        Book book = null;
        try {
            // Get type from repository
            type = getTypeById(typeDTO.getId());
            // Check if the book is already in this type
            if (type.getBooksIDStrings().contains(bookDTO.getId())) {
                throw new NotFoundException("The specified book is already in the list!");
            }
            // Get book from service
            book = bookService.findById(bookDTO.getId());
            // Add the book to the type
            type.addBook(book);
            // Save the type to the repository
            return repository.save(type);
        } catch (Exception e) {
            String errorMessage = "An error occurred while adding the book to the type: " + e.getMessage();
            throw new RuntimeException(errorMessage);
        }
    }

//    public boolean removeBookFromType(Type type, Book book){
//        if(!type.getBooks().contains(book)){
//            return false;
//        }
//        type.getBooks().remove(book);
//        repository.save(type);
//        return true;
//    }

//    public Set<Type> getTypeByString(Set<String> types){
//        System.out.println("get Type by string");
//        Set<Type> result = types.stream().map(this::getTypeByName).collect(Collectors.toSet());
//        System.out.println(result);
//        return result;
//    }
}
