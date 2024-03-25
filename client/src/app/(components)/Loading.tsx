"use client";
import { Spinner } from "@material-tailwind/react";

export default () => {
	return (
		<div className="flex items-center justify-center w-screen h-screen bg-opacity-80 ">
			<Spinner className="h-16 w-16" color="purple" />
		</div>
	)
}