// 'use client';
'use strict';
import axios from '@/lib/axios';
import ErrorDisconnectServer from './(components)/ErrorDisconnectServer';
import Home from './(components)/home';
export default async () => {
  try {
    const res = await axios.get(`/book/getAll`);
    const listBook = res.data;
    return (
      <div>
        <Home listBook={listBook ? listBook : []} />
      </div>
    );
  } catch (error) {
    return (
      <div>
        <ErrorDisconnectServer />
      </div>
    );
  }
};
