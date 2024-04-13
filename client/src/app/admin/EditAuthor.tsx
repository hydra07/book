import { Dispatch } from "@reduxjs/toolkit";
import { AuthorInfo } from "./AddAuthor";
import { ChangeEvent, SetStateAction, useCallback, useEffect, useState } from "react";
import { Button, Dialog, DialogBody, DialogHeader, IconButton, Input, Textarea, Typography } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import axios from "@/lib/axios";

interface EditAuthorProps {
    author: AuthorInfo | null;
    closeModal: () => void;
    setAuthors: React.Dispatch<React.SetStateAction<AuthorInfo[]>>;
    authors: AuthorInfo[];
}
export default ({
    author,
    closeModal,
    setAuthors,
    authors,
}: EditAuthorProps) => {
    const Authordata: AuthorInfo = {
        id: null,
        name: "",
        description: "",
    };
    const [form, setForm] = useState<AuthorInfo>(Authordata);
    const handleChange = useCallback(
        (
            event: ChangeEvent<
                HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
            >
        ) => {
            setForm((prev) => ({
                ...prev,
                [event.target.id]: event.target.value,
            }));
        },
        []
    );
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            //   const res = await axios.put(`/book/update/${form.id}`, form);
            //   console.log(res.data.success)
            closeModal();
            toast.success('Cập nhật thành công');
        } catch (error) {
            console.log("Lỗi khi gửi yêu cầu đến backend:", error);
            toast.error("Có lỗi xảy ra khi gửi yêu cầu đến backend");
        }
    };
    useEffect(() => {
        if (author) {
            setForm({
                ...author,

            });
        }
    }, [author]);

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
                    <Typography placeholder={null} className="text-white">Edit</Typography>
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
                            label="Tên tác giả"
                            required
                            value={form.name}
                            onChange={handleChange}
                        />

                        <Textarea
                            className="text-white "
                            variant="standard"
                            id="description"
                            label="Mô tả"
                            required
                            value={form.description}
                            onChange={handleChange}
                        />


                        <Button
                            placeholder={null}
                            className="text-white content-center bg-green-600 w-1/2"
                            type={"submit"}
                        >
                            Save
                        </Button>
                    </form>
                </DialogBody>
            </Dialog>
        </div>
    );
};
