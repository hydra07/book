import { useState } from "react";
import { ReactReader } from "react-reader";
import alice from "../assets/alice.epub";
import guong from "../assets/Guong Thay Tro.epub";
import Panel from "../components/epub/Panel";
const Reader = () => {
  const [location, setLocation] = useState(null);
  const locationChanged = (epubcifi) => {
    setLocation(epubcifi);
  };
  return (
    <>
      <div className=" pt-8 bg-blue-gray-400">
        <Panel />
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
