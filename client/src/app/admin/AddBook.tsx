"use client";
import axios from "@/lib/axios";

import { Button, Input } from "@material-tailwind/react";
import { Axios, AxiosError } from "axios";
import { ChangeEvent, useCallback, useState } from "react";
interface BookInfo {
  id: number;
  title: string;
  authorId: number;
  description: string;
  typesId: number[];
  price: number;
  createdAt: string;
  lastUpdateAt: string;
  url: string;
  status: "ONGOING" | "FINISHED"; // Đảm bảo trường này chỉ có giá trị 'ONGOING' hoặc 'FINISHED'
  imageUrl: string;
}
export default () => {
  // const res= await.post(`/book/add/${parram.id}`);
  const [book, setBook] = useState<BookInfo>({
    id: 1,
    title: "",
    authorId: 0,
    description: "",
    typesId: [],
    price: 0,
    createdAt: "",
    lastUpdateAt: "",
    url: "",
    status: "ONGOING",
    imageUrl: "",
  });
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setBook((prev) => ({
        ...prev,
        [event.target.id]: event.target.value,
      }));
    },
    [book]
  );
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <h1 className="text-2xl mb-4">Thêm Sách</h1>
    </div>
  );
};
