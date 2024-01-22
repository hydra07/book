package com.restfull.api.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "images")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Image {
    @Id
//    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "gen_books_id")
//    @SequenceGenerator(name = "gen_books_id", sequenceName = "seq_books_id", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String path;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "book_id")
    private Book book;

    public Image(String path, Book book) {
        super();
        this.path = path;
        this.book = book;
    }

    public Image(String path) {
        super();
        this.path = path;
    }
}
