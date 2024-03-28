"use client";
import Book from "@/server/models/book.model";
import { useState } from "react";
export default () => {
  // const res= await.post(`/book/add/${parram.id}`);
  const [book, setBook] = useState<Book>({
    status: "unavailable",
    url: "",
    imageUrl: "",
    reviews: 0,
    rating: 0,
    lastUpdateAt: "",
    createdAt: "",
    price: 0,
    types: [],
    author: "",
    title: "",
    id: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Thêm sách:", book);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setBook({
      ...book,
      [name]: value,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-2xl mb-4">Thêm Sách</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-10 p-6 rounded-lg shadow-md w-full"
      >
        
          <div className="w-full ">
            <label className="block mb-2 ">Title:</label>
            <input
              className="border rounded-md p-2 w-full text-black"
              type="text"
              name="title"
              value={book.title}
              onChange={handleChange}
            />
          </div>
          <div className="w-full  ">
            <label className="block mb-2 ">Author:</label>
            <input
              className="border rounded-md p-2 w-full text-black"
              type="text"
              name="author"
              value={book.author}
              onChange={handleChange}
            />
          </div>
        

        <div className="mb-4 flex flex-wrap">
          <div className="w-full md:w-1/2 md:pr-2">
            <label className="block mb-2 ">Types:</label>
            <input
              className="border rounded-md p-2 w-full text-black"
              type="text"
              name="types"
              value={book.types}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 md:pl-2">
            <label className="block mb-2 ">Status:</label>
            <input
              className="border rounded-md p-2 w-full text-black"
              type="text"
              name="status"
              value={book.status}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-4 flex flex-wrap">
          <div className="w-full md:w-1/2 md:pr-2">
            <label className="block mb-2 ">URL:</label>
            <input
              className="border rounded-md p-2 w-full text-black"
              type="text"
              name="url"
              value={book.url}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 md:pl-2">
            <label className="block mb-2 ">Image URL:</label>
            <input
              className="border rounded-md p-2 w-full text-black"
              type="text"
              name="imageUrl"
              value={book.imageUrl}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-4 flex flex-wrap">
          <div className="w-full md:w-1/2 md:pr-2">
            <label className="block mb-2 ">Reviews:</label>
            <input
              className="border rounded-md p-2 w-full text-black"
              type="number"
              name="reviews"
              value={book.reviews}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 md:pl-2">
            <label className="block mb-2 ">Price:</label>
            <input
              className="border rounded-md p-2 w-full text-black"
              type="number"
              name="price"
              value={book.price}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-4 flex flex-wrap">
          <div className="w-full md:w-1/2 md:pr-2">
            <label className="block mb-2 ">Last Updated At:</label>
            <input
              className="border rounded-md p-2 w-full text-black"
              type="text"
              name="lastUpdateAt"
              value={book.lastUpdateAt}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 md:pl-2">
            <label className="block mb-2 ">Created At:</label>
            <input
              className="border rounded-md p-2 w-full text-black"
              type="text"
              name="createdAt"
              value={book.createdAt}
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          type="submit"
        >
          Thêm Sách
        </button>
      </form>
    </div>
  );
};
