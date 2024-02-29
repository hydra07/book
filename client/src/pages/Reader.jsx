import { useState } from "react";
import { ReactReader } from "react-reader";
import alice from '../assets/alice.epub';
import guong from '../assets/Guong Thay Tro.epub';
const Reader = () => {
   const [location, setLocation] = useState(null);
   const locationChanged = epubcifi =>{setLocation(epubcifi)}
  return (
    <div >
      
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