// import axios from "@/lib/axios";
// import { ChangeEvent, useCallback, useEffect, useState } from "react";
// import { Card, Input, Textarea, Typography } from "@material-tailwind/react";
// import { timeFormatter } from "@/utils/epub.utils";
// import useUploadFile from "@/lib/hooks/useUploadFile";

// interface Book {
//   id: number | null;
//   title: string;
//   authorId: number;
//   description: string;
//   typesId: Array<number>;
//   createdAt: string;
//   lastUpdateAt: string;
//   url: string;
//   imageUrl: string;
//   status: "ONGOING" | "COMPLETED" | "DISCONTINUED";
// }

// interface EditBookProps {
//   book: Book | null;
//   closeModal: () => void;
//   books: Book[];
//   setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
// }

// const EditBook: React.FC<EditBookProps> = ({
//   books,
//   setBooks,
//   authors,
//   types,
// }: any) => {
//   const [form, setForm] = useState<Book>({
//     id: null,
//     title: "",
//     authorId: authors?.[0]?.id ?? "",
//     description: "",
//     typesId: [],
//     createdAt: timeFormatter(new Date()),
//     lastUpdateAt: timeFormatter(new Date()),
//     url: "",
//     imageUrl: "",
//     status: "ONGOING",
//   });
//   const [selectedBook, setSelectedBook] = useState<Book | null>(null);
//   const [image, setImage] = useState<File | null>(null);
//   const [epub, setEpub] = useState<File | null>(null);

// const { fileUrl: imageUrl } = useUploadFile({ file: image, name: "image" });
// const { fileUrl: epubUrl } = useUploadFile({ file: epub, name: "epub" });
//   const author = () => {
//     return authors.map((author: any) => {
//       return (
//         <option
//           className="bg-gray-900 text-white"
//           key={author.name}
//           value={author.id}
//         >
//           {author.name}
//         </option>
//       );
//     });
//   };
// const type = () => {
//     return types.map((type: any, index: number) => {
//       return (
//         <div key={index} className="">
//           <input
//             type="checkbox"
//             id={`type-${index}`}
//             name="type"
//             value={type.id}
//             onChange={handleTypeChange}
//           />
//           <label htmlFor={`type-${index}`}>{type.name}</label>
//         </div>
//       );
//     });
//   };
// const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { checked, value } = e.target;
//     setForm((prevForm) => {
//       if (checked) {
//         return { ...prevForm, typesId: [...prevForm.typesId, Number(value)] };
//       } else {
//         return {
//           ...prevForm,
//           typesId: prevForm.typesId.filter((id) => id !== Number(value)),
//         };
//       }
//     });
// };


// useEffect(() => {
//     setForm((prev) => ({
//     ...prev,
//     imageUrl: imageUrl,
//     url: epubUrl,
//     }));
// }, [epubUrl, imageUrl]);
// const handleEdit = (book: Book) => {
//     setSelectedBook(book);
//     setForm(book);
// };

// const handleSaveChanges = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//     const response = await axios.put(
//         `/book/update/${selectedBook?.id}`,
//         form
// );
//     const updatedBook = response.data;
//     setBooks((prevBooks: any[]) =>
//         prevBooks.map((book) =>
//         book.id === updatedBook.id ? updatedBook : book
//         )
//     );
//     } catch (error) {
//     console.error("Error updating book:", error);
//     }
// };

// return (
//     <form onSubmit={handleSaveChanges} className="flex flex-col space-y-3">
//     <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2">
//         Tên sách
//         </label>
//         <input
//         type="text"
//         name="title"
//         value={form.title}
//         onChange={handleSaveChanges}
//         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//         required
//         />
//     </div>

//     <div className="relative h-10 w-72 min-w-[200px]">
//         <select
//         className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-white outline-none transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-none disabled:border-0 disabled:bg-blue-gray-50"
//         id="authorId"
//         required
//         value={form.authorId}
//         onChange={handleSaveChanges}
//         >
//         {author()}
//         </select>
//         <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
//         Chọn tác giả
//         </label>
//     </div>

//     <Textarea
//         className="text-white"
//         variant="standard"
//         id="description"
//         label="Mô tả"
//         required
//         value={form.description}
//         onChange={handleSaveChanges}
//     />

//       <div className="flex flex-col space-y-3">
//         <div>Chọn thể loại:</div>
//         <div className="grid grid-cols-3 gap-2">{type()}</div>
//       </div>

//       <div className="relative h-10 w-72 min-w-[200px]">
//         <select
//         className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-white outline-none transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-none disabled:border-0 disabled:bg-blue-gray-50"
//         id="status"
//         required
//         value={form.status}
//         onChange={handleSaveChanges}
//         >
//           <option className="bg-gray-900 text-white" value="ONGOING">
//             Đang tiến hành
//           </option>
//           <option className="bg-gray-900 text-white" value="COMPLETED">
//             Đã hoàn thành
//           </option>
//           <option className="bg-gray-900 text-white" value="DISCONTINUED">
//             Đã ngừng
//           </option>
//         </select>
//         <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
//           Trạng thái
//         </label>
//       </div>

//       <Input
//         crossOrigin={null}
//         color="white"
//         type={"file"}
//         name={"image"}
//         accept={"image/*"}
//         id={"image"}
//         label="Ảnh bìa"
//         onChange={(event) => {
//           setImage(event.target.files![0]);
//         }}
//       />

//       <Input
//         crossOrigin={null}
//         color="white"
//         type={"file"}
//         name={"epub"}
//         accept={".epub"}
//         label="File epub"
//         id={"epub"}
//         onChange={(event) => {
//           setEpub(event.target.files![0]);
//         }}
//       />

//       <button
//         type="submit"
//         className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//       >
//         Save Changes
//       </button>
//     </form>
//   );
// };

// export default EditBook;
