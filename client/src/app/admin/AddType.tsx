"use client ";
import Type from "@/types/type";
import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";

export default () => {
  const initialTypesState: Type = {
    name: "",
    description: "",
    id: 1,
    books: [],
  };
  const [types, setTypes] = useState<Type>(initialTypesState);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (types.name && types.description) {
      console.log("Thêm loại sách:", types);
      setTypes(initialTypesState);
    } else {
      console.log("Chưa có đủ thông tin loại sách.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setTypes({
      ...types,
      [name]: value,
    });
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-2xl mb-4">Thêm Loại Sách</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white text-white bg-opacity-10 p-6 rounded-lg shadow-md w-1/4"
      >
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
            crossOrigin={Input}
            variant="outlined"
            label="Name types"
            value={types.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <Input
            color="white"
            crossOrigin={Input}
            variant="outlined"
            label="Mô tả"
            value={types.description}
            onChange={handleChange}
          />
        </div>
        <Button
          placeholder={true}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          type="submit"
        >
          Add
        </Button>
      </form>
    </div>
  );
};
