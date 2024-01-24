import React, { useState } from 'react';
const Rating = ({ book }) => {
  const [rating, setRating] = useState(book.rating);

  const [rate, setRate] = useState(0);
  const [isRated, setIsRated] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);
 

  const handleRate = (ratingValue) => {
    setRate(ratingValue);
    setIsRated(true);
    console.log(ratingValue);
  };
  // console.log(listRate);
  return (
    <div className="flex flex-col">
      <div className="flex flex-row space-x-10 space-y-5 mb-5">
        <div className="text-lg">Rating : {rating}</div>
        
      </div>
      <div className="flex space-x-3">
        <p className="text-lg">{rating}</p>
        {isRated ? (
          <div className="flex">
            {[...Array(5)].map((star, i) => {
              const ratingValue = i + 1;
              return (
                <span
                  key={i}
                  onMouseEnter={() => setHoveredStar(ratingValue)}
                  onMouseLeave={() => setHoveredStar(0)}
                  onClick={() => handleRate(ratingValue)}
                >
                  <img
                    src={
                      ratingValue <= rate ? '/svg/star.svg' : '/svg/unstar.svg'
                    }
                    className="w-6"
                  />
                </span>
              );
            })}
          </div>
        ) : (
          <div className="flex">
            {[...Array(5)].map((star, i) => {
              const ratingValue = i + 1;
              return (
                <span
                  key={i}
                  onMouseEnter={() => setHoveredStar(ratingValue)}
                  onMouseLeave={() => setHoveredStar(0)}
                  onClick={() => {
                    setRate(ratingValue);
                    setIsRated(true);
                  }}
                >
                  <img
                    src={
                      ratingValue <= hoveredStar
                        ? '/svg/star.svg'
                        : '/svg/unstar.svg'
                    }
                    className="w-6"
                  />
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
export default Rating;
