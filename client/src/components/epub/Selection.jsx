import { Button } from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";

const Selection = () => {
  const [selections, setSelections] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      function setRenderSelection(cfiRange, contents) {
        setSelections(
          selections.concat({
            text: ref.current.getRange(cfiRange).toString(),
            cfiRange,
          })
        );
        ref.current.annotations.add("highlight", cfiRange, {}, undefined, "hl", {
          fill: "red",
          "fill-opacity": "0.5",
          "mix-blend-mode": "multiply",
        });
        contents.window.getSelection().removeAllRanges();
      }
        ref.current.on("selected", setRenderSelection);      
      return () => {
        ref.current.off("selected", setRenderSelection);
      }
    }
  }, [setSelections, selections]);

  return (
    <div className="  text-right">
      <Button className="" onClick={toggleSidebar}>
        SideBar
      </Button>
      {sidebarOpen && (
        <div className="">
          <div
            aria-hidden="true"
            className=" fixed bottom-0 left-0 right-0 top-0 z-40 bg-[rgba(0,0,0,0.1)] "
          ></div>
          <div
            className=" rounded-md border border-brown-700 bg-blue-gray-300 fixed top-0 right-0 z-50 w-full h-screen max-w-xs  "
            ref={ref}
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
              <ul className="">
                {selections.map(({ text, cfiRange }, i) => (
                  <li className="p-2" key={i}>
                    <span className="">{text}</span>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Selection;
