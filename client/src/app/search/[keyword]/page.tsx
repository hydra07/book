'use client'
import React, { useState, useEffect } from 'react';
import axios from '../../../lib/axios';
import Book from '@/types/book';
// import Book, { Author, Type } from '@/types/book';
import BookCard from '../../(components)/search/BookCard';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

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

  const data = [
    { label: 'Book', value: 'book' },
    { label: 'Author', value: 'author' },
    { label: 'Type', value: 'type' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-24">
      <h2 className="text-4xl font-bold mb-8">Kết quả tìm kiếm</h2>
      <Tabs value="book">
        <TabsHeader placeholder={null}>
          {data.map(({ label, value }) => (
            <Tab placeholder={null} key={value} value={value}>
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody placeholder={null}>
          {data.map(({ value }) => (
            <TabPanel key={value} value={value} className="text-white">
              {value === 'book' && (
                <div className="flex flex-col space-y-4">
                  {/* <p className="text-xl font-semibold pl-4">Book found</p> */}
                  {books.map(book => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              )}
              {value === 'author' && (
                <div className="mt-8">
                  {/* <p className="text-xl font-semibold pl-4">Author found</p> */}
                  {authors.map(author => (
                    <div className="text-2xl my-8" key={author.id}>
                      <div className="font-semibold p-4 pl-10">{author.name}</div>
                      <div className="text-gray-500 pl-20">{author.description}</div>
                    </div>
                  ))}
                </div>
              )}
              {value === 'type' && (
                <div className="mt-8">
                  {/* <p className="text-xl font-semibold pl-4">Type found</p> */}
                  {types.map(type => (
                    <div className="text-2xl my-8" key={type.id}>
                      <div className="font-semibold p-4 pl-10">{type.name}</div>
                      <div className="text-gray-500 pl-20">{type.description}</div>
                    </div>
                  ))}
                </div>
              )}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default SearchPage;
