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


  const [size, setSize] = useState(100);
  const renditionRef = useRef(null);
  const changeSize = (newSize) => {
    setSize(newSize);
  };
  useEffect(() => {
    if (renditionRef.current) {
      // Get the current page and scale it to 50% of its size
      renditionRef.current.themes.fontSize(`${size}%`);
    }
  }, [size]);

  return (
    <>
      <div className=" pt-6 bg-blue-gray-400">
        {/* <Panel /> */}
        <div className=" bottom-4 right-4 left-4 text-center ">
        <button className="bg-orange-500 px-4 mx-2 rounded-lg" onClick={() => changeSize(Math.max(10, size - 10))}>-</button>
        <span>Current  font size: {size}%</span>
        <button className="bg-orange-500 px-4 mx-2 rounded-lg" onClick={() => changeSize(Math.min(200, size + 10))}>+</button>
    </div>
      </div>
      <div style={{ height: "90vh" }}>
        <ReactReader
          title="Guong Thay Tro"
          url={guong}
          location={location}
          locationChanged={locationChanged}
          getRendition={(rendition) => {
            renditionRef.current = rendition;
            renditionRef.current.themes.fontSize(`${size}%`);
          }}
        />
      </div>
    </>
  );
};

export default Reader;
