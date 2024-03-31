import Type from "@/app/(components)/type/index";
import axios from "../../../lib/axios";
// eslint-disable-next-line react/display-name
export default async ({params}: { params: { id: number } }) => {
    const res = await axios.get(`/test/token/getType/${params.id}`)
    const type = await res.data;

    if (!type){
        return <div>Type not found!</div>
    }
    return (
        <div>
            <Type type={type} />
        </div>)
}