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

    public Comment createComment(Comment comment){

        if (comment.getParent() == null){
            setLeftAndRightForNewRootComment(comment);
        } else {
            setLeftAndRightForNewChildComment(comment);
        }
        System.out.println(comment.getRight()+ " "+comment.getLeft());
        return repository.save(comment);
    }

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
//    public List<Comment> getCommentTreeByBookId(Long bookId) {
//        List<Comment> comments = repository.findByBookIdOrderByLeftAsc(bookId);
//        return buildCommentTree(comments);
//    }
//    public List<Comment> buildCommentTree(List<Comment> comments){
//        List<Comment> rootComments = new ArrayList<>();
//        Map<Long, Comment> commentMap = new HashMap<>();
//
//        for(Comment comment:comments){
//            commentMap.put(comment.getId(),comment);
//        }
//
//        for(Comment comment:comments){
//            if (comment.getParent() == null){
//                rootComments.add(comment);
//            } else {
//                Comment parent = commentMap.get(comment.getParent().getId());
//                if (parent != null){
////                    parent.getChildren().add(comment);
//                    comment.setParent(parent);
//                }
//            }
//        }
//        return rootComments;
//    }



    private void setLeftAndRightForNewRootComment(Comment comment){
        Long maxRgt = repository.findAll().stream()
                .mapToLong(Comment::getRight)
                .max()
                .orElse(0);
        comment.setLeft(maxRgt + 1);
        comment.setRight(maxRgt + 2);
    }
    private void setLeftAndRightForNewChildComment(Comment comment){
        Comment parent = comment.getParent();
        Long maxRgtBeforeParent = repository.findAll().stream()
                .filter((c) ->  c.getRight() < parent.getLeft())
                .mapToLong(Comment::getRight)
                .max()
                .orElse(0);
        repository.findAll().stream()
                .filter(c -> c.getLeft() > maxRgtBeforeParent)
                .forEach(c -> {
                    c.setLeft(c.getLeft() + 2);
                    c.setRight(c.getRight() + 2);
                });
        comment.setLeft(maxRgtBeforeParent + 1);
        comment.setRight(maxRgtBeforeParent + 2);
    }


}
