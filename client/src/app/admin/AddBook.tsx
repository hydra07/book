"use client";
import axios from "@/lib/axios";
import Book from "@/server/models/book.model";
import { Button, Input } from "@material-tailwind/react";
import { Axios, AxiosError } from "axios";
import { useState } from "react";
export default () => {
  // const res= await.post(`/book/add/${parram.id}`);
  const [book, setBook] = useState<Book>({
    status: "",
    url: "",
    imageUrl: "",
    reviews: 0,
    rating: 0,
    lastUpdateAt: "",
    createdAt: "",
    price: 0,
    types: [],
    author: 3,
    title: "",
    id: 4,
    description: "",
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`book/add`,book);
      console.log("Thêm sách:", res.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // Backend trả về lỗi
        console.error("Lỗi từ server:", axiosError.response.data);
      } else if (axiosError.request) {
        // Không nhận được phản hồi từ server
        console.error(
          "Không nhận được phản hồi từ server:",
          axiosError.request
        );
      } else {
        // Lỗi trong quá trình thiết lập yêu cầu
        console.error("Lỗi khi thiết lập yêu cầu:", axiosError.message);
      }
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBook({
      ...book,
      [name]: value,
    });
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <h1 className="text-2xl mb-4">Thêm Sách</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 bg-opacity-10 p-6 rounded-lg shadow-md w-full"
      >
        <div className="w-full mb-4 flex flex-wrap ">
          <Input
            className="h-14 mb-4"
            size="lg"
            color="white"
            name="title"
            type="text"
            label="Title"
            required
            autoComplete="off"
            value={book.title}
            onChange={(event) => handleChange(event)}
            crossOrigin={null}
          />
        </div>
        <div className="w-full mb-4 flex flex-wrap ">
          <Input
            crossOrigin={null}
            color="white"
            type="number"
            name="author"
            value={book.author}
            onChange={handleChange}
            label="Author"
            required
          />
        </div>
        <div className="w-full mb-4 flex flex-wrap ">
          <Input
            crossOrigin={null}
            color="white"
            type="text"
            name="description"
            value={book.description}
            onChange={handleChange}
            label="Description"
            required
          />
        </div>

        <div className="mb-4 flex flex-wrap">
          {/* <input
              className="border rounded-md p-2 w-full text-black"
              type="text"
              name="types"
              value={book.types}
              onChange={handleChange}
            /> */}
          <div className="w-full md:w-1/2 md:pr-2">
            <Input
              crossOrigin={null}
              color="white"
              type="number"
              value={book.id}
              onChange={handleChange}
              label="Id"
              name="id"
              required
            />
          </div>
          <div className="w-full md:w-1/2 md:pr-2">
          <Input
            crossOrigin={null}
            color="white"
            value={book.status}
            onChange={handleChange}
            label="Status"
            name="status"
            required
          />
          </div>
        </div>

        <div className="mb-4 flex flex-wrap">
          <div className="w-full md:w-1/2 md:pr-2">
            <Input
              crossOrigin={null}
              color="white"
              value={book.url}
              onChange={handleChange}
              label="Url"
              name="url"
              required
            />
          </div>
          <div className="w-full md:w-1/2 md:pl-2">
            <Input
              crossOrigin={null}
              color="white"
              value={book.imageUrl}
              onChange={handleChange}
              label="Image"
              type="text"
              name="imageUrl"
              required
            />
          </div>
        </div>

        <div className="mb-4 flex flex-wrap">
          <div className="w-full md:w-1/2 md:pr-2">
            <Input
              crossOrigin={null}
              color="white"
              value={book.reviews}
              onChange={handleChange}
              label="Review"
              name="reviews"
              required
            />
          </div>
          <div className="w-full md:w-1/2 md:pl-2">
            <Input
              crossOrigin={null}
              color="white"
              value={book.price}
              onChange={handleChange}
              label="Price"
              type="number"
              required
              name="price"
            />
          </div>
        </div>

        <div className="mb-4 flex flex-wrap">
          <div className="w-full md:w-1/2 md:pr-2">
            <Input
              crossOrigin={null}
              color="white"
              value={book.createdAt}
              onChange={handleChange}
              label="CreateDate"
              type="date"
              name="createdAt"
            />
          </div>
          <div className="w-full md:w-1/2 md:pl-2">
            <Input
              crossOrigin={null}
              color="white"
              value={book.lastUpdateAt}
              onChange={handleChange}
              label="LastDate"
              type="date"
              name="lastUpdateAt"
            />
          </div>
        </div>

        <Button
          placeholder={true}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          type="submit"
        >
          Thêm Sách
        </Button>
      </form>
    </div>
  );
};
