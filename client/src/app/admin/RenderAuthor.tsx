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

interface AuthorInfo {
    id: number | null;
    name: string;
    description: string;
}



export default () => {
    const [authors, setAuthors] = useState<AuthorInfo[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAuthors, setSelectedAuthors] = useState<AuthorInfo | null>(
        null
    );
    const TABLE_HEAD = ["Name", "Description", ""];

    useEffect(() => {
        const loadAuthors = async () => {
            try {
                const res = await axios.get(`/author/getAll`);
                setAuthors(res.data);
                if (Array.isArray(res.data)) {
                    setAuthors(res.data);
                }
            } catch (error) {
                console.error("Error fetching books:", error);
            }
            // Ở đây bạn có thể thực hiện các xử lý dựa trên dữ liệu authors nếu cần
        };

        loadAuthors();
    }, []);

    const handleEdit = (author: AuthorInfo) => {
        setSelectedAuthors(author);
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
                        {authors.map((author) => {
                            return (
                                <tr key={author.id}>
                                    <td className="text-white bg-gray-600 p-4 flex flex-row">
                                        <Typography
                                            placeholder={null}
                                            variant="small"
                                            color="white"
                                            className="font-strong "
                                        >
                                            {author.name}
                                        </Typography>
                                    </td>

                                    <td className="text-white bg-gray-600 p-4">
                                        <Typography
                                            placeholder={null}
                                            variant="small"
                                            color="white"
                                            className="font-normal"
                                        >
                                            {author.description}
                                        </Typography>
                                    </td>

                                    <td className="text-white bg-gray-600 p-4">
                                        <Tooltip content="Edit">
                                            <IconButton
                                                placeholder={null}
                                                onClick={() => {
                                                    handleEdit(author);
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
            {/* {isModalOpen && (
        <EditBook
          book={selectedBook}
          closeModal={ClosedModal}
          books={books}
          setBooks={setBooks}
          authors={authors}
          types={types}
        />
      )} */}
        </Card>
    );
};
