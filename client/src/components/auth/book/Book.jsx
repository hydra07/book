import { useDispatch, useSelector } from 'react-redux'
import { getbook, addBook, updateBook, deleteBook, searchBooks  } from './bookSlice'

const BookList = () => {
  const dispatch = useDispatch()
  const books = useSelector((state) => state.books)

  const handleAddBook = () => {
    const newBook = {
      id: Date.now(),
      name: 'New Book',
      author: 'New Author'
    }
    dispatch(addBook(newBook))
  }
  const handleGetBook = () => {
    const newBook = {
      id: Date.now(),
      name: 'New Book',
      author: 'New Author'
    }
    dispatch(getBook(newBook))
  }
  const handleSearchBooks = () => {
    const newBook = {
      id: Date.now(),
      name: 'New Book',
      author: 'New Author'
    }
    dispatch(searchBooks(newBook))
  }
  const handleDeleteBook = (id) => {
    dispatch(deleteBook(id))
  }

  const handleUpdateBook = (id, updatedBook) => {
    dispatch(updateBook(id, updatedBook))
  }

  return (
    <div>
      <button onClick={handleAddBook}>Add Book</button>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.name} by {book.author}
            <button onClick={() => handleDeleteBook(book.id)}>Remove</button>
            <button onClick={() => handleUpdateBook(book.id, { name: 'Updated Book', author: 'Updated Author' })}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BookList