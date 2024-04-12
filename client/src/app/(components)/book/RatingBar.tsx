'use client';
import Book from '@/types/book';
import { Rating, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
export default ({book}:{book:Book}) => {
  const [rating,setRating] = useState<number>(book.rating!);
  const [rated, setRated] = useState(0);
  const [reviewer, setReviewer] = useState(book.reviews);
  useEffect(()=>{
    console.log(rated);
  },[rated])
  return (
    <div>
      <div className="flex flex-row items-center gap-2 font-bold text-gray-400">
        <div className=''>
          {rated}.0   
        </div>
        <Rating
          value={Math.round(rating)}
          onChange={(value) => setRated(value)}
          placeholder={null}
        />
        
        <Typography
          color="blue-gray"
          className="font-medium text-gray-400"
          placeholder={null}
          children={`Based on ${reviewer} Reviews`}
        ></Typography>
      </div>
    </div>
  );
};