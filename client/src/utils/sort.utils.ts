import Book, { Type } from "@/types/book";
import unidecode from "unidecode";
//get All type
export function getAllTypesFromBooks(books: Book[]): Type[] {
	const types: Type[] = [];

	books.forEach(book => {
		book.types!.forEach(type => {
			if (!types.find(t => t.id === type.id)) {
				types.push(type);
			}
		});
	});
	return types;
}

//get List Book by type
export function getBookByType(books: Book[], type: Type): Book[] {
	// const filteredBooks: Book[] = books.filter((book) => book.types?.includes(type))
	// console.log(filteredBooks);
	// return filteredBooks;

	return books.filter(book => {
		return book.types!.some(t => t.id === type.id); 
	});
}
//
export function getStandardizationTitle(book: Book) {
	const title: string = book.title;
	return unidecode(title).toLowerCase().replace(/\s+/g, '-');
}
