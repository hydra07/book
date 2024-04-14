'use client';
import Book, { Type } from "@/types/book";
import TypeBook from "./TypeBook";
import { getAllTypesFromBooks, getBookByType } from '@/utils/sort.utils';
import { useState } from "react";
import Carousel from "./Carousel";
import Footer from "./Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SortByViews from "./SortByViews";
import SortByLatest from "./SortByLatest";

export default ({
  listBook,
  sortByViews,
  sortByLatest,
}: {
  listBook: Book[];
  sortByViews: Book[];
  sortByLatest: Book[];
}) => {
  const [books, setBooks] = useState<Book[]>(listBook);
  const [types, setTypes] = useState<Type[]>(getAllTypesFromBooks(listBook!));
  console.log('from index.tsx')
  return (
    <div>
      <Carousel />
      <div className="h-auto w-screen">
        <div className="">
          <SortByViews books={sortByViews} />
          <SortByLatest books={sortByLatest} />
          {types?.map((type) => {
            return (
              <TypeBook
                type={type.name}
                books={getBookByType(listBook!, type)}
                key={type.id}
              />
            );
          })}
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
}