package com.restfull.api.entities;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.restfull.api.dtos.book.BookDTO;
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

@Entity
@Table(name = "books")
@Data
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Book {
    @Id
//    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "gen_books_id")
//    @SequenceGenerator(name = "gen_books_id", sequenceName = "seq_books_id", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 250)
    private String title;

    @Column(nullable = true)
    private String description;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "book", fetch = FetchType.EAGER)
    private List<Image> images = new ArrayList<>();

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(name = "book_type", joinColumns = @JoinColumn(name = "book_id"), inverseJoinColumns = @JoinColumn(name = "type_id"))
    private Set<Type> types =new HashSet<>();

    @Enumerated(EnumType.STRING)
    private Status status;

    private Double price = 0.0;

    @ManyToMany(mappedBy = "followedBooks", fetch = FetchType.EAGER)
    private Set<User> followedUsers = new HashSet<>();

    @Enumerated(EnumType.STRING)
    private Set<Rate> rate = new HashSet<>();

    private Date createdAt;

    private Date lastUpdateAt;

    private String url;

    public Book() {
        super();
    }

    public Book(String title, String description, List<Image> images, Set<Type> types, Status status, Double price,
            Set<User> followedUsers, Set<Rate> rate, Date createdAt, Date lastUpdateAt, String url) {
        this.title = title;
        this.description = description;
        this.images = images;
        this.types = types;
        this.status = status;
        this.price = price;
        this.followedUsers = followedUsers;
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

    public void addImage(Image image) {
        if (this.images.contains(image))
            return;
        this.images.add(image);

    }

    public void removeImage(Image image) {
        this.images.remove(image);
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

    public void addType(Type type) {
        this.types.add(type);
    }

    public void removeType(Type type) {
        this.types.remove(type);
    }

    // ----------------FollowedUsers----------------
    public Set<String> getFollowedUsersString() {
        return this.followedUsers.stream().map(User::getEmail).collect(Collectors.toSet());
    }

    public void setFollowedUsers(Set<User> followedUsers) {
        if (followedUsers == null || followedUsers.isEmpty()) {
            this.followedUsers.clear();
        } else {
            this.followedUsers = followedUsers;
        }
    }

    public void addFollowedUser(User user) {
        this.followedUsers.add(user);
    }

    public void removeFollowedUser(User user) {
        this.followedUsers.remove(user);
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

    public void addRate(Rate rate) {
        this.rate.add(rate);
    }

    public void removeRate(Rate rate) {
        this.rate.remove(rate);
    }

    public Double getAverageRate() {
        return rate.stream().mapToInt(Rate::getValue).average().orElse(0.0);
    }

    public String toString() {
        return "Book{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", images=" + images +
                ", types=" + types +
                ", status=" + status +
                ", price=" + price +
                ", followedUsers=" + followedUsers +
                ", rate=" + rate +
                ", createdAt=" + createdAt +
                ", lastUpdateAt=" + lastUpdateAt +
                ", url='" + url + '\'' +
                '}';
    }

}
