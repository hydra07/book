package com.restfull.api.dtos.book;

import com.restfull.api.entities.Book;
import com.restfull.api.entities.Comment;
import com.restfull.api.entities.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.text.SimpleDateFormat;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
class CommentBook{
    private Long id;
    private String title;

    CommentBook(Book book){
        this.id = book.getId();
        this.title = book.getTitle();
    }
}

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
class CommentUser {
    private Long id;
    private String name;
    private String image;

    CommentUser(User user){
        this.id = user.getId();
        this.name = user.getName();
        this.image = user.getAvatar();
    }
}

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CommentDTO {
    private Long id;
    private String content;

    private CommentBook book;
    private CommentUser user;

    private String createdAt;

    public CommentDTO(Comment comment){
        this.id = comment.getId();
        this.content = comment.getContent();
        this.book = new CommentBook(comment.getBook().getId(), comment.getBook().getTitle());
        this.user = new CommentUser(comment.getUser().getId(), comment.getUser().getName(), comment.getUser().getAvatar());
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        this.createdAt = formatter.format(comment.getCreatedAt());
    }
}
