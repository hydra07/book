import { useState } from "react";
import { ReactReader } from "react-reader";
import alice from '../assets/alice.epub';
import guong from '../assets/Guong Thay Tro.epub';
import Panel from "../components/epub/Panel";
const Reader = () => {
   const [location, setLocation] = useState(null);
   const locationChanged = epubcifi =>{setLocation(epubcifi)}
  return (
    <div >
      <Panel/>
      <div style={{ height: '90vh'}}>
      <ReactReader
        url={guong}
        location={location}
        locationChanged={locationChanged}
      />
    </div>
     
    </div>
  )
}
 
export default Reader;