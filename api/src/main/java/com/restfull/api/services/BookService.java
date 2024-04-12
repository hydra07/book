package com.restfull.api.services;

import com.restfull.api.dtos.book.BookRateDTO;
import com.restfull.api.dtos.book.BookRequestDTO;
import com.restfull.api.dtos.book.CommentDTO;
import com.restfull.api.entities.Book;
import com.restfull.api.entities.Comment;
import com.restfull.api.entities.User;
import com.restfull.api.entities.BookRate;
import com.restfull.api.enums.Status;
import com.restfull.api.enums.Rate;
import com.restfull.api.repositories.BookRepository;
import com.restfull.api.utils.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookService {

    @Autowired
    private BookRepository repository;

    @Autowired
    private TypeService typeService;

    @Autowired
    private UserService userService;

    @Autowired
    private BookRateService rateService;

    @Autowired
    private CommentService commentService;

    @Autowired
    private AuthorService authorService;

    public List<Book> findAll() {
        return repository.findAll();
    }

    public Book findById(Long id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException("Book not found: " + id));
    }

    public List<Book> searchByName(String keyword, String keyword1) {
        return repository.searchByName(keyword, keyword1);
    }

    public Book create(Book book) {
        return repository.save(book);
    }

    @Transactional
    public Book createBook(BookRequestDTO bookDto) {
        Book _book = new Book();
        _book.setTitle(bookDto.getTitle());
        _book.setAuthor(authorService.findById(bookDto.getAuthorId()));
        _book.setDescription(bookDto.getDescription());
        _book.setTypes(
                bookDto.getTypesId().stream().map(id -> typeService.getTypeById(id)).collect(Collectors.toSet()));

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime _createAt = LocalDateTime.parse(bookDto.getCreatedAt(), formatter);
        LocalDateTime _lastUpdateAt = LocalDateTime.parse(bookDto.getLastUpdateAt(), formatter);
        _book.setCreatedAt(Date.from(_createAt.atZone(java.time.ZoneId.systemDefault()).toInstant()));
        _book.setLastUpdateAt(Date.from(_lastUpdateAt.atZone(java.time.ZoneId.systemDefault()).toInstant()));
        _book.setUrl(bookDto.getUrl());
        _book.setStatus(Status.valueOf(bookDto.getStatus()));
        _book.setImageUrl(bookDto.getImageUrl());
        return repository.save(_book);
    }

    public Book update(Book book) {
        Book _book = findById(book.getId());
        _book.setTitle(book.getTitle());
        _book.setDescription(book.getDescription());
        _book.setImageUrl(book.getImageUrl());
        _book.setCreatedAt(book.getCreatedAt());
        _book.setLastUpdateAt(book.getLastUpdateAt());
        _book.setFollowedBook(book.getFollowedBook());
        _book.setTypes(book.getTypes());
        _book.setBookRate(book.getBookRates());
        return repository.save(_book);
    }

    public void delete(Long id) {
        Book book = findById(id);
        repository.delete(book);
    }

    public void increaseViews(Long id) {
        Book book = findById(id);
        book.incrementViews();
        repository.updateViews(id, book.getViews());
        // update(book);
    }

    public void addFollowedUser(Book book, User user) {
        book.getFollowedBook().add(user);
        update(book);
    }

    public void removeFollowedUser(Book book, User user) {
        book.getFollowedBook().removeIf(_user -> _user.getId().equals(user.getId()));
        update(book);
    }

    public String isUserFollowedBook(User user, Book book) {
        return " " + user.getFollowedBooks().contains(book) + book.getFollowedBook().contains(user) + " ";
    }

    public Comment addComment(Book book, User user, CommentDTO dto) {
        Comment comment = new Comment();
        comment.setContent(dto.getContent());
        comment.setBook(book);
        comment.setUser(user);

//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
//        LocalDateTime _createAt = LocalDateTime.parse(dto.getCreatedAt(), formatter);
//        comment.setCreatedAt(Date.from(_createAt.atZone(java.time.ZoneId.systemDefault()).toInstant()));
        comment.setCreatedAt(new Date());
        return commentService.create(comment);
    }

    public List<Comment> getComment(Long id) {
        Book book = findById(id);
        return commentService.findByBook(book);
    }

    public Comment newComment(Book book,User user,CommentDTO dto){
        Comment comment = new Comment();
        comment.setContent(dto.getContent());
        comment.setBook(book);
        comment.setUser(user);
        comment.setCreatedAt(new Date());
        return commentService.createComment(comment);
    }

    public Comment replyComment(Long parentId, Book book, User user, CommentDTO dto){
        Comment reply = new Comment();
        reply.setBook(book);
        reply.setUser(user);
        reply.setContent(dto.getContent());
        reply.setCreatedAt(new Date());
        return commentService.replyComment(reply,parentId);
    }

    public List<Comment> getRootCommentByBookId(Long bookId){
        return commentService.getRootCommentsByBookId(bookId);
    }
    public List<Comment> getCommentByBookId(Long bookId){
        return commentService.getCommentsByBookId(bookId);
    }

    // public List<Comment> getCommentTreeByBookId(Long bookId){
    //     return commentService.getCommentTreeByBookId(bookId);
    // }


//----------------------Rate---------------------
    public BookRate rateBook (Book book, User user, BookRateDTO dto){
        BookRate rate = new BookRate();
        rate.setBook(book);
        rate.setUser(user);
        rate.setRate(Rate.valueOf(dto.getRate()));
        return rateService.saveOrUpdate(rate);
    }

    public Double getAvgRate (Book book) {
        return book.getAverageBookRate();
    }

    public int getUserRate (Book book, User user){    
        try {
            BookRate rate = rateService.findByUserIdAndBookId(book.getId(), user.getId());
            return rate.getRateValue();
        } catch (Exception e) {
            return 0;
        }
    }
    
}
//    public Book addTypeToBook(Long bookID, TypeRequestDTO typeDTO) {
//        try {
//            // Get book from repository
//            Book book = findById(bookID);
//            // Check if the book is already in this type
//            if (book.getTypesIDString().contains(typeDTO.getId())) {
//                throw new NotFoundException("The specified type is already in the list!");
//            }
//            // Get type from service
//            Type type = typeService.getTypeById(typeDTO.getId());
//            // Add the type list to the book
//            book.addNewTypeToList(type);
//            // Save the book to the repository
//            return repository.save(book);
//        } catch (Exception e) {
//            String errorMessage = "An error occurred while adding the book to the type: " + e.getMessage();
//            throw new RuntimeException(errorMessage);
//        }
//    }

// public Book removeTypeFromBook (Long bookID, TypeRequestDTO typeDTO){
// try {
// // Get book from repository
// Book book = findById(bookID);
// // Get type from service
// Type type = typeService.getTypeById(typeDTO.getId());
// // Check if the book is already in this type
// if (!book.getTypesIDString().contains(type.getId())) {
// throw new Exception("This book don't have that specified type!");
// }
// // Remove type from book
// book.removeTypeFromList(type);
// // Save the book to the repository
// return repository.save(book);
// } catch (Exception e) {
// String errorMessage = "An error occurred while remove the type from the book:
// " + e.getMessage();
// throw new RuntimeException(errorMessage);
// }
// }

// @Transactional
// public void createBook(BookDTO bookDTO){
// Book book = new Book(bookDTO);
// repository.save(book);
// book = setTypeByString(bookDTO.getTypes(), book);
// book = setImageByString(bookDTO.getImages(), book);
// update(book);
// }

