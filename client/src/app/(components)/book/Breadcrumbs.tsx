'use client';
import Book from "@/types/book";
import { Breadcrumbs } from "@material-tailwind/react";
import Link from "next/link";
export default ({ book }: { book: Book }) => {
	return (
		<div className="pl-10">
			<Breadcrumbs placeholder={null} className="bg-black text-white flex flex-row">
				<Link href='/' className="opacity-70 text-white hover:opacity-100">
					<div className="mb-1">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-4 w-4"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
						</svg>
					</div>
					
				</Link>
				{book.types!.map((type, index) => (
					<Link href='/' className="opacity-70 text-white hover:opacity-100" children={type.name} key={type.name}></Link>
				))}
				<Link href='/' className="text-white">{book.title}</Link>
				{/*<a href="#" className='text-white'>Breadcrumbs</a>*/}
			</Breadcrumbs>
		</div>
	)
}