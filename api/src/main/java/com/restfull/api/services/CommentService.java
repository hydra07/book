package com.restfull.api.services;

import com.restfull.api.dtos.book.CommentDTO;
import com.restfull.api.entities.Book;
import com.restfull.api.entities.Comment;
import com.restfull.api.entities.User;
import com.restfull.api.repositories.CommentRepository;
import com.restfull.api.utils.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class CommentService {

    @Autowired
    private CommentRepository repository;

    public List<Comment> findAll() {
        return repository.findAll();
    }

    public List<Comment> findByBook(Book book) {
        return repository.findByBook(book);
    }


    public Comment create(Comment comment) {
        return repository.save(comment);
    }

    @Transactional
    public Comment add(Comment comment){
        if (comment.getParent() == null){
            setLeftAndRightForNewRootComment(comment);
        } else {
            setLeftAndRightForNewChildComment(comment);
        }
        return repository.save(comment);
    }

    @Transactional
    public Comment replyComment(Comment reply,Long parentId){
        Comment parent = repository.findById(parentId)
                .orElseThrow(() -> new NotFoundException("Comment Not found"));
        reply.setParent(parent);
//        reply.setBook(parent.getBook());
//        reply.setUser();
        setLeftAndRightForNewChildComment(reply);
        return repository.save(reply);
    }

    public List<Comment> getRootCommentsByBookId(Long bookId){
        return repository.findByBookIdAndParentIsNull(bookId);
    }
    public List<Comment> getCommentsByBookId(Long bookId){
        return repository.findByBookIdOrderByLeftAsc(bookId);
    }
    //Get all Child comments of a comment
    public List<Comment> getAllChildComments(Comment parent){
        List<Comment> childComments = new ArrayList<>();
        getChildCommentsRecursive(parent,childComments);
        return childComments;
    }

    private Long getMinLeft(List<Comment> comments){
        return comments.stream()
                .mapToLong(Comment::getLeft)
                .min()
                .orElse(0);
    }

    private Long getMaxRight(List<Comment> comments){
        return comments.stream()
                .mapToLong(Comment::getRight)
                .max()
                .orElse(0);
    }


    private void getChildCommentsRecursive(Comment parent, List<Comment> childComments){
        List<Comment> directChildComments = repository.findByParent(parent);
        for (Comment child: directChildComments){
            childComments.add(child);
            getChildCommentsRecursive(child,childComments);
        }
    }

    private void setLeftAndRightForNewRootComment(Comment comment){
        Long maxRight = getMaxRight(repository.findAll());
        comment.setLeft(maxRight + 1);
        comment.setRight(maxRight + 2);
    }
    private void setLeftAndRightForNewChildComment(Comment comment){
        Comment parent = comment.getParent();
        comment.setLeft(parent.getRight());
        comment.setRight(parent.getRight() + 1);
        repository.save(comment);
//        parent.setRight(comment.getRight() + 1);
//        repository.save(parent);
        updateRight(parent);
        repository.findAll().stream().filter(c -> c.getLeft() >= comment.getRight())
                .forEach(c -> {
                            c.setLeft(c.getLeft() + 2);
                            c.setRight(c.getRight() + 2);
                            repository.save(c);
                        }
                );
    }
    private void updateRight(Comment comment){
        comment.setRight(comment.getRight() + 2);
        repository.save(comment);
        if (comment.getParent() != null) updateRight(comment.getParent());
    }
    private Comment findRootComment(Comment comment) {
        if (comment.getParent() == null) {
            return comment;
        }
        return findRootComment(comment.getParent());
    }

}
