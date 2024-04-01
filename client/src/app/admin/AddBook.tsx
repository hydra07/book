// 'use client';
import { Button, Input, Textarea } from '@material-tailwind/react';
import { ChangeEvent, useCallback, useState } from 'react';

interface BookRequest {
  id: number | null;
  title: string;
  authorId: number;
  description: string;
  typesId: Array<number>;
  createdAt: string;
  lastUpdateAt: string;
  price: number | 0;
  url: string;
  imageUrl: string;
  status: string;
}

export default ({ authors, types }: any) => {
  // const res= await.post(`/book/add/${parram.id}`);
  const [form, setForm] = useState<BookRequest>({
    id: null,
    title: '',
    authorId: authors[0].id,
    description: '',
    typesId: [],
    createdAt: '',
    lastUpdateAt: '',
    price: 0,
    url: '',
    imageUrl: '',
    status: '',
  });
  const author = () => {
    return authors.map((author: any) => {
      return (
        <option key={author.name} value={author.id}>
          {author.name}
        </option>
      );
    });
  };
  const type = () => {
    return types.map((type: any, index: number) => {
      return (
        <div key={index} className="">
          <input
            type="checkbox"
            id={`type-${index}`}
            name="type"
            value={type}
            onChange={handleTypeChange}
          />
          <label htmlFor={`type-${index}`}>{type.name}</label>
        </div>
      );
    });
  };
  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    setForm((prevForm) => {
      if (checked) {
        // If the checkbox is checked, add the type ID to the array
        return { ...prevForm, typesId: [...prevForm.typesId, Number (value)] };
      } else {
        // If the checkbox is unchecked, remove the type ID from the array
        return {
          ...prevForm,
          typesId: prevForm.typesId.filter((id) => id !== Number(value)),
        };
      }
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };
  const handleChange = useCallback(
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setForm((prev) => ({
        ...prev,
        [event.target.id]: event.target.value,
      }));
    },
    [form],
  );
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <h1 className="text-2xl mb-4">Thêm Sách</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-3">
          <Input
            variant="static"
            color="white"
            id="title"
            type="text"
            label="Tên sách"
            required
            value={form.title}
            onChange={handleChange}
            crossOrigin={null}
          />
          <div className="relative h-10 w-72 min-w-[200px]">
            <select
              className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              id="authorId"
              required
              value={form.authorId}
              onChange={handleChange}
            >
              {author()}
            </select>
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Chọn tác giả
            </label>
          </div>
          <Textarea
            // color="white"
            variant="standard"
            // color="white"
            id="description"
            label="Mô tả"
            required
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '10px',
          }}
        >
          {type()}
        </div>
        <Button
          className="text-white content-center bg-green-600 w-1/2"
          type={'submit'}
          placeholder={null}
        >
          Save
        </Button>
      </form>
    </div>
  );
};
