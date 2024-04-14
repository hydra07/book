package com.restfull.api.services;

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
        Type type = new Type(typeDTO.getName(), typeDTO.getDescription());
        return repository.save(type);
    }

    public Type createNewType(TypeRequestDTO typeDTO) {
        Type type = new Type(typeDTO.getName(), typeDTO.getDescription());
        return repository.save(type);
    }

    public Type update(TypeRequestDTO type){
        Type _type = getTypeById(type.getId());
        _type.setName(type.getName());
        _type.setDescription(type.getDescription());
//        _type.setBooks(type.getBooks());
        return repository.save(_type);
    }
public void deleteByTypeId(Long typeId) {


        repository.deleteByTypeId(typeId);

    }
    public void deleteType(Long id) {

        repository.deleteType(id);

    
    }

    public Set<Type> getTypesByBookId(Long id) {
        return repository.findByBooksId(id);
    }
    
    public Set<Book> getBookByType(TypeRequestDTO typeDTO) {
        Type type = getTypeById(typeDTO.getId());
        return type.getBooks();
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
