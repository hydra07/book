"use client ";

import axios from "@/lib/axios";
import { Button, Input } from "@material-tailwind/react";
import { ChangeEvent, useCallback, useState } from "react";
import { toast } from "react-toastify";
interface TypeInfo {
  name: string;
  id: number | null;
  description: string;
}
export default () => {
  const [type, setType] = useState<TypeInfo>({
    name: "",
    id: null,
    description: "",
  });

  const handleChange = useCallback(
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setType((prev) => ({
        ...prev,
        [event.target.id]: event.target.value,
      }));
    },
    []
  );
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    
    try {
      const res = await axios.post(`/type/new`, type);
      console.log(res.data);
      toast.success("Thêm thành công  ");
      setType(type);
    } catch (error) {
      console.error("Error adding author:", error);
    }
  };
  return (
    <div className="flex flex-col h-full items-center justify-center min-h-screen bg-gray-900">
      <h1 className="text-2xl mb-4">Thêm Loại Sách</h1>
      <form onSubmit={handleSubmit} className="">
        <div className="mb-4 ">
          {/* <input
            className="border rounded-md p-2 w-full text-black"
            type="text"
            name="name"
            value={types.name}
            onChange={handleChange}
          /> */}
          <Input
            color="white"
            crossOrigin={null}
            variant="static"
            label="Name types"
            id="name"
            value={type.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <Input
            color="white"
            crossOrigin={null}
            variant="static"
            label="Mô tả"
            id="description"
            value={type.description}
            onChange={handleChange}
          />
        </div>
        <Button
          placeholder={null}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          type="submit"
        >
          Add
        </Button>
      </form>
    </div>
  );
};
