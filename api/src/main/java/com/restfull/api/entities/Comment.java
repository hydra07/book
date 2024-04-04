package com.restfull.api.entities;

import com.restfull.api.dtos.book.CommentDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
@Table(name="comments")
@AllArgsConstructor
@NoArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "NVARCHAR(2000)")
    private String content;

//    @ElementCollection
//    @CollectionTable(name = "comment_images", joinColumns = @JoinColumn(name = "comment_id"))
//    @Column(name = "image_url")
//    private List<String> images = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private Date createdAt;
}
