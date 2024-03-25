import Book from "@/types/book";
import {Breadcrumbs} from "@material-tailwind/react";
import Link from "next/link";
// eslint-disable-next-line react/display-name
export default ({book}: { book: Book }) => {
    return (
        <div className="py-3">
            <div className="bg-black flex flex-row space-x-2">
                    <h3 className="text-xl text-white">Tác Giả:</h3>
                    <Link href='/' className="opacity-70 text-white hover:opacity-100 text-xl">
                        {book.author.name}
                    </Link>
            </div>
        </div>
    )
}