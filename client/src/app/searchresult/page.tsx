'use client'
import React, { useState, useEffect } from 'react';
import axios from '../../lib/axios';
import Book from '@/types/book';
import BookCard from '../(components)/search/BookCard';


const SearchPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('URL_API'); // Thay URL_API bằng URL của API
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <h2 className="text-2xl font-bold mb-4 pl-4">Kết quả tìm kiếm</h2>
        {books.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
  );
};

export default SearchPage;
