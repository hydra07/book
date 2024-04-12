"use client";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  List,
  ListItem,
  ListItemPrefix,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
} from "@material-tailwind/react";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import AddAuthor from "./AddAuthor";
import RenderBook from "./RenderBook";

const AddBook = dynamic(() => import("./AddBook"), { ssr: false });
const AddType = dynamic(() => import("./AddType"), { ssr: false });

export default ({ authors, types }: any) => {
  const [open, setOpen] = useState<number>(0);

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };
  const [showData, setShowData] = useState<boolean>(false);
  const [showtype, setShowType] = useState<boolean>(false);
  const [showauthor, setShowAuthor] = useState<boolean>(false);
  const [showpage, setshowPage] = useState<boolean>(false);
  const [showlist, setshowList] = useState<boolean>(false);
  const handleAction = (
    action: "book" | "type" | "author" | "page" | "render"
  ): void => {
    setShowData(action === "book");
    setShowType(action === "type");
    setShowAuthor(action === "author");
    setshowPage(action === "page");
    setshowList(action === "render");
  };
  useEffect(() => {
    setshowPage(true);
  }, []);
  //
  //test
  console.log(authors);
  return (
    // <div className="pt-20 bg-gray-900 text-white min-h-screen">
    <div className="pt-20 bg-gray-900 text-white min-h-screen w-full">
      <Tabs value="page" orientation="vertical">
        <TabsHeader
          className="pt-20 w-80 bg-gray-900 min-h-[calc(100vh_-_80px)] border-r rounded-none"
          indicatorProps={{
            className: "bg-black shadow-none !text-gray-900",
          }}
          placeholder={null}
        >
          {/* <Tab
            placeholder={true}
            className="text-white justify-center w-4/5"
            onClick={() => handleAction('page')}
            value="page"
          >
            Home
          </Tab>
          <Tab
            placeholder={true}
            value="book"
            className="text-white justify-center w-4/5"
            onClick={() => handleAction('book')}
          >
            Add Book
          </Tab>
          <Tab
            placeholder={true}
            value="author"
            className="text-white justify-center w-4/5"
            onClick={() => handleAction('author')}
          >
            Add Author
          </Tab>
          <Tab
            placeholder={true}
            value="type"
            className="text-white justify-center w-4/5"
            onClick={() => handleAction('type')}
          >
            Add Type
          </Tab>
          <Tab
            placeholder={true}
            value="render"
            className="text-white justify-center w-4/5"
            onClick={() => handleAction('render')}
          >
            List Book
          </Tab> */}
          {/* {data.map(({ label, value, icon }) => (
          <Tab key={value} value={value} className="place-items-start">
            <div className="flex items-center gap-2">
              {React.createElement(icon, { className: 'w-5 h-5' })}
              {label}
            </div>
          </Tab>
        ))} */}
          <Accordion
            placeholder={null}
            open={open === 1}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`mx-auto h-4 w-4 transition-transform ${
                  open === 1 ? "rotate-180" : ""
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            }
          >
            <ListItem placeholder={null} className="p-0" selected={open === 1}>
              <AccordionHeader
                placeholder={null}
                onClick={() => handleOpen(1)}
                className="border-b-0 p-3"
              >
                <Typography
                  placeholder={null}
                  color="blue-gray"
                  className="mr-auto font-normal"
                >
                  Dashboard
                </Typography>
              </AccordionHeader>
              <AccordionBody p className="py-1">
                <List placeholder={null} className="p-0">
                  <ListItem placeholder={null}>
                    <button
                      value="book"
                      className="text-white justify-center w-4/5"
                      onClick={() => handleAction("book")}
                    >
                      Add Book
                    </button>
                  </ListItem>
                  <ListItem placeholder={null}>
                    <button
                      value="author"
                      className="text-white justify-center w-4/5"
                      onClick={() => handleAction("author")}
                    >
                      Add Author
                    </button>
                  </ListItem>
                  <ListItem placeholder={null}>
                    <button
                      value="book"
                      className="text-white justify-center w-4/5"
                      onClick={() => handleAction("type")}
                    >
                      Add Type
                    </button>
                  </ListItem>
                </List>
              </AccordionBody>
            </ListItem>
          </Accordion>
        </TabsHeader>
        <TabsBody placeholder={null}>
          {/* {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value} className="py-0">
            {desc}
          </TabPanel>
        ))} */}
          <TabPanel value="page" className="py-0">
            {showpage && <h1>Home</h1>}
          </TabPanel>
          <TabPanel value="book" className="py-0">
            {showData && <AddBook authors={authors} types={types} />}
          </TabPanel>
          <TabPanel value="author" className="py-0">
            {showauthor && <AddAuthor />}
          </TabPanel>
          <TabPanel value="type" className="py-0">
            {showtype && <AddType />}
          </TabPanel>
          <TabPanel value="render" className="py-0">
            {showlist && <RenderBook />}
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
    // <div className="pt-20 bg-gray-900 text-white min-h-screen">
    //   <div className="h-full flex flex-row">
    //     <div className="w-full max-w-72 p-4 rounded-none bg-gray-900">
    //       <div className="mb-2 p-4">
    //         <Typography variant="h5" color="white" placeholder={true}>
    //           Sidebar
    //         </Typography>
    //       </div>
    //       <div className="mb-2 p-4">
    //         <div className="border-b border-gray-700">
    //           <Tabs>
    //             <TabsHeader
    //               className="bg-transparent"
    //               indicatorProps={{
    //                 className: 'bg-gray-900/10 shadow-none !text-gray-900',
    //               }}
    //             >
    //               <Tab
    //                 placeholder={true}
    //                 className="text-white"
    //                 onClick={() => handleAction('page')}
    //                 value="page"
    //               >
    //                 Home
    //               </Tab>
    //               <Tab
    //                 placeholder={true}
    //                 value="book"
    //                 className={`text-white`}
    //                 onClick={() => handleAction('book')}
    //               >
    //                 Add Book
    //               </Tab>
    //               <Tab
    //                 placeholder={true}
    //                 value="author"
    //                 className={`text-white`}
    //                 onClick={() => handleAction('author')}
    //               >
    //                 Add Author
    //               </Tab>
    //             </TabsHeader>
    //           </Tabs>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="ml-5 flex-grow bg-gray-900 text-white">
    //       {showData && <AddBook authors={authors} types={types} />}
    //     </div>
    //     <div className="bg-gray-900 text-white">
    //       {showauthor && <AddAuthor />}
    //     </div>
    //   </div>
    // </div>
  );
};
