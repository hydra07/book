package com.restfull.api.services;

import com.restfull.api.dtos.book.TypeDTO;

import com.restfull.api.entities.Type;
import com.restfull.api.repositories.TypeRepository;
import com.restfull.api.utils.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class TypeService {

    @Autowired
    private TypeRepository repository;

    public List<Type> getAllTypes() { return repository.findAll(); }

    public Type getTypeById(Long id) {
        return repository.findById(id).orElseThrow(
                () -> new NotFoundException("Type not found: " + id));
    }

    public Type getTypeByName(String name){
        return repository.findByName(name).orElseThrow(
                () -> new NotFoundException("Type not found: " + name)
        );
    }

    public Type create(Type type) { return repository.save(type);}

    public Type createType(TypeDTO typeDTO){
        Type type = new Type(typeDTO.getName(), typeDTO.isLicense(), typeDTO.getDescription());
        return repository.save(type);
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

//    public boolean addBookToType(Type type, Book book){
//        if(type.getBooks().contains(book)){
//            return false;
//        }
//        type.getBooks().add(book);
//        repository.save(type);
//        return true;
//    }

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
