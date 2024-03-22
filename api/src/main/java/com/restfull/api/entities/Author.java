package com.restfull.api.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
public class Author {
    @Id
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "gen_authors_id")
    @SequenceGenerator(name = "gen_authors_id", sequenceName = "seq_authors_id", allocationSize = 1)
    private Long id;

    @Column(nullable = false, length = 250, columnDefinition = "NVARCHAR(250)")
    private String name;

    @Column(nullable = true, columnDefinition = "NVARCHAR(1000)")
    private String description;

    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<Book> books = new HashSet<>();

}
