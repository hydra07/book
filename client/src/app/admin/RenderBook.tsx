"use client";
import axios from "@/lib/axios";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  IconButton,
  Input,
  Tooltip,
} from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react";
import Image from "next/image";

import { SetStateAction, useEffect, useState } from "react";
// import EditBook from "./EditBook";
import { useRouter } from "next/router";
import { timeFormatter } from "@/utils/epub.utils";
import EditBook from "./EditBook";
import SearchList from "./SearchList";

export interface BookDTO {
  id: number | null;
  title: string;
  authorId: number;
  description: string;
  typesId: Array<number>;
  createdAt: string;
  lastUpdateAt: string;
  url: string;
  imageUrl: string;
  status: "ONGOING" | "COMPLETED" | "DISCONTINUED";
}
const fetchType = async () => {
  try {
    const res = await axios.get(`/type/getAll`);
    return await res.data;
  } catch (error) {
    return null;
  }
};

const fetchAuthor = async () => {
  try {
    const res = await axios.get(`/author/getAll`);
    console.log(res.data);
    return await res.data;
  } catch (error) {
    return null;
  }
};

export default () => {
  const [authors, setAuthors] = useState<any[]>([]);
  const [types, setTypes] = useState<any[]>([]);

  const [books, setBooks] = useState<BookDTO[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookDTO | null>(null);

  const TABLE_HEAD = ["Title", "Status", "Create At", "Last Update At", ""];

  useEffect(() => {
    const fetchBooks = async () => {
      const fetchedAuthors = await fetchAuthor();
      const fetchedTypes = await fetchType();
      setAuthors(fetchedAuthors);
      setTypes(fetchedTypes);
      try {
        const response = await axios.get("/book/getAll");
        setBooks(response.data);
        if (Array.isArray(response.data)) {
          setBooks(response.data);
        }
        // Sử dụng book ở đây
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);
  const handleEdit = (book: BookDTO) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };
  const ClosedModal = () => {
    setIsModalOpen(false);
  };
  return (
    <Card placeholder={null} className="h-full w-full bg-gray-700 ">
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none bg-gray-700 flex "
        placeholder={null}
      >
        <div className="ml-auto">
          <SearchList />
        </div>
      </CardHeader>
      <CardBody placeholder={null} className=" overflow-scroll">
        <table className=" bg-gray-600 w-full min-w-max table-auto text-left ">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-b text-white bg-gray-800 p-4">
                  <Typography
                    placeholder={null}
                    variant="small"
                    color="blue-gray"
                    className="font-normal text-white  "
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {books.map((book) => {
              
              return (
                <tr key={book.id}>
                  <td className="text-white bg-gray-600 p-4 flex flex-row">
                    <Avatar
                      placeholder={null}
                      variant="square"
                      src={book.imageUrl}
                    ></Avatar>
                    <Typography
                      placeholder={null}
                      variant="small"
                      color="white"
                      className="font-normal px-3"
                    >
                      {book.title}
                    </Typography>
                  </td>

                  <td className="text-white bg-gray-600 p-4">
                    <Typography
                      placeholder={null}
                      variant="small"
                      color="white"
                      className="font-normal"
                    >
                      {book.status}
                    </Typography>
                  </td>
                  <td className="text-white bg-gray-600 p-4">
                    <Typography
                      placeholder={null}
                      variant="small"
                      color="white"
                      className="font-normal"
                    >
                      {book.createdAt}
                    </Typography>
                  </td>
                  <td className="text-white bg-gray-600 p-4">
                    <Typography
                      placeholder={null}
                      variant="small"
                      color="white"
                      className="font-normal"
                    >
                      {book.lastUpdateAt}
                    </Typography>
                  </td>
                  <td className="text-white bg-gray-600 p-4">
                    <Tooltip content="Edit">
                      <IconButton
                        placeholder={null}
                        onClick={() => {
                          handleEdit(book);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </svg>
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      {isModalOpen && (
        <EditBook
          book={selectedBook}
          closeModal={ClosedModal}
          books={books}
          setBooks={setBooks}
          authors={authors}
          types={types}
        />
      )}
    </Card>
  );
};
