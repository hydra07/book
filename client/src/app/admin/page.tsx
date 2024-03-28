"use client";

import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

const AddBook = dynamic(() => import("./AddBook"), { ssr: false });
const AddType = dynamic(() => import("./AddType"), { ssr: false });
export default () => {
  const [showData, setShowData] = useState<boolean>(false);
  const [showtype, setShowType] = useState<boolean>(false);
  const [showauthor, setShowAuthor] = useState<boolean>(false);
  const [showpage, setshowPage] = useState<boolean>(false);
  const handleAction = (action: "book" | "type" | "author" | "page"): void => {
    setShowData(action === "book");
    setShowType(action === "type");
    setShowAuthor(action === "author");
    setshowPage(action === "page");
  };
  useEffect (() => {
    setshowPage(true);
  },[])
  //
  //test
  return (
    <div className=" flex">
      <Card
        className="h-[calc(100vh)] w-full max-w-[18rem] p-4 rounded-none  shadow-blue-gray-900/5 "
        placeholder={true}
      >
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray" placeholder={true}>
            Sidebar
          </Typography>
        </div>
        <List placeholder={true}>
        <ListItem placeholder={true}>
            <button onClick={() => handleAction("page")}>Home</button>
          </ListItem>
          <ListItem placeholder={true}>
            <button onClick={() => handleAction("book")}>Add Book</button>
          </ListItem>
          <ListItem placeholder={true}>
            <button onClick={() => handleAction("type")}>Add Type</button>
          </ListItem>
          <ListItem placeholder={true}>
            <button onClick={() => handleAction("author")}>Add Author</button>
          </ListItem>
        </List>
      </Card>
      <div className="ml-5 flex-grow">
        {showData && <AddBook />}
        {showtype && <AddType />}
      </div>
    </div>
  );
};
