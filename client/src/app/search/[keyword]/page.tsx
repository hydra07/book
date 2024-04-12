'use client'
import React, { useState, useEffect } from 'react';
import axios from '../../../lib/axios';
import Book from '@/types/book';
// import Book, { Author, Type } from '@/types/book';
import BookCard from '../../(components)/search/BookCard';

interface Author {
  id: number;
  name: string;
  description: string;
}
interface Type {
  id: number;
  name: string;
  description: string;
}

const SearchPage: React.FC<{ params: { keyword: string } }> = ({ params }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  useEffect(() => {
    const fetchBooks = async () => {  
      try {
        const res = await axios.get(`/book/search?keyword=${params.keyword}`);
        setBooks(res.data.books);
        setAuthors(res.data.authors);
        setTypes(res.data.types);
        console.log(res.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, [params.keyword]);

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <h2 className="text-2xl font-bold mb-8">Kết quả tìm kiếm</h2>
      {books.length > 0 && (
        <div>
          <p className="text-xl font-semibold pl-4">Book found</p>
          {books.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
      {authors.length > 0 && (
        <div className="mt-8">
          <p className="text-xl font-semibold pl-4">Author found</p>
          {authors.map(author => (
            <div className="my-4" key={author.id}>
              <div className="font-semibold pl-10">{author.name}</div>
              <div className="text-gray-500">{author.description}</div>
            </div>
          ))}
        </div>
      )}
      {types.length > 0 && (
        <div className="mt-8">
          <p className="text-xl font-semibold pl-4">Type found</p>
          {types.map(type => (
            <div className="my-4" key={type.id}>
              <div className="font-semibold pl-10">{type.name}</div>
              <div className="text-gray-500 pl-12">{type.description}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
