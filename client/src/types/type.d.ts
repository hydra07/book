import Book from "@/types/book";

type Type = {
    id:number;
    name:string;
    description: string;
    books: Book[];
}

export default Type;