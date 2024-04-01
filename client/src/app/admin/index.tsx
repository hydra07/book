import axios from "@/lib/axios"
import Adminpage from "./AdminPage";

 export default async ()=>{
    const fetch = async () =>{
        const res = await axios.get('book/getAll');
        console.log ( res.data);
    }
    return (
        <div>
            <Adminpage/>
        </div>
    )
 }