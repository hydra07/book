import { Button, Switch } from "@material-tailwind/react";

import "./App.css";
import Header from "./components/header";
import BookDetail from "./components/pages/BookDetail";
function App() {
  // function YoutubeItem(props){
  //   console.log(props);
  //   return (
  //      <div className="youtube_item">
  //          <div className="youtube-header">
  //              <div className="youtube-image">
  //                  <img src={props.image || "co cuc cut"}  />
  //                  <h3 className="youtube-content">{props.content || "khong co gi" }</h3>
  //              </div>
  //          </div>
  //          <div className="yooutube-footer">

  //          </div>
  //      </div>
  //   );
  // }


  return (
    <div   className="bg-blue-gray-600  " >
      
      <Header/>
      <br/>
      <br/>
      <BookDetail/>
      {/* <div className="w-max-[1280px] h-[122px] bg-white"></div>
      <Button>try</Button> */} 
      
      {/* <div className="w-max-[1280px] h-[1400px] bg-pink-300">
      <div className="fix-image w-3/6 text-white text-3xl">

      <YoutubeItem content="hello anyone" image="https://images.unsplash.com/photo-1704973982149-6729c94f10ce?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></YoutubeItem> 
      
      </div>
      </div> */}
    </div>
  );
}

export default App;
