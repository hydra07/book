package com.restfull.api.entities;

import java.util.*;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.restfull.api.enums.Rate;
import com.restfull.api.enums.Status;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Table(name = "books")
//@Data
@Getter
@Setter
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Book {
    @Id
//    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "gen_books_id")
//    @SequenceGenerator(name = "gen_books_id", sequenceName = "seq_books_id", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 250, columnDefinition = "NVARCHAR(250)")
    private String title;

    @Column(nullable = true)
    private String description;

    @Column(nullable = true, columnDefinition = "NVARCHAR(1000)")
    private String imageUrl;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(name = "book_type", joinColumns = @JoinColumn(name = "book_id"), inverseJoinColumns = @JoinColumn(name = "type_id"))
    @JsonManagedReference
    private Set<Type> types =new HashSet<>();

    @Enumerated(EnumType.STRING)
    private Status status;

    private Double price = 0.0;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_follow_book",
            joinColumns = @JoinColumn(name = "book_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> followedBook = new HashSet<>();

    @Enumerated(EnumType.STRING)
    private Set<Rate> rate = new HashSet<>();

    private Date createdAt;

    private Date lastUpdateAt;

    private String url;

    public Book() {
        super();
    }

    public Book(String title, String description, List<Image> images, Set<Type> types, Status status, Double price,
                Set<User> followedBook, Set<Rate> rate, Date createdAt, Date lastUpdateAt, String url) {
        this.title = title;
        this.description = description;
        this.images = images;
        this.types = types;
        this.status = status;
        this.price = price;
        this.followedBook = followedBook;
        this.rate = rate;
        this.createdAt = createdAt;
        this.lastUpdateAt = lastUpdateAt;
        this.url = url;
    }

    /**
     * Constructor with DTO
     *
     * @param dto (without id,followedUsers,images,types)
     * @return
     *
     */
    public Book(BookDTO dto) {
        this.title = dto.getTitle();
        this.description = dto.getDescription();
        this.status = Status.valueOf(dto.getStatus());
        this.price = dto.getPrice();
        this.rate = dto.getRate().stream().map(Rate::valueOf).collect(Collectors.toSet());
        this.createdAt = dto.getCreatedAt();
        this.lastUpdateAt = dto.getLastUpdateAt();
        this.url = dto.getUrl();
    }
    // ----------------Image----------------
    public List<String> getImagesString() {
        return this.images.stream().map(Image::getPath).toList();
    }

    public void setImages(List<Image> images) {
        if (images == null || images.isEmpty()) {
            this.images.clear();
        } else {
            this.images = images;
        }
    }
    // ----------------Type----------------

    public Set<String> getTypesString() {
        return this.types.stream().map(Type::getName).collect(Collectors.toSet());
    }

    public void setTypes(Set<Type> types) {
        if (types == null || types.isEmpty()) {
            this.types.clear();
        } else {
            this.types = types;
        }
    }

    // ----------------FollowedUsers----------------
    public Set<String> getFollowedUsersString() {
        return this.followedBook.stream().map(User::getEmail).collect(Collectors.toSet());
    }

    public void setFollowedUsers(Set<User> followedUsers) {
        if (followedUsers == null || followedUsers.isEmpty()) {
            this.followedBook.clear();
        } else {
            this.followedBook = followedUsers;
        }
    }

    // ----------------Rate----------------
    public Set<Integer> getRateString() {
        return rate.stream().map(Rate::getValue).collect(Collectors.toSet());
    }

    public void setRate(Set<Rate> rate) {
        if (rate == null || rate.isEmpty()) {
            this.rate.clear();
        } else {
            this.rate = rate;
        }
    }

    public Double getAverageRate() {
        return rate.stream().mapToInt(Rate::getValue).average().orElse(0.0);
    }

    //-----------------View----------------
    public void incrementViews() {
        this.views = (this.views == null) ? 1 : this.views + 1;
    }
}
