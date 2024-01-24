const BookImage = ({book}) => {

    return (
        <div className=" pl-8 w-[95%] relative ">
            <img src={book.image} alt="" className=" ml-2xl rounded-2xl"/>
        </div>
    )

}
export default BookImage;