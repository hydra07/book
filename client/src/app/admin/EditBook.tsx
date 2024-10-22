// 'use client';

import axios from '@/lib/axios';
import useUploadFile from '@/lib/hooks/useUploadFile';
import { timeFormatter } from '@/utils/epub.utils';
import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
  Input,
  Textarea,
  Typography,
} from '@material-tailwind/react';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { BookDTO } from './RenderBook';

interface EditBookProps {
  book: BookDTO | null;
  closeModal: () => void;
  books: BookDTO[];
  setBooks: React.Dispatch<React.SetStateAction<BookDTO[]>>;
  authors: any[];
  types: any[];
}

export default ({
  authors,
  types,
  book,
  closeModal,
  books,
  setBooks,
}: EditBookProps) => {
  const initialBookData: BookDTO = {
    createdAt: '',
    lastUpdateAt: '',
    id: null,
    title: '',
    authorId: authors[0]?.id, // fix for potential undefined authors
    description: '',
    typesId: [],
    url: '',
    imageUrl: '',
    status: 'ONGOING',
  };

  const [form, setForm] = useState<BookDTO>(initialBookData);
  const [image, setImage] = useState<File | null>(null);
  const [epub, setEpub] = useState<File | null>(null);

  const { fileUrl: imageUrl } = useUploadFile({ file: image, name: 'image' });
  const { fileUrl: epubUrl } = useUploadFile({ file: epub, name: 'epub' });

  const author = () => {
    return authors.map((author) => {
      return (
        <option
          className="bg-gray-900 text-white"
          key={author.name}
          value={author.id}
        >
          {author.name}
        </option>
      );
    });
  };
  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    setForm((prevForm) => {
      if (checked) {
        return {
          ...prevForm,
          typesId: [...(prevForm.typesId || []), Number(value)],
        };
      } else {
        // Kiểm tra và đảm bảo prevForm.typesId là mảng
        if (Array.isArray(prevForm.typesId)) {
          return {
            ...prevForm,
            typesId: prevForm.typesId.filter((id) => id !== Number(value)),
          };
        } else {
          console.error('prevForm.typesId is not an array');
          return prevForm;
        }
      }
    });
  };

  const type = () => {
    return types.map((type, index: number) => {
      return (
        <div key={index} className="">
          <input
            type="checkbox"
            id={`type-${index}`}
            name="type"
            value={type.id}
            onChange={handleTypeChange}
          />
          <label htmlFor={`type-${index}`}>{type.name}</label>
        </div>
      );
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/book/update/${form.id}`, form);
      console.log(res.data);
      closeModal();
      toast.success('Cập nhật thành công');
    } catch (error) {
      console.log('Lỗi khi gửi yêu cầu đến backend:', error);
      toast.error('Có lỗi xảy ra khi gửi yêu cầu đến backend');
    }
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
    [],
  );
  useEffect(() => {
    if (book) {
      setForm({
        ...book,
        createdAt: timeFormatter(new Date()),
        lastUpdateAt: timeFormatter(new Date()),
      });
    }
  }, [book]);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      imageUrl: imageUrl || prev.imageUrl,
      url: epubUrl || prev.url,
    }));
  }, [epubUrl, imageUrl]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <Dialog
        placeholder={null}
        className="bg-gray-800"
        size="lg"
        open={true}
        handler={closeModal}
      >
        <ToastContainer />
        <DialogHeader placeholder={null} className="flex justify-between">
          <Typography placeholder={null} className="text-white">
            Edit
          </Typography>
          <IconButton
            placeholder={null}
            onClick={closeModal}
            className="bg-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </IconButton>
        </DialogHeader>
        <DialogBody placeholder={null}>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
            <Input
              crossOrigin={null}
              color="white"
              id="title"
              type="text"
              label="Tên sách"
              required
              value={form.title}
              onChange={handleChange}
            />
            <div className="relative h-10 w-72 min-w-[200px]">
              <select
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-white outline-none transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-none disabled:border-0 disabled:bg-blue-gray-50"
                id="authorId"
                required
                value={form.authorId}
                onChange={handleChange}
              >
                {author()}
              </select>
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Chọn tác giả
              </label>
            </div>
            <Textarea
              className="text-white "
              variant="standard"
              id="description"
              label="Mô tả"
              required
              value={form.description}
              onChange={handleChange}
            />
            <div className="flex flex-col space-y-3 text-white">
              <div>Chọn thể loại:</div>
              <div className="grid grid-cols-3 gap-2">{type()}</div>
            </div>
            <div className="relative h-10 w-72 min-w-[200px]">
              <select
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-white outline-none transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-none disabled:border-0 disabled:bg-blue-gray-50"
                id="status"
                required
                value={form.status}
                onChange={handleChange}
              >
                <option className="bg-gray-900 text-white" value="ONGOING">
                  Đang tiến hành
                </option>
                <option className="bg-gray-900 text-white" value="COMPLETED">
                  Đã hoàn thành
                </option>
                <option className="bg-gray-900 text-white" value="DISCONTINUED">
                  Đã ngừng
                </option>
              </select>
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Trạng thái
              </label>
            </div>
            <Input
              crossOrigin={null}
              color="white"
              type={'file'}
              name={'image'}
              accept={'image/*'}
              id={'image'}
              label="Ảnh bìa"
              onChange={(event) => {
                setImage(event.target.files![0]);
              }}
            />
            <Input
              crossOrigin={null}
              color="white"
              type={'file'}
              name={'epub'}
              accept={'.epub'}
              label="File epub"
              id={'epub'}
              onChange={(event) => {
                setEpub(event.target.files![0]);
              }}
            />
            <Button
              placeholder={null}
              className="text-white content-center bg-green-600 w-1/2"
              type={'submit'}
            >
              Save
            </Button>
          </form>
        </DialogBody>
      </Dialog>
    </div>
  );
};
