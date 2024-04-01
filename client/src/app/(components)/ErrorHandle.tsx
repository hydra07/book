'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
// import { useRouter } from 'next/router';
export default ({ message }: { message: string }) => {
	const [countdown, setCountdown] = useState(5);
	// const router = useRouter();
	useEffect(() => {
		const intervalId = setInterval(() => {
			setCountdown((prevCountdown) => prevCountdown - 1);
		}, 1000);

		return () => clearInterval(intervalId);

	}, []);
	useEffect(() => {
		if (countdown === 0) {
			 window.location.href = `/`;
		}
	}, [countdown]);
	return (
		<div className="flex flex-col items-center justify-center w-screen h-screen bg-opacity-80 ">
			<h1 className="text-2xl"> {message}</h1>
			<h3 className="text-xl font-light">{`Tự chuyển hướng sau ${countdown}`}</h3>
			<Link href="/" className="bg-gray-600 rounded-md p-2">
				<p>Trở về trang chủ</p>
			</Link>
		</div>
	)
}
