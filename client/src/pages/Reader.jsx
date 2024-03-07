import { useEffect, useRef, useState } from "react";
import { ReactReader } from "react-reader";
import alice from "../assets/alice.epub";
import guong from "../assets/Guong Thay Tro.epub";
import Panel from "../components/epub/Panel";
import { Button } from "@material-tailwind/react";
const Reader = () => {
  const [location, setLocation] = useState(null);
  const locationChanged = (epubcifi) => {
    setLocation(epubcifi);
  };

  // //change font-size
  // const [size, setSize] = useState(100);
  // const renditionRef = useRef(null);
  // const changeSize = (newSize) => {
  //   setSize(newSize);
  // };
  // useEffect(() => {
  //   if (renditionRef.current) {
  //     // Get the current page and scale it to 50% of its size
  //     renditionRef.current.themes.fontSize(`${size}%`);
  //   }
  // }, [size]);

  // selection
  const [selections, setSelections] = useState([]);
  const renditionRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  // const handleFocus = (cfiRange, contents) => {
  //   console.log("Text selected:", renditionRef.current.getRange(cfiRange).toString());
  // };

  // const getRendition = (rendition) => {
  //   renditionRef.current = rendition;

  //   renditionRef.current.themes.default({
  //     "::selection": {
  //       background: "orange",
  //     },
  //   });

  //   renditionRef.current.on("selected", (cfiRange, contents) => {
  //     setSelections((prevSelections) => [
  //       ...prevSelections,
  //       {
  //         text: renditionRef.current.getRange(cfiRange).toString(),
  //         cfiRange,
  //       },
  //     ]);
  //   });

  //   renditionRef.current.on("blur", () => {
  //     renditionRef.current.off("focus", handleFocus);
  //   });
  // };

  useEffect(() => {
    if (renditionRef.current) {
      function setRenderSelection(cfiRange, contents) {
        setSelections(
          selections.concat({
            text: renditionRef.current.getRange(cfiRange).toString(),
            cfiRange,
          })
        );
        renditionRef.current.annotations.add(
          "highlight",
          cfiRange,
          {},
          undefined,
          "hl",
          { fill: "red", "fill-opacity": "0.5", "mix-blend-mode": "multiply" }
        );
        contents.window.getSelection().removeAllRanges();
      }
      renditionRef.current.on("selected", setRenderSelection);
      return () => {
        renditionRef.current.off("selected", setRenderSelection);
      };
    }
  }, [setSelections, selections]);

  return (
    <>
      <div className=" overflow-y-auto scrollbar-width-0.25  py-3 bg-blue-gray-400 ">
        {/* <Panel /> */}
        <div className=" overflow-y-auto scrollbar-width-0.25 bottom-4 right-4 left-4 text-center ">
          {/* <button
            className="bg-orange-500 px-4 mx-2 rounded-lg"
            onClick={() => changeSize(Math.max(10, size - 10))}
          >
            -
          </button>
          <span>Current font size: {size}%</span>
          <button
            className="bg-orange-500 px-4 mx-2 rounded-lg"
            onClick={() => changeSize(Math.min(200, size + 10))}
          >
            +
          </button> */}
          {/* </div> */}
          {/* <div className="border border-stone-400 bg-white min-h-[100px] p-2 rounded">
          <h2 className="font-bold mb-1">Selections</h2>
          <ul className="grid grid-cols-1 divide-y divide-stone-400 border-t border-stone-400 ">
            {selections.map(({ text, cfiRange }, i) => (
              <li key={i} className="p-2">
                <span>{text}</span>
                <button
                  className="underline hover:no-underline text-sm mx-1"
                  onClick={() => {
                    if (renditionRef.current && renditionRef.current.display) {
                      renditionRef.current.display(cfiRange);
                    }
                  }}
                >
                  Show
                </button>

                <button
                  className="underline hover:no-underline text-sm mx-1"
                  onClick={() => {
                    if (renditionRef.current && renditionRef.current.annotations) {
                      renditionRef.current.annotations.remove(cfiRange, "highlight");
                    }
                    setSelections(selections.filter((item, j) => j !== i));
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div> */}

          <Button className="overflow-y-auto scrollbar-width-0.25" onClick={toggleSidebar}>
            SideBar
          </Button>
          {sidebarOpen && (
            <div className="text-right overflow-y-auto">
              <div
                aria-hidden="true"
                className="  bottom-0 left-0 right-0 top-0 z-40 bg-[rgba(0,0,0,0.1)] "
              ></div>
              <div
                className=" rounded-md border border-brown-700 bg-blue-gray-300 fixed top-0 right-0 z-50 w-full h-screen max-w-xs  "
                renditionref={renditionRef}
                aria-label="Sidebar"
              >
                <div className=" flex items-center justify-between p-5 border-b-2 border-brown-700 ">
                  <span>Welcome</span>
                  <button
                    onClick={toggleSidebar}
                    className="p-1 border-2 border-brown-700 rounded-xl "
                    aria-label="close sidebar"
                  >
                    X
                  </button>
                </div>
                <div className="overflow-y-auto scrollbar-width-0.25">
                  <ul className="overflow-y-auto scrollbar-width-0.25">
                    {selections.map(({ text, cfiRange }, i) => (
                      <li className="p-2 overflow-y-auto scrollbar-width-0.25 " key={i}>
                        <span className="overflow-y-auto scrollbar-width-0.25">{text}</span>
                        <div className="">
                          <button
                            className="underline hover:no-underline text-sm mx-1"
                            onClick={() => {
                              if (
                                renditionRef.current &&
                                renditionRef.current.display
                              ) {
                                renditionRef.current.display(cfiRange);
                              }
                            }}
                          >
                            Show
                          </button>

                          <button
                            className="underline hover:no-underline text-sm mx-1"
                            onClick={() => {
                              if (
                                renditionRef.current &&
                                renditionRef.current.annotations
                              ) {
                                renditionRef.current.annotations.remove(
                                  cfiRange,
                                  "highlight"
                                );
                              }
                              setSelections(
                                selections.filter((item, j) => j !== i)
                              );
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div style={{ height: "90vh" }}>
        <ReactReader
          title="Guong Thay Tro"
          url={guong}
          location={location}
          locationChanged={locationChanged}
          getRendition={
            //getRendition
            (rendition) => {
              renditionRef.current = rendition;

              // renditionRef.current.themes.fontSize(`${size}%`);
              renditionRef.current.themes.default({
                "::selection": {
                  background: "orange",
                },
              });
              setSelections([]);
            }
          }
        />
      </div>
    </>
  );
};

export default Reader;
