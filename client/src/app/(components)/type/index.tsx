import Type from "@/types/type";
import ListBook from "@/app/(components)/listbook/ListBook";

// eslint-disable-next-line react/display-name
export default ({type}: { type: Type }) => {
    return (
        <div>
            <h1>{type.name}</h1>
            <p>{type.description}</p>
            <ListBook books={type.books}/>
        </div>
    )
}