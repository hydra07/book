import { useState } from 'react';
const Star = ({ book }) => {
  const [rating, setRating] = useState(book.rating);
  const [listRate, setListRate] = useState(book.rate);
  const [rate, setRate] = useState(0);
  const [isRated, setIsRated] = useState(false);
  const [hoverRate, setHoverRate] = useState(0);
  // const getRate = () => {
  //   const sortedRate = Object.entries(rate).sort((a, b) => b[1] - a[1]);
  // };
  // const handleRate = (rate) => {
  //   setRate(rate);
  //   setIsRated(true);
  // };
  // // console.log(getRate());
  // // const star = () => {
  // //   return <div></div>;
  // // };
  return (
    <div>
      {isRated ? (
        <div>You rated: {rate} stars</div>
      ) : (
        <div>
          <div class="user-rate">
            <span class="star">
              <img src="/svg/unstar.svg" alt="" />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
export default Star;
