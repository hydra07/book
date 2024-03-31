package com.restfull.api.entities;



import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Entity
@Table(name = "reader", uniqueConstraints = @UniqueConstraint(columnNames = {"book_id", "user_id"}))
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookReader {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    private Book book;

    private Date lastAccess;



    //Page
    @Column(columnDefinition = "NVARCHAR(1000)")
    private String chapterName;
    @Column(nullable = true)
    private Integer currentPage = 0;
    @Column(nullable = true)
    private Integer totalPage = 0;
    private String startCfi;
    private String endCfi;
    private String base;

    private String lastCurrentCfi;

    private int accessCount = 0;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Bookmark> bookmarks = new ArrayList<>();

    public BookReader(User user, Book book) {
        this.user = user;
        this.book = book;
    }
    
    public void addBookmark(Bookmark bookmark){
        bookmarks.add(bookmark);
    }

}
