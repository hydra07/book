"use client";

import { Tab, Tabs, Typography } from "@material-tailwind/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import AddAuthor from "./AddAuthor";

const AddBook = dynamic(() => import("./AddBook"), { ssr: false });
const AddType = dynamic(() => import("./AddType"), { ssr: false });

export default ({ authors, types }: any) => {
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
  useEffect(() => {
    setshowPage(true);
  }, []);
  //
  //test
  return (
    <div className="   pt-[70px]">
      <div className="flex flex-row  h-full">
        <div className="w-full max-w-[18rem] p-4 rounded-none  bg-gray-900 ">
          <div className="mb-2 p-4">
            <Typography variant="h5" color="blue-gray" placeholder={true}>
              Sidebar
            </Typography>
          </div>
          <div className="mb-2 p-4">
            <div className="border-b border-gray-700">
              <Tabs>
                <Tab
                  placeholder={true}
                  className={"text-blue-gray-500"}
                  onClick={() => handleAction("page")}
                  value="page"
                >
                  Home
                </Tab>
                <Tab
                  placeholder={true}
                  value="book"
                  className={`text-blue-gray-500`}
                  onClick={() => handleAction("book")}
                >
                  Add Book
                </Tab>
                {/* <Tab
            className={`text-blue-500 ${currentTab === "type" ? "text-white" : ""}`}
            onClick={() => handleAction("type")}
          >
            Add Type
          </Tab> */}
                <Tab
                  placeholder={true}
                  value="author"
                  className={`text-blue-gray-500`}
                  onClick={() => handleAction("author")}
                >
                  Add Author
                </Tab>
                <Tab
                  placeholder={true}
                  value="type"
                  className={`text-blue-gray-500`}
                  onClick={() => handleAction("type")}
                >
                  Add Type
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
        <div className="ml-5 flex-grow">
          {showData && <AddBook authors={authors} types={types} />}
          {showauthor && <AddAuthor />}
          {showtype && <AddType />}
        </div>
      </div>
    </div>
  );
};
