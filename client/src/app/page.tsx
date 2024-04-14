// 'use client';
'use strict';
import axios from '@/lib/axios';
import ErrorDisconnectServer from './(components)/ErrorDisconnectServer';
import Home from './(components)/home';
export default async () => {
  try {
    const res = await axios.get(`/book/getAll`);
    const listBook = res.data;
    const resViews = await axios.get(`/book/sorted-by-views`);
    const sortByViews = resViews.data;
    const resLatest = await axios.get(`/book/sorted-by-latest`);
    const sortByLatest = resLatest.data;
    return (
      <div>
        <Home
          listBook={listBook ? listBook : []}
          sortByViews={sortByViews ? sortByViews : []}
          sortByLatest={sortByLatest ? sortByLatest : []}
        />
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
