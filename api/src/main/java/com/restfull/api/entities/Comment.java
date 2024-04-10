package com.restfull.api.entities;

import com.restfull.api.dtos.book.CommentDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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


    @Column(name = "lft")
    private Long left;

    @Column(name = "rgt")
    private Long right;


    @ManyToOne
    @JoinColumn(name = "parent_id")
    private Comment parent;

//    @OneToMany(mappedBy = "parent", fetch = FetchType.EAGER ,cascade = CascadeType.ALL, orphanRemoval = true )
//    private List<Comment> children = new ArrayList<>();


    @Override
    public String toString(){
        return "id: "+ this.id +"," +
                "content: " + this.content + "," +
                "left: " + this.left + "," +
                "right: " + this.right + ",";
    }

}
