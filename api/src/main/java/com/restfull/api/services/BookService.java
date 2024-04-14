package com.restfull.api.services;

import com.restfull.api.dtos.book.BookRateDTO;
import com.restfull.api.dtos.book.BookRequestDTO;
import com.restfull.api.dtos.book.CommentDTO;
import com.restfull.api.entities.*;
import com.restfull.api.enums.Rate;
import com.restfull.api.enums.Status;
import com.restfull.api.enums.Rate;
import com.restfull.api.repositories.BookRepository;
import com.restfull.api.utils.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
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

    @Autowired
    private RateBookService rateBookService;

    public List<Book> findAll() {
        return repository.findAll();
    }

    public Book findById(Long id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException("Book not found: " + id));
    }

    public List<Book> searchBooksByTitle(String keyword) {
        return repository.searchByName(keyword);
    }

    public List<Author> searchByAuthor(String keyword) {
        return repository.searchByAuthor(keyword);
    }

    public List<Type> searchByType(String keyword) {
        return repository.searchByType(keyword);
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

    public Book update(BookRequestDTO bookDto) {
        Book _book = findById(bookDto.getId());
        _book.setTitle(bookDto.getTitle());
        _book.setAuthor(authorService.findById(bookDto.getAuthorId()));
        _book.setDescription(bookDto.getDescription());
        _book.setImageUrl(bookDto.getImageUrl());
        _book.setStatus(Status.valueOf(bookDto.getStatus()));
        _book.setUrl(bookDto.getUrl());
        _book.setTypes(
                bookDto.getTypesId().stream().map(id -> typeService.getTypeById(id)).collect(Collectors.toSet()));
        return repository.save(_book);
    }

    public void delete(Long id) {

        repository.deleteBook(id);
    }

    public void increaseViews(Long id) {
        Book book = findById(id);
        book.incrementViews();
        repository.updateViews(id, book.getViews());
        // update(book);
    }

    public List<Book> findAllSortedByViews() {
        return repository.findAll(Sort.by(Sort.Direction.DESC, "views"));

    }

    public List<Book> findAllSortedByLatest() {
        return repository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    public void addFollowedUser(Book book, User user) {
        book.getFollowedBook().add(user);
        BookRequestDTO bookDto = convertToBookRequestDTO(book);
        update(bookDto);
    }

    public void removeFollowedUser(Book book, User user) {
        book.getFollowedBook().removeIf(_user -> _user.getId().equals(user.getId()));
        BookRequestDTO bookDto = convertToBookRequestDTO(book);
        update(bookDto);
    }

    private BookRequestDTO convertToBookRequestDTO(Book book) {
        BookRequestDTO bookDto = new BookRequestDTO();
        bookDto.setId(book.getId());
        bookDto.setTitle(book.getTitle());
        bookDto.setDescription(book.getDescription());
        bookDto.setImageUrl(book.getImageUrl());
        // ... set other fields as necessary ...
        return bookDto;
    }

    public String isUserFollowedBook(User user, Book book) {
        return " " + user.getFollowedBooks().contains(book) + book.getFollowedBook().contains(user) + " ";
    }

    public Comment addComment(Book book, User user, CommentDTO dto) {
        Comment comment = new Comment();
        comment.setContent(dto.getContent());
        comment.setBook(book);
        comment.setUser(user);

        // DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd
        // HH:mm:ss");
        // LocalDateTime _createAt = LocalDateTime.parse(dto.getCreatedAt(), formatter);
        // comment.setCreatedAt(Date.from(_createAt.atZone(java.time.ZoneId.systemDefault()).toInstant()));
        comment.setCreatedAt(new Date());
        return commentService.create(comment);
    }

    public List<Comment> getComment(Long id) {
        Book book = findById(id);
        return commentService.findByBook(book);
    }

    public Comment newComment(Book book, User user, CommentDTO dto) {
        Comment comment = new Comment();
        comment.setContent(dto.getContent());
        comment.setBook(book);
        comment.setUser(user);
        comment.setCreatedAt(new Date());
        return commentService.add(comment);
    }

    public Comment replyComment(Long parentId, Book book, User user, CommentDTO dto) {
        Comment reply = new Comment();
        reply.setBook(book);
        reply.setUser(user);
        reply.setContent(dto.getContent());
        reply.setCreatedAt(new Date());
        return commentService.replyComment(reply, parentId);
    }

    public List<Comment> getRootCommentByBookId(Long bookId) {
        return commentService.getRootCommentsByBookId(bookId);
    }

    public List<Comment> getCommentByBookId(Long bookId) {
        return commentService.getCommentsByBookId(bookId);
    }

    // public Book rateBook(Long bookId, int rate){
    // Book book = findById(bookId);
    // book.getRate().add(Rate.valueOf(rate));
    // return repository.save(book);
    // }

    public Book rateBook(Book book, User user, int rate) {
        try {
            RateBook rateBook = rateBookService.findByBookAndUser(user, book);
            // rateBook = new RateBook(user, book, Rate.valueOf(rate));
            rateBook.setRate(Rate.valueOf(rate));
            rateBookService.save(rateBook);
            // System.out.println("rateBook: " + rateBook.getRate());
            book.setRate(rateBookService.findAllRatesByBook(book));
            return repository.save(book);
        } catch (Exception e) {
            RateBook rateBook = new RateBook(user, book, Rate.valueOf(rate));
            rateBookService.save(rateBook);
            book.setRate(rateBookService.findAllRatesByBook(book));
            return repository.save(book);
        }
    }

    public int getRateBook(User user, Book book) {
        try {
            return rateBookService.findByBookAndUser(user, book).getRate().getValue();
        } catch (Exception e) {
            return 0;
        }
    }

    public Book deleteRateBook(Book book, User user) {
        RateBook rateBook = rateBookService.findByBookAndUser(user, book);
        rateBookService.delete(rateBook.getId());
        return book;
    }

    public boolean isRated(User user, Book book) {
        return isRated(user, book);
    }

    // public Book updateRateBook(Book book, User user, int rate){
    // RateBook rateBook = rateBookService.findByBookAndUser(user, book);
    // rateBook.setRate(Rate.valueOf(rate));
    // rateBookService.save(rateBook);
    // return book;
    // }

    // public List<Comment> getCommentTreeByBookId(Long bookId){
    // return commentService.getCommentTreeByBookId(bookId);
    // }
}

// public Book addTypeToBook(Long bookID, TypeRequestDTO typeDTO) {
// try {
// // Get book from repository
// Book book = findById(bookID);
// // Check if the book is already in this type
// if (book.getTypesIDString().contains(typeDTO.getId())) {
// throw new NotFoundException("The specified type is already in the list!");
// }
// // Get type from service
// Type type = typeService.getTypeById(typeDTO.getId());
// // Add the type list to the book
// book.addNewTypeToList(type);
// // Save the book to the repository
// return repository.save(book);
// } catch (Exception e) {
// String errorMessage = "An error occurred while adding the book to the type: "
// + e.getMessage();
// throw new RuntimeException(errorMessage);
// }
// }

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