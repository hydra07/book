import axios from "@/lib/axios"
import Adminpage from "./AdminPage";

const fetchType = async () =>{
    try {
        const res= await axios.get('/type/getAll');
        return await res.data;
    } catch (error) {
        return null;
    }
}
const fetchAuthor = async () =>{
    try {
        const res =await axios.get('/author/getAll')
        return await  res.data;
    } catch (error) {
        return null;
    }
}
export default async ()=>{
    const  types = await fetchType();
    const  authors = await fetchAuthor();
    return (
        <div>
            <Adminpage authors={authors} types={types}/>
        </div>
    )
}