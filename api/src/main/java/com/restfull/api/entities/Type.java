package com.restfull.api.entities;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "types")
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Type {
    @Id
//    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "gen_types_id")
//    @SequenceGenerator(name = "gen_types_id", sequenceName = "seq_types_id", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String name;

    private boolean license;

    private String description;

    @ManyToMany(mappedBy = "types", fetch = FetchType.EAGER)
    private Set<Book> books = new HashSet<>();

    public Type(String name, boolean license, String description) {
        super();
        this.name = name;
        this.license = license;
        this.description = description;
    }
    public Type(String name, Book book) {
        super();
        this.name = name;
        this.books.add(book);
    }
    public Type(String name) {
        super();
        this.name = name;
    }
    //--------------------------------------
    public Set<String> getBooksString(){
        return this.books.stream().map(Book::getTitle).collect(Collectors.toSet());
    }
    public void addBook(Book book){
        if (this.books.contains(book)){
        }else {
            this.books.add(book);
        }
    }
    public void removeBook(Book book){
        this.books.remove(book);
    }
}
