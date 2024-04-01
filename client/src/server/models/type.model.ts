import Book from "./book.model";
export class Type {
	private id:number;
	private name:string;
	private description:string;
	private book:Book;
	constructor(id:number,name:string,description:string,book:Book){
		this.id = id;
		this.name = name;
		this.description = description;
		this.book = book;
	}
}
 