import { useEffect, useRef, useState } from "react";

const View = () => {
  const [size, setSize] = useState(100);
  const renditionRef = useRef(null);
  const changeSize = (newSize) => {
    setSize(setSize);
  };
  useEffect(() => {
    if (renditionRef.current) {
      // Get the current page and scale it to 50% of its size
      renditionRef.current.themes.fontSize(`${size}%`);
    }
  }, [size]);

  return <div className="">
    <div className="">
        <button onClick={() => changeSize(Math.max(80, size - 10))}>-</button>
        <span>Current  font size: {size}%</span>
        <button onClick={() => changeSize(Math.min(200, size + 10))}>+</button>
    </div>
  </div>;
};

export default View;
