import React, { useState } from 'react';
export default function FeedBack({ book }) {
  const [listRate, setListRate] = useState(book.rate);
  const totalRatings = Object.values(listRate).reduce((a, b) => a + b, 0);
  const starMapping = {
    Five: 5,
    Four: 4,
    Three: 3,
    Two: 2,
    One: 1,
  };
  return (
    <div>
      <div>
        <div className="">
          {Object.entries(listRate).map(([key, value], index) => (
            <div className="flex flex-row items-center" key={index}>
              <div className="flex flex-row">
                {starMapping[key]}
                <img src="/svg/star.svg" className="pl-2 w-5" />
              </div>
              <div className="w-[120px] h-2 bg-gray-200 ml-2 rounded-lg">
                <div
                  style={{ width: `${(value / totalRatings) * 100}%` }}
                  className="h-full bg-yellow-500 rounded-lg"
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <div className="" style={{ display: 'block' }} id="formcomment">
        <div className="flex flex-row my-4 ">
          <img src={book.image} alt="" className="w-8 mr-7    rounded-full" />
          <p className="bg-blue-gray-400 pr-80 pl-4 pt-3 rounded-full">
            bai tho that phong phu
          </p>
        </div>
      </div> */}
    </div>
  );
}
