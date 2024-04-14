package com.restfull.api.entities;

import com.restfull.api.enums.Rate;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "rate", uniqueConstraints = @UniqueConstraint(columnNames = {"book_id", "user_id"}))
@Getter
@Setter
public class BookRate {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    @Enumerated(EnumType.STRING)
    private Rate rate;

    public BookRate(User user, Book book, int rateInt) {
        this.user = user;
        this.book = book;
        this.rate = Rate.valueOf(rateInt);
    }

    public BookRate() {
    }

    public int getRateValue() {
        return this.rate.getValue();
    }

}
