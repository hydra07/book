import View from "./Contentview";
import Selection from "./Selection";
import Styling from "./Styling";

const Panel = () => {
    return ( 
        <div className=" flex justify-end mr-3 space-x-2 ">
            <Styling/>
            {/* <View/> */}
            <Selection/>
        </div>

     );
}
 
export default Panel;