'use client';
// import Book from "@/server/models/book.model";
import Book  from "@/types/book";
import BookCard from "../home/BookCard";
export default ({ books }: { books: Book[] }) => {
	return (
		<div>
			{books.map((book, index) => (
				<BookCard key={book.title} book={book} />
			))}
		</div>
	)
}
