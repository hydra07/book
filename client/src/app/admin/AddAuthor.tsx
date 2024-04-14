"use client";
import axios from "@/lib/axios";
import { Button, Input, Textarea } from "@material-tailwind/react";
import { ChangeEvent, useCallback, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export interface AuthorInfo {
  id: number | null;
  name: string;
  description: string;
}

export default () => {
  const [author, setAuthor] = useState<AuthorInfo>({
    id: null,
    name: "",
    description: "",
  });

  const handleChange = useCallback(
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setAuthor((prev) => ({
        ...prev,
        [event.target.id]: event.target.value,
      }));
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // const namePattern = /^[a-zA-Z0-9\s]+$/;
    // if (!namePattern.test(author.name)) {
    //   toast.error("thêm tầm bậy tầm bạ rồi  ");
    //   return;
    // }

    try {
      const res = await axios.post(`/author/add`, author);
      console.log(res.data);
      toast.success("Thêm thành công  ");
      // Reset author state after successful submission
      setAuthor(author);
    } catch (error) {
      console.error("Error adding author:", error);
    }
  };

  return (
    <div className="flex flex-col h-full items-center justify-center min-h-screen bg-gray-900">
      <h1 className="text-2xl mb-4">Thêm Tác Giả</h1>
      <form onSubmit={handleSubmit} className="">
        <div className="mb-4">
          <Input
            variant="static"
            color="blue-gray"
            id="name"
            type="text"
            label="Tên tác giả"
            required
            value={author.name}
            onChange={handleChange}
            crossOrigin={null}
          />
        </div>
        <Textarea
          color="blue-gray"
          variant="static"
          id="description"
          label="Mô tả"
          required
          value={author.description}
          onChange={handleChange}
        />
        <Button
          className="text-white content-center mt-4 bg-green-600 w-1/2"
          type="submit"
          placeholder={null}
        >
          Thêm
        </Button>
      
      </form>
    </div>
  );
};
