'use client';
import Book, { Type } from "@/types/book";
import TypeBook from "./TypeBook";
import { getAllTypesFromBooks, getBookByType } from '@/utils/sort.utils';
import { useState } from "react";
export default ({ listBook }: { listBook: Book[] }) => {
	const [books, setBooks] = useState<Book[]>(listBook);
	const [types, setTypes] = useState<Type[]>(getAllTypesFromBooks(listBook!));
	console.log('from index.tsx')
	return (
		<div>
			<div className="h-auto w-screen">
				<div className="pt-20">
					{types?.map((type) => {
						return (
							<TypeBook
								type={type.name}
								books={getBookByType(listBook!, type)}
								key={type.id}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}