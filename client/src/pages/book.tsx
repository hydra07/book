// 'use client';
import Reader from '@/app/(components)/reader/Reader';
import '@/app/globals.css';

export default () => {
  // const demoUrl = 'Kiếm Lai - Phong Hoả Hí Chư Hầu.epub';
  const demoUrl = 'demo.epub';
  return (
    <div className="">
      <Reader url={demoUrl}></Reader>
    </div>
  );
};
