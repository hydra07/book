// 'use client';

import { axiosWithAuth } from '@/lib/axios';
import useUser from '@/lib/hooks/useUser';
import Book from '@/types/book';
import { Rating, Typography } from '@material-tailwind/react';
import { useCallback, useEffect, useState } from 'react';
export default ({ book }: { book: Book }) => {
  const { user } = useUser();
  const [rating, setRating] = useState<number>(book.rating!);
  const [rated, setRated] = useState(0);
  const [reviewer, setReviewer] = useState(book.reviews);
  // console.log(rated);
  // const handleChange = (value: number) => {
  //   setRated(value);
  // };
  const handleChange = useCallback(
    async (value: number) => {
      console.log(value);
      const token = user?.accessToken;
      if (!token) return;
      setRated(value);
      const data = {
        rate: value,
      };
      const res = await axiosWithAuth(token).post(
        `/book/rate/${book.id}`,
        data,
      );
      const result = await res.data;
    },
    [user, rated],
  );

  useEffect(() => {
    const token = user?.accessToken;
    const fetchData = async () => {
      if (!token) return;
      const res = await axiosWithAuth(token).get(`/book/rate/${book.id}`);
      const data = await res.data;
      setRated(data);
      console.log(data);
    };
    fetchData();
  }, [user, rated]);

  return (
    <div>
      <div className="flex flex-row items-center gap-2 font-bold text-gray-400">
        <div className="">{rating}</div>
        <Rating
          value={rated}
          // onChange={(value) => setRated(value)}
          onChange={handleChange}
          // onSubmit={() => handleSubmit()}
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
