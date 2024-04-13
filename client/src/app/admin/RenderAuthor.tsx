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
import EditAuthor from "./EditAuthor";

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
    const handleDelete = async (authorId: number | null) => {
        try {
            await axios.delete(`/author/delete/${authorId}`);
            // Sau khi xóa thành công, cập nhật danh sách tác giả
            const updatedAuthors = authors.filter((author) => author.id !== authorId);
            setAuthors(updatedAuthors);
        } catch (error) {
            console.error("Error deleting author:", error);
        }
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
                                    <td className="text-white bg-gray-600 p-4">
                                        <Tooltip content="Delete">
                                            <IconButton
                                                placeholder={null}
                                                onClick={() => {
                                                    handleDelete(author.id);
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
                                                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
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
                <EditAuthor
                    author={selectedAuthors}
                    closeModal={ClosedModal}
                    setAuthors={setAuthors}
                    authors={authors}
                />
            )}
        </Card>
    );
};
