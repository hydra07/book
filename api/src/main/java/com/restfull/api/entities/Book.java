package com.restfull.api.entities;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.restfull.api.enums.Rate;
import com.restfull.api.enums.Status;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Table(name = "books")
@Getter
@Setter
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator =
            "gen_books_id")
    @SequenceGenerator(name = "gen_books_id", sequenceName = "seq_books_id",
            allocationSize = 1)
    private Long id;

    @Column(nullable = false, length = 250, columnDefinition = "NVARCHAR(250)")
    private String title;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private Author author;

    @Column(nullable = true, columnDefinition = "NVARCHAR(1000)")
    private String description;

    @Column(nullable = true, columnDefinition = "NVARCHAR(1000)")
    private String imageUrl;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(name = "book_type", joinColumns = @JoinColumn(name = "book_id"), inverseJoinColumns = @JoinColumn(name = "type_id"))
    @JsonManagedReference
    private Set<Type> types = new HashSet<>();

    private Long views = 0L;

    @Enumerated(EnumType.STRING)
    private Status status;

    private Double price = 0.0;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(name = "follow_book", joinColumns = @JoinColumn(name = "book_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> followedBook = new HashSet<>();

    @Enumerated(EnumType.STRING)
    private Set<Rate> rate = new HashSet<>();

    private Date createdAt;

    private Date lastUpdateAt;

    private String url;

    public Book() {
        super();
    }
    // ----------------Type----------------

    public Set<String> getTypesString() {
        return this.types.stream().map(Type::getName).collect(Collectors.toSet());
    }

    public Set<Long> getTypesIDString() {
        return this.types.stream().map(Type::getId).collect(Collectors.toSet());
    }

    public void setTypes(Set<Type> types) {
        if (types == null || types.isEmpty()) {
            this.types.clear();
        } else {
            this.types = types;
        }
    }
    // Dang bi loi
    // public void removeTypeFromList(Type type){
    //     Set<Type> currentTypes = getTypes();
    //     Set<Type> removeList = new HashSet<Type>();
    //     removeList.add(type);
    //     currentTypes.removeAll(removeList);
    //     setTypes(currentTypes);
    // }

    public void addNewTypeToList(Type newType){
        Set<Type> currentTypes = getTypes();
        currentTypes.add(newType);
        setTypes(currentTypes);
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
