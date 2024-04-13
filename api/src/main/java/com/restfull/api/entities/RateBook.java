package com.restfull.api.entities;

import com.restfull.api.enums.Rate;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "rates", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "book_id"}))
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RateBook {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name ="user_id")
    private Book book;

    private Rate rate;

    public RateBook(User user, Book book, Rate rate) {
        this.user = user;
        this.book = book;
        this.rate = rate;
    }
}
